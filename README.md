## 🌍 Travel Planner AI Chatbot

A smart, responsive chatbot that helps users explore destinations, get personalized travel suggestions, and generate itineraries. Powered by **Gemini LLM**, **CrewAI**, and **FastAPI** on the backend, with a dynamic **React** frontend.
<<<<<<< HEAD
![alt text](image.png)
=======
![alt text](public/image.png)
>>>>>>> 5d17809ce55e88c633cafd5f71fe5609f4a084f8
---

### ✨ Features

* 💬 Conversational UI with emojis and natural responses (e.g., "Hi", "Thank you")
* 📍 Location-based travel suggestions with detailed highlights
* 📅 Personalized itinerary generation via user input
* 🧠 Learns user preferences (mountains/beaches/cultural, etc.)
* 🚀 Sleek UI with Tailwind CSS and React animations

---

### 🛠️ Tech Stack

| Layer     | Technology                                |
| --------- | ----------------------------------------- |
| Frontend  | React, TailwindCSS                        |
| Backend   | FastAPI, CrewAI, Gemini (LLM)             |
| Styling   | CSS Modules (`App.css`, `TravelChat.css`) |
| AI Models | Gemini 1.5 Flash via CrewAI               |

---

### 📁 Project Structure

```
.
├── public/
├── src/
│   ├── assets/
│   │   ├── home_page.png
│   │   └── react.svg
│   ├── components/
│   │   ├── Form.jsx
│   │   ├── Loading.jsx
│   │   ├── Options.jsx
│   │   ├── slideshow.jsx
│   │   ├── TravelChat.jsx
│   │   └── TravelChat.css
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── app.py          # FastAPI backend
├── .gitignore
├── eslint.config.js
```

---

### 🚀 Run the Project Locally

#### 1️⃣ Start the Backend

```bash
# Ensure Python 3.10+ is installed
pip install fastapi uvicorn openai
uvicorn app:app --reload
```

#### 2️⃣ Start the Frontend

```bash
npm install
npm run dev
```

> ⚠️ If you're using `vite`, the dev server runs at `http://localhost:5173`

---

### 🔗 API Endpoints

| Method | Endpoint          | Description                        |
| ------ | ----------------- | ---------------------------------- |
| POST   | `/suggest-place`  | Get travel destination suggestions |
| POST   | `/plan-itinerary` | Generate multi-day itinerary       |

---

### 💬 Example Chat Responses

| You Say            | Chatbot Says                                                           |
| ------------------ | ---------------------------------------------------------------------- |
| "Hi"               | 👋 Hey there! I'm your travel buddy. Where would you like to go today? |
| "I love mountains" | 🏔️ Awesome! You’d enjoy Himachal or Sikkim. Want more ideas?          |
| "Thank you!"       | 😊 Anytime! Happy to help you explore the world.                       |
| "Suggest a beach"  | 🏖️ Goa, Andaman or Gokarna are great for sun, sand, and surf.         |

---

### 📦 Coming Soon

* 🗺️ Interactive Map View
* 📆 Export itineraries to PDF or Google Calendar
* 🌤️ Real-time Weather Integration
* 💾 Store chat history locally or in Firebase
* 🔐 Optional user login

---

### 🧠 Powered By

* 🧭 **CrewAI**: Agent orchestration
* 🧠 **Gemini 1.5 Flash**: Fast, context-aware large language model
* ⚡ **FastAPI**: Lightweight Python backend
* ⚛️ **React**: Component-based modern UI

---

### 👨‍💻 Author

> Built with ❤️ by [@bhoomiladia](https://github.com/bhoomiladia)

