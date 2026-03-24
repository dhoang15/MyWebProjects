import React from 'react';
import { Link } from 'react-router-dom';

const ShopContent = ({ products, handleBuy }) => {
  const shopData = [
    {
      category: "LIÊN QUÂN",
      packages: [
        { label: "TÚI MÙ LQ NGẪU NHIÊN", price: 20000, note: "Đã bán: 657" },
        { label: "ACC LIÊN QUÂN TRẢI NGHIỆM", price: 50000, note: "Đã bán: 321" },
        { label: "NICK LIÊN QUÂN 100K", price: 100000, note: "Đã bán: 987" },
        { label: "NICK LQ TRẮNG THÔNG TIN", price: 200000, note: "Đã bán: 543" }
      ]
    },
    {
      category: "FREE FIRE",
      packages: [
        { label: "TÚI MÙ FF - ACC NGẪU NHIÊN", price: 20000, note: "Đã bán: 789" },
        { label: "TÚI MÙ FF - 100% ACC CÓ TỪ 2-3 SKIN SÚNG", price: 50000, note: "Đã bán: 456" },
        { label: "TÚI MÙ FF - 100% ACC CÓ TỪ 5-8 SKIN SÚNG", price: 100000, note: "Đã bán: 123" },
        { label: "TÚI MÙ FF - 100% ACC CÓ SÚNG NÂNG CẤP + KIM CƯƠNG", price: 200000, note: "Đã bán: 78" }
      ]
    },
    {
      category: "ROBLOX",
      packages: [
        { label: "TÚI MÙ RANDOM PET SÓNG THẦN 20K", price: 20000, note: "Đã bán: 123" },
        { label: "BÁN TRÁI RƯƠNG BLOX FRUIT", price: 30000, note: "Đã bán: 456" },
        { label: "TÚI MÙ STEAL A BRAINROT", price: 50000, note: "Đã bán: 789" },
        { label: "TÚI MÙ BLOXFRUIT TỘC V4 100% (CÓ TỈ LỆ NHẬN ACC FULL GEAR)", price: 100000, note: "Đã bán: 12" }
      ]
    },
    {
      category: "TÚI MÙ ROBLOX",
      packages: [
        { label: "TÚI MÙ RANDOM ACC TSB", price: 10000, note: "Đã bán: 94385" },
        { label: "TÚI MÙ RANDOM ACC TSUNAMI ROBLOX", price: 5000, note: "Đã bán: 4356" },
        { label: "TÚI MÙ RANDOM ACC BLOX FRUIT", price: 9000, note: "Đã bán: 34566" },
        { label: "TÚI MÙ RANDOM ACC STEAL A BRAINROT", price: 9000, note: "Đã bán: 56984" }
      ]
    }
  ];

  return (
    <div className="space-y-12">
      {shopData.map((item, idx) => (
        <div key={idx} className="bg-white p-6 rounded-[2rem] border-2 border-black shadow-sm italic">
          <div className="border-b-2 border-red-600 inline-block mb-8">
            <h2 className="text-sm font-black uppercase text-red-600 italic px-2">
              <span className="text-red-600 mr-2">✱</span> DANH MỤC {item.category}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {item.packages.map((pkg, i) => {
              const imageNumber = (idx * 4) + i + 1;
              const count = products.filter(p => 
                p.category?.toUpperCase() === item.category.toUpperCase() && 
                Number(p.price) === pkg.price
              ).length;

              return (
                <Link 
                  key={i}
                  to={item.category === "TÚI MÙ" ? "/tui-mu" : `/category/${item.category}`}
                  className="bg-white rounded-3xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all group flex flex-col relative border-b-4 border-b-gray-300 active:border-b-0 active:translate-y-1"
                >
                  <div className="aspect-[4/3] relative overflow-hidden bg-gray-50">
                    <img 
                      src={`/anh${imageNumber}.jpg`} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" 
                      alt="acc"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/400x300?text=Loi+Anh"; }}
                    />
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-[8px] px-2 py-0.5 rounded font-black shadow-md animate-pulse">MỚI</div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[9px] px-2 py-0.5 rounded font-bold">
                      Còn: {count}
                    </div>
                  </div>

                  <div className="p-4 flex flex-col gap-1 flex-1 text-center font-bold">
                    <h3 className="text-[10px] font-black uppercase text-gray-800 line-clamp-2 h-8">
                      {pkg.label}
                    </h3>
                    <p className="text-[9px] text-gray-400 mb-1">{pkg.note}</p>
                    
                    <div className="mt-auto">
                      <p className="text-black-600 font-red text-lg italic mb-2">
                        {pkg.price.toLocaleString()}đ
                      </p>
                      <div className="w-full bg-black border-2 border-black py-3 rounded-2xl shadow-[0_0_20px_rgba(234,88,12,0.6)] flex items-center justify-center relative overflow-hidden group">
                        <span className="font-black uppercase text-[12px] animate-pulse block relative z-10 select-none tracking-wider animate-boc-lua text-transparent bg-clip-text bg-gradient-to-t from-orange-600 via-yellow-400 to-red-600">
                          XEM TẤT CẢ
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-t from-red-950/50 via-yellow-700/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100 blur-sm scale-110"></div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShopContent;