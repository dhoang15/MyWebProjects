import React from 'react';

const ProductCard = ({ item, onBuy }) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all group flex flex-col relative">
      <div className="aspect-[4/3] relative overflow-hidden">
        <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" alt="acc" />
        <span className="absolute top-2 left-2 bg-red-600 text-white text-[9px] px-2 py-1 font-black rounded-lg">MS {item.ms || '00'}</span>
      </div>
      <div className="p-4 text-center space-y-2">
        <h3 className="text-[11px] font-black uppercase truncate">{item.name}</h3>
        <p className="text-red-600 font-black text-lg">{item.price?.toLocaleString()}đ</p>
        <button 
          onClick={() => onBuy(item)} 
          className="w-full bg-red-600 text-white py-2 rounded-xl text-[10px] font-black uppercase hover:bg-black transition-colors"
        >
          MUA NGAY
        </button>
      </div>
    </div>
  );
};

export default ProductCard;