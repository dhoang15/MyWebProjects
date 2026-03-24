import React from 'react';
import { Link, useParams } from 'react-router-dom';

const CategoryPage = ({ products, handleBuy }) => {
  const { categoryName } = useParams();
  const filteredProducts = products.filter(p => p.category?.toUpperCase() === categoryName.toUpperCase());

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-6 rounded-2xl border-2 border-black flex justify-between items-center shadow-md">
        <h2 className="text-xl font-black uppercase text-red-600 italic">DANH MỤC: {categoryName}</h2>
        <Link to="/" className="bg-black text-white px-4 py-2 rounded-lg font-bold text-xs uppercase">Quay lại</Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? filteredProducts.map((item, i) => (
          <div key={i} className="bg-white rounded-3xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all group flex flex-col relative">
            <div className="aspect-[4/3] relative overflow-hidden">
               <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" alt="acc" />
            </div>
            <div className="p-4 text-center space-y-2">
               <h3 className="text-[11px] font-black uppercase truncate">{item.name}</h3>
               <p className="text-red-600 font-black text-lg">{item.price?.toLocaleString()}đ</p>
               <button onClick={() => handleBuy(item)} className="w-full bg-red-600 text-white py-2 rounded-xl text-[10px] font-black uppercase">MUA NGAY</button>
            </div>
          </div>
        )) : (
          <div className="col-span-full text-center py-20 font-black uppercase italic text-white opacity-50">Chưa có dữ liệu trong danh mục này...</div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;