import React from 'react';

const DotLoader = ({ color = 'currentColor' }) => {
  return (
    <div className="flex gap-0.5 items-center h-full">
      <div
        className={`w-1 h-1 rounded-full ${color} animate-bounce`}
        style={{ animationDelay: '0s' }}
      ></div>
      <div
        className={`w-1 h-1 rounded-full ${color} animate-bounce`}
        style={{ animationDelay: '0.2s' }}
      ></div>
      <div
        className={`w-1 h-1 rounded-full ${color} animate-bounce`}
        style={{ animationDelay: '0.4s' }}
      ></div>
    </div>
  );
};

export default DotLoader; 