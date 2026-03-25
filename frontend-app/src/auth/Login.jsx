import React from 'react';

export const LoginModal = ({ isOpen, onClose, onSubmit, loginForm, setLoginForm }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[999] bg-black/80 flex items-center justify-center p-4 backdrop-blur-md">
      <div className="bg-white rounded-3xl w-full max-w-sm p-8 border-4 border-black relative animate-in zoom-in duration-200 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
        <button onClick={onClose} className="absolute top-4 right-4 font-black text-2xl text-black hover:text-red-600">✕</button>
        <h2 className="text-3xl font-black text-red-600 mb-6 uppercase italic">Đăng Nhập</h2>
        <form onSubmit={onSubmit} className="space-y-5">
          <input type="text" placeholder="Tên tài khoản" required className="w-full border-2 border-black p-3 rounded-xl text-sm font-bold outline-none focus:bg-yellow-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" onChange={(e) => setLoginForm({...loginForm, username: e.target.value})} />
          <input type="password" placeholder="Mật khẩu" required className="w-full border-2 border-black p-3 rounded-xl text-sm font-bold outline-none focus:bg-yellow-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" onChange={(e) => setLoginForm({...loginForm, password: e.target.value})} />
          <button type="submit" className="w-full bg-black text-white font-black py-4 rounded-2xl text-sm uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-red-600 transition-all border-2 border-black">
            🔥 VÀO SHOP NGAY
          </button>
        </form>
      </div>
    </div>
  );
};