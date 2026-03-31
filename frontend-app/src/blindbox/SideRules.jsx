import React from 'react';

const SideRules = () => {
  return (
    <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-xl border-2 border-black">
      <h2 className="text-xl font-black text-red-600 uppercase border-b pb-2 mb-4 italic">🔥 Lưu ý mở túi</h2>
      <div className="space-y-4 text-gray-700 font-bold text-xs">
        <p>1. Hệ thống quay acc ngẫu nhiên Free Fire, Roblox, Liên Quân 100%.</p>
        <p>2. Acc trúng thưởng sẽ nằm trong phần <span className="text-red-600">Lịch sử mua Acc</span>.</p>
        <p>3. Mỗi lượt quay trị giá 10k VNĐ.</p>
        <hr />
        <div className="bg-red-50 p-3 rounded border border-red-200">
          <p className="text-red-600 uppercase mb-1">GIAO DỊCH DUY NHẤT:</p>
          <p>MB Bank: 0798216387</p>
          <p>Chủ TK: Võ Nguyễn Duy Hoàng</p>
        </div>
      </div>
    </div>
  );
};

export default SideRules;