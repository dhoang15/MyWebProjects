import React, { useState } from 'react';
import toast from 'react-hot-toast';

const BlindBoxPage = ({ user, setUser, products, setProducts }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [winnerIndex, setWinnerIndex] = useState(null);

  const handleStartSpin = async () => {
    if (isSpinning) return;
    if (!user) return toast.error("Vui lòng đăng nhập!");
    if (user.balance < 10000) return toast.error("Số dư không đủ 10.000đ!");
    const blindBoxItem = products.find(p => 
      p.category?.toLowerCase().normalize("NFC") === "túi mù".toLowerCase().normalize("NFC")
    );
    if (!blindBoxItem) return toast.error("Kho Túi Mù đang hết hàng!");

    setIsSpinning(true);
    setWinnerIndex(null);
    let iterations = 0;
    const maxIterations = 20;

    const spin = setInterval(() => {
      setCurrentIndex(prev => (prev === null ? 0 : (prev + 1) % 9));
      iterations++;

      if (iterations > maxIterations) {
        clearInterval(spin);
        const finalWinner = Math.floor(Math.random() * 9);
        setWinnerIndex(finalWinner);
        setCurrentIndex(finalWinner);
        processPurchase(blindBoxItem);
      }
    }, 100);
  };

  const processPurchase = async (item) => {
    const loadId = toast.loading("Đang kiểm tra túi may mắn...");
    try {
      const res = await fetch('http://localhost:5000/api/buy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id, product_id: item.id, price: 40000 })
      });
      const data = await res.json();

      if (res.ok) {
        setUser({ ...user, balance: data.newBalance });
        toast.success("🎉 CHÚC MỪNG! Bạn đã mở trúng Acc VIP trong túi!", { id: loadId });
        fetch('http://localhost:5000/api/products').then(res => res.json()).then(d => setProducts(d));
      } else {
        toast.error(data.message, { id: loadId });
      }
    } catch (e) {
      toast.error("Lỗi kết nối máy chủ!", { id: loadId });
    } finally {
      setIsSpinning(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-500 italic">
      <div className="lg:col-span-8 bg-[#0a0b1e] rounded-2xl p-6 border-2 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.4)]">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div 
              key={i} 
              className={`aspect-[3/4] rounded-xl border-4 overflow-hidden relative transition-all duration-100 
                ${currentIndex === i ? 'border-red-500 scale-105 shadow-[0_0_20px_red]' : 'border-yellow-500/20'}
                ${winnerIndex === i ? 'border-green-500 bg-green-500/20' : ''}
              `}
            >
               <img src="/tuimu.jpg" className={`w-full h-full object-cover ${currentIndex === i ? 'brightness-125' : 'grayscale'}`} alt="box" />
               {winnerIndex === i && (
                 <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white font-black text-xs animate-bounce">TRÚNG!</div>
               )}
            </div>
          ))}
        </div>
        <div className="space-y-3">
           <button 
             onClick={handleStartSpin}
             disabled={isSpinning}
             className={`w-full py-4 rounded-xl font-black uppercase text-xl transition-all shadow-lg 
               ${isSpinning ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-red-600 to-pink-600 hover:scale-105 active:scale-95 text-white'}
             `}
           >
             {isSpinning ? 'ĐANG QUAY...' : 'MỞ NGAY 10.000Đ'}
           </button>
        </div>
      </div>
      
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
               <p>Trực tiếp tại web qua dịch vụ nạp thẻ</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default BlindBoxPage;