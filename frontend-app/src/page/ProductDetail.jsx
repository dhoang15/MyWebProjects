import React from 'react';
import { Link, useParams } from 'react-router-dom';

const ProductDetail = ({ products, handleBuy }) => {
  const { id } = useParams();
  const item = products.find(p => p.id === parseInt(id));

  if (!item) return <div className="text-center p-20 font-black uppercase italic text-white">Đang tải dữ liệu acc...</div>;

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl border border-gray-200 overflow-hidden shadow-2xl animate-in zoom-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-6 bg-gray-50 flex justify-center items-center">
           <img src={item.image || "https://via.placeholder.com/600x400?text=ANH+ACC+CHI+TIET"} className="w-full rounded-lg shadow-md" alt="product" />
        </div>
        <div className="p-8 space-y-6">
           <div className="flex justify-between items-start">
              <h2 className="text-2xl font-black uppercase text-red-600">{item.name}</h2>
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded text-[10px] font-black uppercase">Mã số: {item.ms}</span>
           </div>
           <div className="space-y-2 text-sm font-bold text-gray-600">
              <p>Trạng thái: <span className="text-green-600">Còn hàng</span> <span className="text-xs text-gray-400">(Số lượng: 99+)</span></p>
              <p>Loại game: <span className="text-black uppercase">{item.category}</span></p>
           </div>
           <div className="text-4xl font-black text-red-600">{item.price?.toLocaleString()}đ</div>
           
           <div className="bg-gray-100 p-4 rounded-lg border-l-4 border-red-600">
              <p className="text-[11px] font-black uppercase text-gray-800">Thông quy định tài khoản:</p>
              <p className="text-[11px] text-gray-600 mt-1">Sau khi mua thành công, thông tin đăng nhập sẽ hiện ở mục Lịch Sử Mua Hàng.</p>
           </div>
           <button onClick={() => handleBuy(item)} className="w-full bg-red-600 text-white py-4 rounded-lg font-black uppercase text-lg hover:bg-red-700 active:scale-95 transition-all shadow-lg animate-pulse">MUA NGAY</button>
           <Link to="/" className="block text-center text-[11px] font-bold text-gray-500 uppercase hover:text-red-600 transition-all">← Quay lại trang chủ</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;