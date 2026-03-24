import React from 'react';
import { Link } from 'react-router-dom';

const PackageCard = ({ pkg, category, count, imageNumber }) => {
  return (
    <Link 
      to={category === "TÚI MÙ" ? "/tui-mu" : `/category/${category}`}
      className="bg-white rounded-3xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all group flex flex-col relative border-b-4 border-b-gray-300 active:border-b-0 active:translate-y-1"
    >
      <div className="aspect-[4/3] relative overflow-hidden bg-gray-50">
        <img 
          src={`/anh${imageNumber}.jpg`} 
          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" 
          alt="acc"
          onError={(e) => { e.target.src = "https://via.placeholder.com/400x300?text=Loi+Anh"; }}
        />
        <div className="absolute top-2 left-2 bg-red-600 text-white text-[8px] px-2 py-0.5 rounded font-black shadow-md animate-pulse">MỚI</div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[9px] px-2 py-0.5 rounded font-bold">
          Còn: {count}
        </div>
      </div>

      <div className="p-4 flex flex-col gap-1 flex-1 text-center font-bold">
        <h3 className="text-[10px] font-black uppercase text-gray-800 line-clamp-2 h-8">{pkg.label}</h3>
        <p className="text-[9px] text-gray-400 mb-1">{pkg.note}</p>
        <div className="mt-auto">
          <p className="text-black-600 text-lg italic mb-2">{pkg.price.toLocaleString()}đ</p>
          <div className="w-full bg-black border-2 border-black py-3 rounded-2xl shadow-[0_0_20px_rgba(234,88,12,0.6)] flex items-center justify-center relative overflow-hidden">
            <span className="font-black uppercase text-[12px] animate-pulse relative z-10 tracking-wider text-transparent bg-clip-text bg-gradient-to-t from-orange-600 via-yellow-400 to-red-600">
              XEM TẤT CẢ
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PackageCard;