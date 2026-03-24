import React from 'react';

export const RegisterModal = ({ isOpen, onClose, onSubmit, regForm, setRegForm, captchaCode, generateCaptcha, inputCaptcha, setInputCaptcha }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[999] bg-black/80 flex items-center justify-center p-4 backdrop-blur-md">
      <div className="bg-white rounded-3xl w-full max-w-md p-8 border-4 border-black relative animate-in zoom-in duration-200 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
        <button onClick={onClose} className="absolute top-4 right-4 font-black text-2xl text-black hover:text-red-600">✕</button>
        <h2 className="text-3xl font-black text-red-600 mb-2 uppercase italic">Đăng ký mới</h2>
        <p className="text-[10px] font-bold text-gray-500 mb-6 uppercase">Tạo tài khoản để bắt đầu mua Acc tại CHIN SHOP</p>
        
        <form onSubmit={onSubmit} className="space-y-4">
          <input type="text" placeholder="Tên đăng nhập" required className="w-full border-2 border-black p-3 rounded-xl text-sm font-bold outline-none focus:bg-yellow-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" onChange={(e) => setRegForm({...regForm, username: e.target.value})} />
          <input type="password" placeholder="Mật khẩu" required className="w-full border-2 border-black p-3 rounded-xl text-sm font-bold outline-none focus:bg-yellow-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" onChange={(e) => setRegForm({...regForm, password: e.target.value})} />
          <input type="email" placeholder="Email liên hệ" required className="w-full border-2 border-black p-3 rounded-xl text-sm font-bold outline-none focus:bg-yellow-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" onChange={(e) => setRegForm({...regForm, email: e.target.value})} />
          
          <div className="flex items-center gap-3 bg-gray-100 p-2 rounded-xl border-2 border-black">
            <div className="bg-black text-cyan-400 px-4 py-2 font-mono text-xl italic tracking-widest select-none">{captchaCode}</div>
            <button type="button" onClick={generateCaptcha} className="text-xl">🔄</button>
            <input 
  type="text" 
  placeholder="Mã..." 
  required 
  value={inputCaptcha} 
  onChange={(e) => setInputCaptcha(e.target.value)} 
  // Mình thêm max-w-[120px] để khống chế độ dài của nó lại
  className="w-full max-w-[120px] p-2 rounded-lg border-2 border-black uppercase font-black outline-none focus:bg-yellow-50 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" 
/>
          </div>
          
          <button type="submit" className="w-full bg-red-600 text-white font-black py-4 rounded-2xl text-sm uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all border-2 border-black">
            🚀 XÁC NHẬN ĐĂNG KÝ
          </button>
        </form>
      </div>
    </div>
  );
};

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
          <button type="submit" className="w-full bg-black text-white font-black py-4 rounded-2xl text-sm uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-red-600 active:shadow-none active:translate-x-1 active:translate-y-1 transition-all border-2 border-black">
            🔥 VÀO SHOP NGAY
          </button>
        </form>
      </div>
    </div>
  );
};

export const ProfileModal = ({ isOpen, user, onClose }) => {
  if (!isOpen || !user) return null;
  return (
    <div className="fixed inset-0 z-[999] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-sm p-8 border-4 border-black relative animate-in zoom-in duration-200 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
        <button onClick={onClose} className="absolute top-4 right-4 font-black text-2xl text-black">✕</button>
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <span className="text-3xl font-black text-black uppercase">{user.username.charAt(0)}</span>
          </div>
          <h2 className="text-xl font-black text-black uppercase italic">{user.username}</h2>
          <p className="text-[10px] font-bold text-gray-500">THÀNH VIÊN CHIN SHOP</p>
        </div>
        <div className="space-y-3 bg-gray-50 p-4 rounded-2xl border-2 border-black font-bold text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex justify-between border-b-2 border-gray-200 pb-2">
            <span className="text-gray-500">SỐ DƯ:</span>
            <span className="text-red-600 font-black">{user.balance?.toLocaleString()}đ</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">EMAIL:</span>
            <span className="truncate ml-2">{user.email || 'N/A'}</span>
          </div>
        </div>
        <button onClick={onClose} className="w-full bg-black text-white mt-6 py-3 rounded-xl font-black text-xs uppercase hover:bg-red-600 transition-all">ĐÓNG LẠI</button>
      </div>
    </div>
  );
};