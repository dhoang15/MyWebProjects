import React, { useState } from 'react';
import toast from 'react-hot-toast';
import BoxGrid from '@/blindbox/Boxgrid'; 
import SideRules from '@/blindbox/SideRules'; 

const BlindBoxPage = ({ user, setUser, products, setProducts }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [winnerIndex, setWinnerIndex] = useState(null);

  const handleStartSpin = async () => {
    // ... Giữ nguyên logic quay (setInterval) của Hoàng ở đây ...
  };

  const processPurchase = async (item) => {
    // ... Giữ nguyên logic fetch API mua hàng của Hoàng ở đây ...
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in italic">
      <div className="lg:col-span-8 bg-[#0a0b1e] rounded-2xl p-6 border-2 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.4)]">
        
        {/* GỌI COMPONENT LƯỚI Ô RA */}
        <BoxGrid currentIndex={currentIndex} winnerIndex={winnerIndex} />

        <button 
          onClick={handleStartSpin}
          disabled={isSpinning}
          className={`w-full py-4 rounded-xl font-black uppercase text-xl transition-all shadow-lg 
            ${isSpinning ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-red-600 to-pink-600 text-white'}
          `}
        >
          {isSpinning ? 'ĐANG QUAY...' : 'MỞ NGAY 10.000Đ'}
        </button>
      </div>
      
      {/* GỌI COMPONENT LƯU Ý RA */}
      <SideRules />
    </div>
  );
};

export default BlindBoxPage;