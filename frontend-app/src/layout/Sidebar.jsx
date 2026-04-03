import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Sidebar = ({ user, topDepositors }) => {
  const [activeTab, setActiveTab] = useState('napThe');
  const [cardData, setCardData] = useState({ 
    type: 'Viettel', 
    amount: '10000', 
    pin: '', 
    serial: '' 
  });

  // Danh sách mệnh giá để map ra cho gọn
  const amounts = [
    { value: '10000', label: '10.000đ - Nhận 8.520đ' },
    { value: '20000', label: '20.000đ - Nhận 16.840đ' },
    { value: '30000', label: '30.000đ - Nhận 25.260đ' },
    { value: '50000', label: '50.000đ - Nhận 43.200đ' },
    { value: '100000', label: '100.000đ - Nhận 86.400đ' },
    { value: '200000', label: '200.000đ - Nhận 172.400đ' },
    { value: '500000', label: '500.000đ - Nhận 431.000đ' },
    { value: '1000000', label: '1.000.000đ - Nhận 862.000đ' },
  ];

  const handleCardSubmit = (e) => {
    e.preventDefault();
    if (!user) return toast.error("Vui lòng đăng nhập!");
    if (!cardData.pin || !cardData.serial) return toast.error("Nhập đủ mã thẻ và seri!");
    
    const loadId = toast.loading("Đang gửi thẻ lên hệ thống...");
    setTimeout(() => {
      toast.success("Gửi thẻ thành công! Vui lòng chờ duyệt.", { id: loadId });
      setCardData({ ...cardData, pin: '', serial: '' });
    }, 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col border-2 border-black h-[420px] italic font-bold">
      {/* TABS MENU */}
      <div className="flex bg-gray-200 border-b-2 border-black">
        {['napThe', 'chuyenKhoan', 'topNap'].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} 
            className={`flex-1 py-3 text-[10px] uppercase transition-all ${activeTab === tab ? 'bg-red-600 text-white' : 'hover:bg-gray-300'}`}>
            {tab === 'napThe' ? 'Nạp thẻ' : tab === 'chuyenKhoan' ? 'ATM/MOMO' : 'Top Nạp'}
          </button>
        ))}
      </div>

      <div className="p-5 flex-1 bg-white overflow-y-auto custom-scrollbar text-black">
        {activeTab === 'napThe' && (
          <form onSubmit={handleCardSubmit} className="space-y-3">
            {/* CHỌN NHÀ MẠNG */}
            <select 
              value={cardData.type} 
              onChange={(e) => setCardData({...cardData, type: e.target.value})} 
              className="w-full border-2 border-black p-2 rounded-xl text-xs font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] outline-none bg-white"
            >
              <option value="Viettel">Viettel</option>
              <option value="Vinaphone">Vinaphone</option>
              <option value="Mobifone">Mobifone</option>
              <option value="Garena">Garena (⭐)</option>
              <option value="Zing">Zing</option>
              <option value="Vcoin">Vcoin</option>
              <option value="Scoin">Scoin</option>
            </select>

            {/* CHỌN MỆNH GIÁ */}
            <select 
              value={cardData.amount} 
              onChange={(e) => setCardData({...cardData, amount: e.target.value})} 
              className="w-full border-2 border-black p-2 rounded-xl text-xs font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] outline-none bg-white"
            >
              <option value="">--- Mệnh giá ---</option>
              {amounts.map((amt) => (
                <option key={amt.value} value={amt.value}>{amt.label}</option>
              ))}
            </select>

            {/* NHẬP MÃ & SERI */}
            <div className="space-y-3">
              <input 
                type="text" 
                value={cardData.pin} 
                onChange={(e) => setCardData({...cardData, pin: e.target.value})} 
                placeholder="Mã nạp (PIN)..." 
                className="w-full border-2 border-black p-2 rounded-xl text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] outline-none" 
              />
              <input 
                type="text" 
                value={cardData.serial} 
                onChange={(e) => setCardData({...cardData, serial: e.target.value})} 
                placeholder="Số Serial..." 
                className="w-full border-2 border-black p-2 rounded-xl text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] outline-none" 
              />
            </div>

            <button type="submit" className="w-full bg-red-600 text-white font-black py-3 rounded-2xl text-xs border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all mt-2">
              🔥 NẠP THẺ NGAY
            </button>
          </form>
        )}

        {/* TAB CHUYỂN KHOẢN */}
        {activeTab === 'chuyenKhoan' && (
          <div className="space-y-3 animate-in zoom-in duration-300">
            <div className="bg-blue-600 border-2 border-black p-4 rounded-2xl text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-[10px] opacity-80 uppercase">MB BANK</p>
              <p className="text-xl font-black tracking-wider">0798216387</p>
              <p className="text-[10px] uppercase">VO NGUYEN DUY HOANG</p>
            </div>
            <div className="bg-yellow-300 border-2 border-black p-3 rounded-xl flex justify-between items-center text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-xs font-black uppercase">NAP {user ? user.username : 'CHINSHOP'}</p>
              <button onClick={() => { navigator.clipboard.writeText(`NAP ${user?.username || 'CHINSHOP'}`); toast.success("Đã copy nội dung!"); }} className="bg-black text-white text-[8px] px-3 py-1 rounded font-black">COPY</button>
            </div>
          </div>
        )}

        {/* TAB TOP NẠP */}
        {activeTab === 'topNap' && (
          <div className="space-y-2">
            {(topDepositors || []).map((item, i) => (
              <div key={i} className={`flex items-center justify-between p-2 border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${i === 0 ? 'bg-orange-400' : 'bg-white'}`}>
                <span className="text-[10px] font-black uppercase">{i + 1}. {item.username}</span>
                <span className="text-[10px] font-black text-red-600">{item.total_nap?.toLocaleString()}đ</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;