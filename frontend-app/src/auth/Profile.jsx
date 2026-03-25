import React from 'react';

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