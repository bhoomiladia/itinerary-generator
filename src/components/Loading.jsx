// components/Loading.jsx
import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="text-xl animate-pulse">Planning your trip...</div>
    </div>
  );
};

export default Loading;
