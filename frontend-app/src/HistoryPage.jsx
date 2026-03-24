import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HistoryPage = ({ user }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/api/auth/history/${user.id}`)
        .then(res => res.json())
        .then(data => setHistory(data))
        .catch(() => {});
    }
  }, [user]);

  if (!user) return <div className="text-center p-20 font-black uppercase italic text-white">Vui lòng đăng nhập để xem lịch sử!</div>;

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-[2rem] shadow-xl border-2 border-black animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
         <h2 className="text-2xl font-black italic text-red-600 uppercase">📜 Lịch Sử Giao Dịch</h2>
         <Link to="/" className="bg-black text-white px-4 py-2 rounded-lg font-bold text-xs uppercase hover:bg-gray-800">Quay lại Shop</Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 font-black uppercase text-[10px]">
            <tr>
              <th className="p-4 rounded-tl-lg">Sản phẩm</th>
              <th className="p-4">Tài khoản & Mật khẩu</th>
              <th className="p-4">Mức giá</th>
              <th className="p-4 rounded-tr-lg">Ngày giao dịch</th>
            </tr>
          </thead>
          <tbody>
            {history.length > 0 ? history.map((h, i) => (
              <tr key={i} className="border-b hover:bg-gray-50 transition-all">
                <td className="p-4 font-bold text-gray-800">{h.username_acc}</td>
                <td className="p-4 font-mono text-red-600 font-bold bg-red-50">{h.password_acc}</td>
                <td className="p-4 font-black">{h.price?.toLocaleString()}đ</td>
                <td className="p-4 text-xs text-gray-500 font-bold">{new Date(h.buy_date).toLocaleString()}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4" className="text-center py-10 text-gray-400 font-bold italic uppercase">Bạn chưa mua tài khoản nào.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryPage;