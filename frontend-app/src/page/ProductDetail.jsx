import React from 'react';
import { Link, useParams } from 'react-router-dom';

const ProductDetail = ({ products = [], handleBuy }) => {
  const { id } = useParams();

  // 🛡️ BẢO VỆ: Đảm bảo products là mảng và so sánh ID linh hoạt (số hoặc chuỗi đều nhận)
  const safeProducts = Array.isArray(products) ? products : [];
  const item = safeProducts.find(p => (p.id?.toString() === id || p._id?.toString() === id));

  if (!item) {
    return (
      <div className="max-w-4xl mx-auto text-center p-20 bg-white/10 rounded-3xl border-2 border-dashed border-white/20">
        <p className="text-xl font-black uppercase italic text-white animate-pulse">
          🔍 Không tìm thấy thông tin Acc này...
        </p>
        <Link to="/" className="mt-6 inline-block text-red-400 font-bold uppercase hover:underline">
          Quay lại trang chủ
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-[2rem] border-4 border-black overflow-hidden shadow-2xl animate-in zoom-in duration-500 italic font-bold">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* HÌNH ẢNH ACC */}
        <div className="p-6 bg-gray-100 flex justify-center items-center border-r-2 border-black">
           <img 
            src={item.image || "https://via.placeholder.com/600x400?text=ANH+ACC+CHIN+SHOP"} 
            className="w-full rounded-2xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" 
            alt="product" 
          />
        </div>

        {/* THÔNG TIN CHI TIẾT */}
        <div className="p-8 space-y-6">
           <div className="flex justify-between items-start border-b-2 border-black pb-4">
              <h2 className="text-3xl font-black uppercase text-red-600 tracking-tighter leading-none">{item.title || item.name}</h2>
              <span className="bg-yellow-400 text-black border-2 border-black px-3 py-1 rounded-lg text-[10px] font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                Mã số: {item.ms || item.id || "VIP"}
              </span>
           </div>

           <div className="space-y-3 text-sm font-black text-gray-800 uppercase">
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                Trạng thái: <span className="text-green-600">Sẵn có</span> 
              </p>
              <p>Loại game: <span className="bg-red-100 px-2 py-0.5 rounded text-red-600">{item.category}</span></p>
           </div>

           <div className="text-5xl font-black text-red-600 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            {item.price?.toLocaleString()}đ
           </div>
           
           <div className="bg-gray-100 p-4 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-[11px] font-black uppercase text-gray-800">📜 Quy định mua hàng:</p>
              <p className="text-[10px] text-gray-600 mt-1 font-bold">Tài khoản sẽ được gửi vào mục "Lịch sử mua hàng" ngay sau khi thanh toán thành công.</p>
           </div>

           <button 
            onClick={() => handleBuy(item)} 
            className="w-full bg-red-600 text-white py-5 rounded-2xl font-black uppercase text-xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-red-700 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
           >
            🚀 MUA NGAY
           </button>

           <Link to="/" className="block text-center text-[11px] font-bold text-gray-500 uppercase hover:text-red-600 transition-all underline">
            ← Quay lại trang chủ
           </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;