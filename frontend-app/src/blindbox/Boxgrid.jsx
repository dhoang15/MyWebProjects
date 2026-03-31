import React from 'react';

const BoxGrid = ({ currentIndex, winnerIndex }) => {
  return (
    <div className="grid grid-cols-3 gap-3 mb-8">
      {[...Array(9)].map((_, i) => (
        <div 
          key={i} 
          className={`aspect-[3/4] rounded-xl border-4 overflow-hidden relative transition-all duration-100 
            ${currentIndex === i ? 'border-red-500 scale-105 shadow-[0_0_20px_red]' : 'border-yellow-500/20'}
            ${winnerIndex === i ? 'border-green-500 bg-green-500/20' : ''}
          `}
        >
          <img src="/tuimu.jpg" className={`w-full h-full object-cover ${currentIndex === i ? 'brightness-125' : 'grayscale'}`} alt="box" />
          {winnerIndex === i && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white font-black text-xs animate-bounce">TRÚNG!</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BoxGrid;