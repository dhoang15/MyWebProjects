import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard'; // GỌI NÓ LÊN

const CategoryPage = ({ products, handleBuy }) => {
  const { categoryName } = useParams();
  
  // Lọc sản phẩm theo danh mục
  const filteredProducts = products.filter(
    p => p.category?.toUpperCase() === categoryName?.toUpperCase()
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      {/* THANH TIÊU ĐỀ */}
      <div className="bg-white p-6 rounded-2xl border-2 border-black flex justify-between items-center shadow-md">
        <h2 className="text-xl font-black uppercase text-red-600 italic">
          DANH MỤC: {categoryName}
        </h2>
        <Link to="/" className="bg-black text-white px-4 py-2 rounded-lg font-bold text-xs uppercase hover:bg-red-600 transition-all">
          Quay lại
        </Link>
      </div>

      {/* LƯỚI SẢN PHẨM */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <ProductCard 
              key={item.id} 
              item={item} 
              onBuy={handleBuy} 
            />
          ))
        ) : (
          <div className="col-span-full text-center py-20 font-black uppercase italic text-white opacity-50 bg-black/20 rounded-3xl">
            Chưa có dữ liệu trong danh mục này...
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;