import React from 'react';

interface Props {
  rotation: number;
}

const Motorcycle: React.FC<Props> = ({ rotation }) => {
  return (
    <div
      className="relative w-32 h-32 transition-transform duration-100 ease-linear"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Default CSS Bike */}
      <div className="absolute bottom-0 left-0 w-24 h-24">
        {/* Wheels */}
        <div className="absolute bottom-2 left-2 w-8 h-8 bg-black rounded-full border-4 border-gray-400 animate-[spin_0.5s_linear_infinite]"></div>
        <div className="absolute bottom-2 right-2 w-8 h-8 bg-black rounded-full border-4 border-gray-400 animate-[spin_0.5s_linear_infinite]"></div>

        {/* Body */}
        <div className="absolute bottom-6 left-4 w-16 h-8 bg-red-500 rounded-lg transform -skew-x-12"></div>
        <div className="absolute bottom-10 left-10 w-8 h-6 bg-black rounded-t-lg"></div> {/* Seat */}

        {/* Riders (Simple heads) */}
        <div className="absolute bottom-14 left-8 w-6 h-6 bg-pink-300 rounded-full border-2 border-white z-10"></div> {/* H3 */}
        <div className="absolute bottom-12 left-12 w-6 h-6 bg-blue-300 rounded-full border-2 border-white z-10"></div> {/* Chan */}

        {/* Wind/Smoke Effect */}
        <div className="absolute bottom-4 -left-6 flex gap-1 opacity-50">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-[ping_1s_infinite]"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full animate-[ping_1.2s_infinite]"></div>
        </div>
      </div>
    </div>
  );
};

export default Motorcycle;
