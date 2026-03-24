import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#1e293b] text-white py-12 mt-20 border-t-4 border-red-600">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        <div>
          <img src="/logo.jpg" className="mb-3 rounded h-12 object-contain animate-pulse" alt="CHIN SHOP" />
          <p className="font-bold italic text-[11px] mb-2">Tiktoker/Streamer/Gamer/Youtuber</p>
          <ul className="space-y-1 text-[11px] font-bold text-gray-300">
            <li>• Shop acc Liên Quân - FreeFire - FC</li>
            <li>• Sẵn sàng hỗ trợ khách hàng 24/24.</li>
            <li>• UY TÍN - GIÁ RẺ - CHẤT LƯỢNG</li>
          </ul>
        </div>
        <div>
          <h4 className="font-black uppercase mb-4 text-white">Lưu ý cần biết</h4>
          <ul className="space-y-3 text-[11px] font-bold text-gray-300">
            <li>Zalo shop: 079 821 6387</li>
            <li>Thời gian hỗ trợ thông tin: 7H - 0H mỗi ngày</li>
          </ul>
        </div>
        <div>
          <h4 className="font-black uppercase mb-4 text-white">Hướng dẫn</h4>
          <ul className="space-y-3 text-[11px] font-bold text-gray-300 cursor-pointer">
            <li className="hover:text-red-500 transition-all">Hướng dẫn bảo mật</li>
            <li className="hover:text-red-500 transition-all">Hướng dẫn trả góp</li>
          </ul>
        </div>
        <div>
          <h4 className="font-black uppercase mb-4 text-white">Kết nối</h4>
          <a href="https://zalo.me/0798216387" target="_blank" rel="noreferrer" className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-black px-6 py-2 rounded-full text-xs transition-all shadow-md">
            Nhắn tin Zalo
          </a>
        </div>
      </div>
      <div className="text-center mt-12 pt-6 border-t border-gray-700 opacity-50 text-[9px] font-black uppercase">
        Designed by Vo Nguyen Duy Hoang
      </div>
    </footer>
  );
};

export default Footer;