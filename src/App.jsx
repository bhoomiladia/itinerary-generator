// App.jsx
import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Form from './components/Form';
import Options from './components/Options';
import './App.css'
import TravelChat from './components/TravelChat';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
    <div className='bg' >
    <nav className=' absolute top-0 left-0 w-full flex justify-between items-center px-8 py-4 text-white'>
      <ul className=" mt-4 ml-2 flex gap-8">
        <li className='relative cursor-pointer group pb-2 inline-block hover:text-blue-200 transition-color duration-300'>Home
  <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-10 h-[2px] bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span></li>
        <li className='relative group pb-2 inline-block cursor-pointer hover:text-blue-200 transition-color duration-300'>About <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-10 h-[2px] bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span></li>
        <li className='relative cursor-pointer group pb-2 inline-block r hover:text-blue-200 transition-color duration-300'>Gallery <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-10 h-[2px] bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span></li>
      </ul>
    </nav>
      <div className='m-4 mb-8'>
      <h1 className='text-7xl mb-4 text-white font-serif'>Travel Buddy</h1>
      <p className="text-xl text-gray-300 mb-5 max-w-lg">
        Plan your journey with ease — discover top destinations, get personalized itineraries, and more.
      </p>
      <button className='text-white border-2 font-serif border-grey-300 p-4 rounded-xl cursor-pointer hover:bg-blue-200/15 transform-color duration-300' onClick={() => navigate('/Options')}>Get Started</button>
    </div>
    </div>
    </>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/form" element={<Form />} />
      <Route path="/Options" element={<Options />} />
      <Route path="/chat" element={<TravelChat />} />
    </Routes>
  );
};

export default App;
