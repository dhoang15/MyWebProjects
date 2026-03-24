import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ user, setIsRegisterOpen, setIsLoginOpen, setIsProfileOpen, handleLogout }) => {
  return (
    <header className="bg-red-600 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center text-white">
        <Link to="/" className="flex items-center gap-3">
          <img src="/stic.webp" alt="CHIN SHOP" className="h-20 object-contain hover:scale-105 transition-transform" />
        </Link>
        <nav className="hidden md:flex gap-6 text-[11px] font-bold uppercase">
          <Link to="/" className="hover:text-yellow-300 transition-all">Trang chủ</Link>
          <Link to="/nap-tien" className="hover:text-yellow-300 transition-all">Nạp Tiền</Link>
          <Link to="/tui-mu" className="hover:text-yellow-300 transition-all">Túi Mù</Link>
          <Link to="/dich-vu" className="hover:text-yellow-300 transition-all">Dịch vụ Khác</Link>
        </nav>

        {!user ? (
          <div className="flex gap-2">
            <button onClick={() => setIsRegisterOpen(true)} className="bg-black/20 text-white px-4 py-2 rounded font-black text-[10px] uppercase border border-white/20 hover:bg-black/40 transition-all">Đăng ký</button>
            <button onClick={() => setIsLoginOpen(true)} className="bg-white text-red-600 px-5 py-2 rounded font-black text-[10px] uppercase shadow-sm hover:scale-105 transition-all">Đăng nhập</button>
          </div>
        ) : (
          <div className="relative group">
            <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded cursor-pointer border border-white/20 hover:bg-black/50 transition-all">
              <img src="https://via.placeholder.com/30x30/ffffff/ff0000?text=A" className="w-6 h-6 rounded-full border border-white" alt="avatar" />
              <div className="flex flex-col items-end">
                <span className="text-[9px] font-bold opacity-80 leading-none">{user.username}</span>
                <span className="text-[11px] font-black text-yellow-400">SD: {user.balance?.toLocaleString()}đ</span>
              </div>
            </div>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden">
              <ul className="text-gray-800 text-[11px] font-bold">
                <li className="hover:bg-gray-100 transition-all">
                  <Link to="/history" className="px-4 py-3 flex items-center gap-2">📜 Lịch sử mua Acc</Link>
                </li>
                <li className="hover:bg-gray-100 transition-all cursor-pointer">
                  <div onClick={() => setIsProfileOpen(true)} className="px-4 py-3 flex items-center gap-2">👤 Thông tin tài khoản</div>
                </li>
                <li className="border-t hover:bg-red-50 transition-all cursor-pointer">
                  <div onClick={handleLogout} className="w-full text-left px-4 py-3 text-red-600 flex items-center gap-2">🚪 Thoát tài khoản</div>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;