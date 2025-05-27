import React from 'react';
import { useNavigate } from 'react-router-dom';

const heroImg =
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'; // Use your own image if you like

const Options = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#181b1f] flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center gap-8 px-8 py-6">
        <span className="text-white text-base font-medium hover:text-blue-400 cursor-pointer transition">Home</span>
        <span className="text-white text-base font-medium hover:text-blue-400 cursor-pointer transition">About</span>
        <span className="text-white text-base font-medium hover:text-blue-400 cursor-pointer transition">Gallery</span>
      </nav>
      {/* Hero Content */}
      <div className="flex flex-1 flex-col lg:flex-row items-center justify-between px-8 lg:px-20 py-8">
        {/* Left: Text and Buttons */}
        <div className="flex-1 flex flex-col justify-center items-start mt-8 lg:mt-0">
          <h1 className="text-white text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Travel Buddy
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-xl">
            Plan your journey with ease — discover top destinations,<br className="hidden md:block" />
            get personalized itineraries, and more.
          </p>
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <button
              onClick={() => navigate('/form')}
              className="border-2 cursor-pointer border-white text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-white hover:text-black transition"
            >
              Get Itinerary
            </button>
            <button
              onClick={() => navigate('/places')}
              className="border-2  cursor-pointer border-white text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-white hover:text-black transition"
            >
              Best Places to Visit
            </button>
            <button
              onClick={() => navigate('/chat')}
              className="border-2 cursor-pointer border-white text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-white hover:text-black transition"
            >
              Travel Suggestions
            </button>
          </div>
        </div>
        {/* Right: Hero Image */}
        <div className="flex-1 flex items-center justify-center mt-12 lg:mt-0">
          <img
            src={heroImg}
            alt="Travel essentials"
            className="rounded-2xl shadow-2xl object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Options;
