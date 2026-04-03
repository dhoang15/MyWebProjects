import React, { useState } from 'react';
import toast from 'react-hot-toast';
import BoxGrid from '@/blindbox/Boxgrid'; 
import SideRules from '@/blindbox/SideRules'; 

const BlindBoxPage = ({ user, setUser, products = [], setProducts }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [winnerIndex, setWinnerIndex] = useState(null);

  // 🌍 Lấy API_URL sạch
  const API_URL = import.meta.env.VITE_API_URL || 'https://mywebprojects-rxl0.onrender.com';
  const cleanUrl = API_URL.replace(/\/$/, '');

  const handleStartSpin = async () => {
    if (!user) return toast.error("Vui lòng đăng nhập để mở túi mù!");
    if (user.balance < 10000) return toast.error("Bạn không đủ 10.000đ để mở!");
    if (isSpinning) return;

    setIsSpinning(true);
    setWinnerIndex(null);

    // 🎲 Logic Quay vòng (Giữ nguyên logic của Hoàng hoặc dùng bản rút gọn này)
    let count = 0;
    const interval = setInterval(() => {
      setCurrentIndex(Math.floor(Math.random() * 8)); // Giả sử có 8 ô
      count++;
      if (count > 20) {
        clearInterval(interval);
        const winIdx = Math.floor(Math.random() * 8);
        setWinnerIndex(winIdx);
        setIsSpinning(false);
        // Sau khi dừng quay, gọi hàm xử lý trừ tiền và nhận quà
        processPurchase(winIdx);
      }
    }, 100);
  };

  const processPurchase = async (winIdx) => {
    try {
      const res = await fetch(`${cleanUrl}/api/blindbox/open`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify({ index: winIdx })
      });

      const data = await res.json();

      if (res.ok) {
        // CẬP NHẬT USER (Trừ tiền)
        setUser({ ...user, balance: data.newBalance });
        localStorage.setItem('userData', JSON.stringify({ ...user, balance: data.newBalance }));
        
        toast.success(`Chúc mừng! Bạn đã nhận được: ${data.rewardName}`, { duration: 5000 });
        
        // Cập nhật lại danh sách sản phẩm (nếu quà là Acc)
        if (data.shouldRefreshProducts) {
           fetch(`${cleanUrl}/api/products`).then(r => r.json()).then(setProducts).catch(() => {});
        }
      } else {
        toast.error(data.message || "Giao dịch thất bại!");
      }
    } catch (error) {
      toast.error("Lỗi kết nối máy chủ!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in italic font-bold">
      <div className="lg:col-span-8 bg-[#0a0b1e] rounded-[2rem] p-6 border-4 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.4)]">
        
        {/* TIÊU ĐỀ */}
        <div className="text-center mb-6">
            <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 uppercase italic">
              ✨ Vòng Quay Túi Mù May Mắn ✨
            </h2>
            <p className="text-gray-400 text-[10px] uppercase mt-1">Mở ra vận may - Nhận Acc cực cháy</p>
        </div>

        <BoxGrid currentIndex={currentIndex} winnerIndex={winnerIndex} />

        <button 
          onClick={handleStartSpin}
          disabled={isSpinning}
          className={`w-full py-5 rounded-2xl font-black uppercase text-2xl transition-all shadow-[0_6px_0_0_rgba(0,0,0,0.3)] active:translate-y-1 active:shadow-none mt-6
            ${isSpinning ? 'bg-gray-600 cursor-not-allowed opacity-50' : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:scale-[1.02]'}
          `}
        >
          {isSpinning ? '🔮 ĐANG MỞ TÚI...' : '🧧 MỞ NGAY 10.000Đ'}
        </button>
      </div>
      
      <div className="lg:col-span-4">
         <SideRules />
      </div>
    </div>
  );
};

export default BlindBoxPage;