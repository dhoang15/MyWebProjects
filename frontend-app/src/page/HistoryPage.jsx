import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HistoryRow from '@/hictory/hictoryrows'; // GỌI NÓ LÊN

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
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-[2rem] shadow-xl border-4 border-black animate-in fade-in duration-500 italic font-bold">
      <div className="flex justify-between items-center mb-6 border-b-2 border-black pb-4">
         <h2 className="text-2xl font-black italic text-red-600 uppercase tracking-tighter">📜 Lịch Sử Giao Dịch</h2>
         <Link to="/" className="bg-black text-white px-6 py-2 rounded-xl font-black text-[10px] uppercase shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">
           🏠 Quay lại Shop
         </Link>
      </div>

      <div className="overflow-x-auto rounded-2xl border-2 border-black">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-200 text-black font-black uppercase text-[10px] border-b-2 border-black">
            <tr>
              <th className="p-4">Tên Sản phẩm</th>
              <th className="p-4">Tài khoản & Mật khẩu</th>
              <th className="p-4">Mức giá</th>
              <th className="p-4">Ngày giao dịch</th>
            </tr>
          </thead>
          <tbody>
            {history.length > 0 ? (
              history.map((h, i) => <HistoryRow key={i} data={h} />)
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-20 text-gray-400 font-black uppercase opacity-30">Kho dữ liệu trống...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryPage;