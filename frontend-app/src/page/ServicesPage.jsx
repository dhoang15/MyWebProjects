import React from 'react';
import { ServiceCard } from '@/components/ServiceCard';

const ServicesPage = () => {
  return (
    <div className="bg-white p-8 rounded-[2rem] shadow-xl border-2 border-black animate-in fade-in duration-500">
      <div className="border-b-2 border-red-600 inline-block mb-8">
          <h2 className="text-xl font-black uppercase text-red-600 italic px-2">🛠 CÁC DỊCH VỤ KHÁC</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <ServiceCard title="Cày Thuê" description="Nhận cày thuê rank Liên Quân, Free Fire lên Thách Đấu siêu tốc." contactInfo="Liên Hệ Zalo" color={'red'} />
         <ServiceCard title="Nạp Kim Cương" description="Nạp kim cương cho các game nổi tiếng với giá tốt nhất." contactInfo="Liên Hệ Zalo" color={'blue'} />
      </div>
    </div>
  );
};

export default ServicesPage;