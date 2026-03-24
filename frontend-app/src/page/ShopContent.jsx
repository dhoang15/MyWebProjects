import React from 'react';
import { shopData } from '../data/shopData';
import PackageCard from '../components/PackageCard';

const ShopContent = ({ products }) => {
  return (
    <div className="space-y-12">
      {shopData.map((item, idx) => (
        <div key={idx} className="bg-white p-6 rounded-[2rem] border-2 border-black shadow-sm italic">
          {/* TIÊU ĐỀ DANH MỤC */}
          <div className="border-b-2 border-red-600 inline-block mb-8">
            <h2 className="text-sm font-black uppercase text-red-600 italic px-2">
              <span className="text-red-600 mr-2">✱</span> DANH MỤC {item.category}
            </h2>
          </div>

          {/* LƯỚI GÓI HÀNG */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {item.packages.map((pkg, i) => {
              const imageNumber = (idx * 4) + i + 1;
              const count = products.filter(p => 
                p.category?.toUpperCase() === item.category.toUpperCase() && 
                Number(p.price) === pkg.price
              ).length;

              return (
                <PackageCard 
                  key={i} 
                  pkg={pkg} 
                  category={item.category} 
                  count={count} 
                  imageNumber={imageNumber} 
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShopContent;