import React from 'react';

export const ProfileModal = ({ isOpen, user, onClose }) => {
  // Nếu không mở hoặc không có user thì không hiện gì cả
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/80 flex items-center justify-center p-4 backdrop-blur-md">
      <div className="bg-white rounded-3xl w-full max-w-sm p-8 border-4 border-black relative animate-in zoom-in duration-200 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
        
        {/* Nút đóng góc trên */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 font-black text-2xl text-black hover:text-red-600 transition-colors"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          {/* Avatar lấy chữ cái đầu của Username */}
          <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <span className="text-3xl font-black text-black uppercase">
              {user?.username?.charAt(0) || "U"}
            </span>
          </div>
          <h2 className="text-xl font-black text-black uppercase italic tracking-tight">
            {user?.username || "Người dùng"}
          </h2>
          <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">Thành viên CHIN SHOP</p>
        </div>

        <div className="space-y-4 bg-gray-50 p-5 rounded-2xl border-2 border-black font-bold text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          {/* Số dư tài khoản */}
          <div className="flex justify-between items-center border-b-2 border-gray-200 pb-3">
            <span className="text-gray-500 uppercase text-[11px]">Số dư hiện tại:</span>
            <span className="text-red-600 font-black text-lg">
              {(user?.balance || 0).toLocaleString()}đ
            </span>
          </div>

          {/* Email tài khoản */}
          <div className="flex justify-between items-center">
            <span className="text-gray-500 uppercase text-[11px]">Email liên kết:</span>
            <span className="truncate ml-4 text-black max-w-[150px]" title={user?.email}>
              {user?.email || 'Chưa cập nhật'}
            </span>
          </div>
        </div>

        {/* Nút Đóng phía dưới */}
        <button 
          onClick={onClose} 
          className="w-full bg-black text-white mt-8 py-4 rounded-2xl font-black text-xs uppercase hover:bg-red-600 active:translate-y-1 active:shadow-none transition-all border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          ĐÓNG LẠI
        </button>
      </div>
    </div>
  );
};            