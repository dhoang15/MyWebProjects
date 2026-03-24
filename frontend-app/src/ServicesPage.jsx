import React from 'react';

const ServicesPage = () => {
  return (
    <div className="bg-white p-8 rounded-[2rem] shadow-xl border-2 border-black animate-in fade-in duration-500">
      <div className="border-b-2 border-red-600 inline-block mb-8">
          <h2 className="text-xl font-black uppercase text-red-600 italic px-2">🛠 CÁC DỊCH VỤ KHÁC</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-blue-50 border-2 border-blue-500 rounded-3xl p-8 text-center hover:scale-105 transition-all cursor-pointer shadow-lg group">
             <div className="text-6xl mb-4 group-hover:animate-bounce">⚔️</div>
             <h3 className="font-black text-xl text-blue-700 uppercase mb-3">Dịch Vụ Cày Thuê</h3>
             <p className="text-xs font-bold text-gray-600 mb-6 px-4">Nhận cày thuê rank Liên Quân, Free Fire lên Thách Đấu siêu tốc.</p>
             <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-black text-[11px] uppercase shadow-md hover:bg-blue-700">Liên Hệ Zalo</button>
          </div>
          <div className="bg-red-50 border-2 border-red-500 rounded-3xl p-8 text-center hover:scale-105 transition-all cursor-pointer shadow-lg group">
             <div className="text-6xl mb-4 group-hover:animate-pulse">💎</div>
             <h3 className="font-black text-xl text-red-700 uppercase mb-3">Nạp Kim Cương / Robux</h3>
             <p className="text-xs font-bold text-gray-600 mb-6 px-4">Nạp KC FF, Quân Huy, Robux tỷ lệ cực cao.</p>
             <button className="bg-red-600 text-white px-8 py-3 rounded-xl font-black text-[11px] uppercase shadow-md hover:bg-red-700">Liên Hệ Zalo</button>
          </div>
      </div>
    </div>
  );
};

export default ServicesPage;