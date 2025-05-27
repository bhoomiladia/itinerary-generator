from fastapi import FastAPI
from pydantic import BaseModel
from crewai import LLM, Agent, Task, Crew, Process
from fastapi.middleware.cors import CORSMiddleware
from langchain.memory import ConversationBufferMemory
from typing import Dict
import uuid
from datetime import datetime, timedelta
from typing import Optional 
from dotenv import load_dotenv
import os

app = FastAPI()

load_dotenv()  # Load environment variables from .env file

My_API_Key = os.getenv("API_Key")

# Allow your React app origin (adjust port if needed)
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------- MODELS --------------------

class ItineraryRequest(BaseModel):
    Location: str
    from_: str
    Budget: str
    Duration: str
    People: str

class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None  # session id optional, sent from frontend

# -------------------- MEMORY STORE --------------------

memory_store: Dict[str, dict] = {
    "conversations": {},
    "last_used": {}
}

def get_memory(session_id: str) -> ConversationBufferMemory:
    """Get or create memory for a session with timestamp update"""
    if session_id not in memory_store["conversations"]:
        memory_store["conversations"][session_id] = ConversationBufferMemory(
            memory_key="chat_history",
            return_messages=True
        )
    memory_store["last_used"][session_id] = datetime.now()
    return memory_store["conversations"][session_id]

def clean_old_sessions(hours=24):
    """Clean up sessions inactive for given hours"""
    cutoff = datetime.now() - timedelta(hours=hours)
    for session_id in list(memory_store["last_used"].keys()):
        if memory_store["last_used"][session_id] < cutoff:
            memory_store["conversations"].pop(session_id, None)
            memory_store["last_used"].pop(session_id, None)

# -------------------- LLM --------------------

llm = LLM(model='gemini/gemini-1.5-flash', api_key='My_API_Key')

# -------------------- AGENTS --------------------

def create_chat_agent():
    return Agent(
        role="Travel Buddy",
        goal="Have natural conversations and provide personalized travel suggestions",
        backstory=(
            "You're a friendly, knowledgeable travel companion with years of experience "
            "helping travelers discover perfect destinations. You're great at asking "
            "the right questions to understand exactly what someone is looking for."
        ),
        verbose=0,
        llm=llm,
        memory=True,
        allow_delegation=False
    )

chat_agent = create_chat_agent()

itinerary_agent = Agent(
    role="Travel Planner",
    goal="Create detailed itineraries based on user preferences",
    backstory=(
        "An expert travel planner who specializes in creating perfect itineraries "
        "that match budgets, time constraints, and personal preferences."
    ),
    verbose=0,
    llm=llm
)

# -------------------- ENDPOINTS --------------------

@app.post("/plan-itinerary")
async def plan_itinerary(req: ItineraryRequest):
    inputs = {
        "Location": req.Location,
        "from_": req.from_,
        "Budget": req.Budget,
        "Duration": req.Duration,
        "People": req.People,
    }
    output = itinerary_crew.kickoff(inputs=inputs)
    return {"itinerary": output.raw}

@app.post("/suggest-place")
async def suggest_place(req: ChatRequest):
    clean_old_sessions()

    session_id = req.session_id or str(uuid.uuid4())
    memory = get_memory(session_id)

    # Load conversation history (list of messages)
    history = memory.load_memory_variables({}).get("chat_history", [])

    # Format conversation history for prompt (text from messages)
    history_text = "\n".join([msg.content for msg in history]) if history else ""

    suggestion_task = Task(
        description=(
            "You're having a conversation with a traveler about trip planning. "
            "Here's your conversation history:\n\n"
            f"{history_text}\n\n"
            f"New message from traveler: {req.message}\n\n"
            "Guidelines for your response:\n"
            "1. Maintain natural conversation flow - reference previous messages when relevant\n"
            "2. Be friendly and engaging - use emojis sparingly (1-2 per message)\n"
            "3. Ask clarifying questions if more information is needed\n"
            "4. Provide specific, personalized suggestions based on the conversation\n"
            "5. Keep responses concise but helpful (2-4 sentences typically)\n"
            "6. If suggesting multiple options, present them clearly\n"
            "7. For first messages, introduce yourself briefly\n\n"
            "Current conversation context:\n"
            f"- Last topic: {history[-1].content if history else 'New conversation'}\n"
            f"- New message: {req.message}"
        ),
        expected_output=(
            "A natural, contextual response that:\n"
            "- Continues the conversation fluidly\n"
            "- Addresses the user's request specifically\n"
            "- Maintains a friendly, helpful tone\n"
            "- References previous messages when relevant\n"
            "- Is properly formatted for display"
        ),
        agent=chat_agent,
        memory=memory
    )

    chat_crew = Crew(
        agents=[chat_agent],
        tasks=[suggestion_task],
        verbose=0,
        process=Process.sequential
    )

    result = chat_crew.kickoff()

    # Save new input/output to memory
    memory.save_context(
        {"input": req.message},
        {"output": result.raw}
    )

    return {
        "reply": result.raw,
        "session_id": session_id
    }

# -------------------- CREWS --------------------

itinerary_task = Task(
    description=(
        "Create a detailed travel itinerary with these parameters:\n"
        "- Destination: {Location}\n"
        "- Traveling from: {from_}\n"
        "- Budget: {Budget}\n"
        "- Duration: {Duration} days\n"
        "- Number of people: {People}\n\n"
        "Include:\n"
        "1. Daily schedule with times\n"
        "2. Activity recommendations\n"
        "3. Dining suggestions\n"
        "4. Transportation options\n"
        "5. Budget breakdown\n"
        "6. Packing tips if relevant"
    ),
    expected_output="A comprehensive, well-organized travel itinerary document",
    agent=itinerary_agent
)

itinerary_crew = Crew(
    agents=[itinerary_agent],
    tasks=[itinerary_task],
    verbose=0,
    process=Process.sequential
)
