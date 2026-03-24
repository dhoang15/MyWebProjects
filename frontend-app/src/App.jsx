import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

// --- 1. TRANG LỊCH SỬ MUA ACC ---
const HistoryPage = ({ user }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/api/auth/history/${user.id}`)
        .then(res => res.json())
        .then(data => setHistory(data))
        .catch(() => {});
    }
  }, [user]);

  if (!user) return <div className="text-center p-20 font-black uppercase italic text-white">Vui lòng đăng nhập để xem lịch sử!</div>;

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-[2rem] shadow-xl border-2 border-black animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
         <h2 className="text-2xl font-black italic text-red-600 uppercase">📜 Lịch Sử Giao Dịch</h2>
         <Link to="/" className="bg-black text-white px-4 py-2 rounded-lg font-bold text-xs uppercase hover:bg-gray-800">Quay lại Shop</Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 font-black uppercase text-[10px]">
            <tr>
              <th className="p-4 rounded-tl-lg">Sản phẩm</th>
              <th className="p-4">Tài khoản & Mật khẩu</th>
              <th className="p-4">Mức giá</th>
              <th className="p-4 rounded-tr-lg">Ngày giao dịch</th>
            </tr>
          </thead>
          <tbody>
            {history.length > 0 ? history.map((h, i) => (
              <tr key={i} className="border-b hover:bg-gray-50 transition-all">
                <td className="p-4 font-bold text-gray-800">{h.username_acc}</td>
                <td className="p-4 font-mono text-red-600 font-bold bg-red-50">{h.password_acc}</td>
                <td className="p-4 font-black">{h.price?.toLocaleString()}đ</td>
                <td className="p-4 text-xs text-gray-500 font-bold">{new Date(h.buy_date).toLocaleString()}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4" className="text-center py-10 text-gray-400 font-bold italic uppercase">Bạn chưa mua tài khoản nào.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- 2. TRANG CHI TIẾT SẢN PHẨM ---
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

// --- TRANG DANH MỤC MỚI (Sau này Hoàng nhập dữ liệu vào đây) ---
const CategoryPage = ({ products, handleBuy }) => {
  const { categoryName } = useParams();
  // Lọc sản phẩm theo danh mục từ URL
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

// --- 3. TRANG TÚI MÙ (HIỆU ỨNG XOAY XỔ SỐ) ---
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
    let speed = 100;
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
    }, speed);
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
               <img src="tuimu.jpg" className={`w-full h-full object-cover ${currentIndex === i ? 'brightness-125' : 'grayscale'}`} alt="box" />
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

const ShopContent = ({ products, handleBuy }) => {
  // Cấu trúc dữ liệu riêng biệt cho từng danh mục
  const shopData = [
    {
      category: "LIÊN QUÂN",
      key: "lq",
      packages: [
        { label: "TÚI MÙ LQ NGẪU NHIÊN", price: 20000, note: "Đã bán: 657" },
        { label: "ACC LIÊN QUÂN TRẢI NGHIỆM", price: 50000, note: "Đã bán: 321" },
        { label: "NICK LIÊN QUÂN 100K", price: 100000, note: "Đã bán: 987" },
        { label: "NICK LQ TRẮNG THÔNG TIN", price: 200000, note: "Đã bán: 543" }
      ]
    },
    {
      category: "FREE FIRE",
      key: "ff",
      packages: [
        { label: "TÚI MÙ FF - ACC NGẪU NHIÊN", price: 20000, note: "Đã bán: 789" },
        { label: "TÚI MÙ FF - 100% ACC CÓ TỪ 2-3 SKIN SÚNG", price: 50000, note: "Đã bán: 456" },
        { label: "TÚI MÙ FF - 100% ACC CÓ TỪ 5-8 SKIN SÚNG", price: 100000, note: "Đã bán: 123" },
        { label: "TÚI MÙ FF - 100% ACC CÓ SÚNG NÂNG CẤP + KIM CƯƠNG", price: 200000, note: "Đã bán: 78" }
      ]
    },
    {
      category: "ROBLOX",
      key: "rb",
      packages: [
        { label: "TÚI MÙ RANDOM PET SÓNG THẦN 20K", price: 20000, note: "Đã bán: 123" },
        { label: "BÁN TRÁI RƯƠNG BLOX FRUIT", price: 30000, note: "Đã bán: 456" },
        { label: "TÚI MÙ STEAL A BRAINROT", price: 50000, note: "Đã bán: 789" },
        { label: "TÚI MÙ BLOXFRUIT TỘC V4 100% (CÓ TỈ LỆ NHẬN ACC FULL GEAR)", price: 100000, note: "Đã bán: 12" }
      ]
    },
    {
      category: "TÚI MÙ ROBLOX",
      key: "tm",
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
          {/* Tiêu đề danh mục hàng dọc */}
          <div className="border-b-2 border-red-600 inline-block mb-8">
            <h2 className="text-sm font-black uppercase text-red-600 italic px-2">
              <span className="text-red-600 mr-2">✱</span> DANH MỤC {item.category}
            </h2>
          </div>

          {/* Hàng ngang 4 ô */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {item.packages.map((pkg, i) => {
              // Tính số thứ tự ảnh từ anh1.jpg đến anh16.jpg
              const imageNumber = (idx * 4) + i + 1;
              
              // Đếm số lượng sản phẩm thực tế từ products database
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
{/* NÚT VỚI CHỮ XEM TẤT CẢ ĐANG BỐC LỬA CUỒN CUỘN */}
<div className="w-full bg-black border-2 border-black py-3 rounded-2xl shadow-[0_0_20px_rgba(234,88,12,0.6)] flex items-center justify-center relative overflow-hidden group">
  
  {/* Chữ XEM TẤT CẢ: Áp dụng class bốc lửa 'animate-boc-lua' */}
  <span className="font-black uppercase text-[12px] animate-pulse block relative z-10 select-none tracking-wider 
                   animate-boc-lua text-transparent bg-clip-text bg-gradient-to-t from-orange-600 via-yellow-400 to-red-600">
    XEM TẤT CẢ
  </span>

  {/* Lớp phủ rực cháy xung quanh nút (tạo chiều sâu) */}
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

// --- 5. TRANG DỊCH VỤ ---
const ServicesPage = () => {
  return (
    <div className="bg-white p-8 rounded-[2rem] shadow-xl border-2 border-black animate-in fade-in duration-500">
      <div className="border-b-2 border-red-600 inline-block mb-8">
         <h2 className="text-xl font-black uppercase text-red-600 italic px-2">🛠 CÁC DỊCH VỤ KHÁC</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="bg-blue-50 border-2 border-blue-500 rounded-3xl p-8 text-center hover:scale-105 transition-all cursor-pointer shadow-lg group">
            <div className="text-6xl mb-4 group-hover:animate-bounce">⚔️</div>
            <h3 className="font-black text-xl text-blue-700 uppercase mb-3">Dịch Vụ Cày Thuê</h3>
            <p className="text-xs font-bold text-gray-600 mb-6 px-4">Nhận cày thuê rank Liên Quân, Free Fire lên Thách Đấu siêu tốc.</p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-black text-[11px] uppercase shadow-md hover:bg-blue-700">Liên Hệ Zalo</button>
         </div>
         <div className="bg-red-50 border-2 border-red-500 rounded-3xl p-8 text-center hover:scale-105 transition-all cursor-pointer shadow-lg group">
            <div className="text-6xl mb-4 group-hover:animate-pulse">💎</div>
            <h3 className="font-black text-xl text-red-700 uppercase mb-3">Nạp Kim Cương / Robux</h3>
            <p className="text-xs font-bold text-gray-600 mb-6 px-4">Nạp KC FF, Quân Huy, Robux tỷ lệ cực cao.</p>
            <button className="bg-red-600 text-white px-8 py-3 rounded-xl font-black text-[11px] uppercase shadow-md hover:bg-red-700">Liên Hệ Zalo</button>
         </div>
      </div>
    </div>
  );
};

// --- TRANG QUẢN TRỊ THÊM ACC ---
const AdminPanel = () => {
  const [form, setForm] = useState({ category: 'FREE FIRE', name: '', ms: '', price: '', image: '', username_acc: '', password_acc: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadId = toast.loading("Đang đẩy hàng vào kho...");
    try {
      const res = await fetch('http://localhost:5000/api/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        toast.success("Thêm thành công! Acc đã lên kệ.", { id: loadId });
        setForm({ ...form, name: '', ms: '', price: '', username_acc: '', password_acc: '' });
      } else { toast.error("Lỗi thêm acc!", { id: loadId }); }
    } catch (e) { toast.error("Lỗi kết nối Backend!", { id: loadId }); }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-2xl border-2 border-black italic">
      <h2 className="text-2xl font-black text-red-600 mb-6 uppercase">📦 THÊM ACC VÀO KHO HÀNG</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-bold">
        <div className="md:col-span-2">
          <label>Danh mục game:</label>
          <select className="w-full border-2 border-gray-200 p-2 rounded" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
            <option>FREE FIRE</option><option>LIÊN QUÂN</option><option>ROBLOX</option><option>TÚI MÙ</option>
          </select>
        </div>
        <div><label>Tên hiển thị:</label><input className="w-full border-2 p-2 rounded" placeholder="Acc sub vip..." value={form.name} onChange={e => setForm({...form, name: e.target.value})} required /></div>
        <div><label>Mã số (MS):</label><input className="w-full border-2 p-2 rounded" placeholder="VIP01..." value={form.ms} onChange={e => setForm({...form, ms: e.target.value})} required /></div>
        <div><label>Giá bán:</label><input type="number" className="w-full border-2 p-2 rounded" placeholder="100000" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required /></div>
        <div><label>Link ảnh:</label><input className="w-full border-2 p-2 rounded" placeholder="http://..." value={form.image} onChange={e => setForm({...form, image: e.target.value})} /></div>
        <div className="md:col-span-2 bg-red-50 p-4 rounded-lg border-2 border-red-200">
           <p className="text-red-600 mb-2">Thông tin đăng nhập (Khách mua mới thấy):</p>
           <div className="grid grid-cols-2 gap-4">
              <input className="w-full border p-2 rounded" placeholder="Tài khoản game" value={form.username_acc} onChange={e => setForm({...form, username_acc: e.target.value})} required />
              <input className="w-full border p-2 rounded" placeholder="Mật khẩu game" value={form.password_acc} onChange={e => setForm({...form, password_acc: e.target.value})} required />
           </div>
        </div>
        <button type="submit" className="md:col-span-2 bg-red-600 text-white py-3 rounded-xl font-black hover:bg-red-700 transition-all uppercase">Xác nhận thêm vào kho</button>
      </form>
    </div>
  );
};

// --- 6. COMPONENT TỔNG (App) ---
function App() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [regForm, setRegForm] = useState({ username: '', password: '', email: '' });
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  
  const [activeTab, setActiveTab] = useState('napThe');

  const generateCaptcha = () => Math.random().toString(36).substring(2, 8).toUpperCase();
  const [captchaCode, setCaptchaCode] = useState(generateCaptcha());
  const [inputCaptcha, setInputCaptcha] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/products').then(res => res.json()).then(data => setProducts(data)).catch(() => {});
  }, []);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (inputCaptcha.toUpperCase() !== captchaCode) {
      toast.error("Mã Captcha không chính xác!");
      setCaptchaCode(generateCaptcha()); 
      setInputCaptcha('');
      return;
    }

    const loadId = toast.loading("Đang xử lý đăng ký...");
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(regForm)
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Đăng ký thành công! Mời đăng nhập.", { id: loadId });
        setIsRegisterOpen(false); 
        setIsLoginOpen(true);     
        setInputCaptcha('');
        setCaptchaCode(generateCaptcha());
      } else {
        toast.error(data.message || "Đăng ký thất bại!", { id: loadId });
      }
    } catch (error) {
      toast.error("Lỗi kết nối máy chủ!", { id: loadId });
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const loadId = toast.loading("Đang kiểm tra thông tin...");
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });
      const data = await res.json();

      if (res.ok) {
        setUser(data); 
        setIsLoginOpen(false);
        toast.success(`Chào mừng ${data.username} trở lại!`, { id: loadId });
      } else {
        toast.error(data.message || "Sai tài khoản hoặc mật khẩu!", { id: loadId });
      }
    } catch (error) {
      toast.error("Lỗi kết nối máy chủ!", { id: loadId });
    }
  };

  const handleBuy = async (item) => {
    if (!item || !item.id) {
      toast.error("Sản phẩm này đang được cập nhật, vui lòng chọn Acc khác!");
      return;
    }

    if (!user) {
      toast.error("Vui lòng đăng nhập để mua Acc!");
      setIsLoginOpen(true);
      return;
    }

    const finalPrice = item.category === "TÚI MÙ" ? 10000 : item.price;
    const loadId = toast.loading("Đang xử lý giao dịch...");

    try {
      const res = await fetch('http://localhost:5000/api/buy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          product_id: item.id,
          price: finalPrice
        })
      });
      const data = await res.json();

      if (res.ok) {
        setUser({ ...user, balance: data.newBalance });
        toast.success("Mua Acc thành công! Hãy kiểm tra Lịch Sử Mua Hàng.", { id: loadId });
        
        fetch('http://localhost:5000/api/products')
          .then(res => res.json())
          .then(data => setProducts(data));
      } else {
        toast.error(data.message || "Giao dịch thất bại!", { id: loadId });
      }
    } catch (error) {
      toast.error("Lỗi kết nối máy chủ!", { id: loadId });
    }
  };

  const handleLogout = () => {
    setUser(null);
    toast.success("Đã thoát tài khoản!");
  }

  useEffect(() => {
    if (isRegisterOpen) {
      setCaptchaCode(generateCaptcha());
      setInputCaptcha('');
    }
  }, [isRegisterOpen]);

  return (
    <Router>
      <div 
        className="min-h-screen pb-20 font-sans bg-fixed bg-cover bg-center" 
        style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2016/01/27/15/25/space-1164579_1280.png')" }}
      >
        <Toaster position="top-center" />
        
        {/* HEADER */}
        <header className="bg-red-600 sticky top-0 z-50 shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center text-white">
            
<Link to="/" className="flex items-center gap-3">
  {/* Thay src thành /logo.png (hoặc tên file thật của bạn trong thư mục public) */}
  <img 
    src="/stic.webp" 
    alt="CHIN SHOP" 
    className="h-20 object-contain hover:scale-105 transition-transform"
  />
</Link>

            <nav className="hidden md:flex gap-6 text-[11px] font-bold uppercase">
                <Link to="/" className="hover:text-yellow-300 transition-all">Trang chủ</Link>
                <Link to="/nap-tien" className="hover:text-yellow-300 transition-all">Nạp Tiền</Link>
                <Link to="/tui-mu" className="hover:text-yellow-300 transition-all">Túi Mù</Link>
                <Link to="/dich-vu" className="hover:text-yellow-300 transition-all">Dịch vụ Khác</Link>
            </nav>

            {!user ? (
              <div className="flex gap-2">
                 <button onClick={() => setIsRegisterOpen(true)} className="bg-black/20 text-white px-4 py-2 rounded font-black text-[10px] uppercase border border-white/20 hover:bg-black/40 transition-all">Đăng ký</button>
                 <button onClick={() => setIsLoginOpen(true)} className="bg-white text-red-600 px-5 py-2 rounded font-black text-[10px] uppercase shadow-sm hover:scale-105 transition-all">Đăng nhập</button>
              </div>
            ) : (
              <div className="relative group">
                 <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded cursor-pointer border border-white/20 hover:bg-black/50 transition-all">
                    <img src="https://via.placeholder.com/30x30/ffffff/ff0000?text=A" className="w-6 h-6 rounded-full border border-white" alt="avatar" />
                    <div className="flex flex-col items-end">
                       <span className="text-[9px] font-bold opacity-80 leading-none">{user.username}</span>
                       <span className="text-[11px] font-black text-yellow-400">SD: {user.balance?.toLocaleString()}đ</span>
                    </div>
                 </div>
                 
                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden">
                    <ul className="text-gray-800 text-[11px] font-bold">
                       <li className="hover:bg-gray-100 transition-all">
                          <Link to="/history" className="px-4 py-3 flex items-center gap-2">📜 Lịch sử mua Acc</Link>
                       </li>
                       <li className="hover:bg-gray-100 transition-all cursor-pointer">
                          <div onClick={() => setIsProfileOpen(true)} className="px-4 py-3 flex items-center gap-2">👤 Thông tin tài khoản</div>
                       </li>
                       <li className="border-t hover:bg-red-50 transition-all cursor-pointer">
                          <div onClick={handleLogout} className="w-full text-left px-4 py-3 text-red-600 flex items-center gap-2">🚪 Thoát tài khoản</div>
                       </li>
                    </ul>
                 </div>
              </div>
            )}
          </div>
        </header>

        {/* THÔNG TIN TÀI KHOẢN POPUP */}
        {isProfileOpen && user && (
          <div className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
             <div className="bg-white rounded-xl w-full max-w-sm p-6 shadow-2xl relative border-t-4 border-red-600 animate-in zoom-in duration-200">
                <button onClick={() => setIsProfileOpen(false)} className="absolute top-4 right-4 font-black text-gray-500 hover:text-black">✕</button>
                <div className="text-center mb-6">
                   <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2 border-2 border-red-600">
                      <span className="text-2xl font-black text-red-600 uppercase">{user.username.charAt(0)}</span>
                   </div>
                   <h2 className="text-lg font-black text-gray-800 uppercase">{user.username}</h2>
                   <p className="text-xs font-bold text-gray-500">ID Thành viên: #{user.id || Math.floor(Math.random() * 90000) + 10000}</p>
                </div>
                <div className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm font-bold">
                   <div className="flex justify-between border-b pb-2"><span className="text-gray-500">Số dư khả dụng:</span><span className="text-red-600 font-black">{user.balance?.toLocaleString()}đ</span></div>
                   <div className="flex justify-between border-b pb-2"><span className="text-gray-500">Email:</span><span>{user.email || 'Đã liên kết'}</span></div>
                   <div className="flex justify-between"><span className="text-gray-500">Ngày tham gia:</span><span>Hôm nay</span></div>
                </div>
                <button onClick={() => setIsProfileOpen(false)} className="w-full bg-black text-white mt-4 py-2 rounded-lg font-bold text-xs uppercase hover:bg-gray-800">Đóng lại</button>
             </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 mt-6">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* CỘT TRÁI: TABS NẠP THẺ */}
              <div className="lg:col-span-4 bg-white rounded-lg shadow-xl overflow-hidden flex flex-col border border-gray-200 h-[380px]">
                 <div className="flex bg-gray-200">
                   <button onClick={() => setActiveTab('napThe')} className={`flex-1 py-3 text-[11px] font-bold uppercase transition-all ${activeTab === 'napThe' ? 'bg-red-600 text-black' : 'text-gray-700 hover:bg-gray-300'}`}>Nạp thẻ</button>
                   <button onClick={() => setActiveTab('chuyenKhoan')} className={`flex-1 py-3 text-[11px] font-bold uppercase transition-all ${activeTab === 'chuyenKhoan' ? 'bg-red-600 text-black' : 'text-gray-700 hover:bg-gray-300'}`}>Chuyển khoản</button>
                   <button onClick={() => setActiveTab('topNap')} className={`flex-1 py-3 text-[11px] font-bold uppercase transition-all ${activeTab === 'topNap' ? 'bg-red-600 text-black' : 'text-gray-700 hover:bg-gray-300'}`}>Top nạp</button>
                 </div>
                 
                 <div className="p-5 flex-1 bg-white overflow-y-auto">
                   
                   {activeTab === 'napThe' && (
                     <div className="space-y-4 animate-in fade-in">
                       <select className="w-full bg-white border border-gray-300 p-2.5 rounded text-xs text-gray-700 outline-none focus:border-red-500">
                         <option>Viettel</option><option>Mobifone</option><option>Vinaphone</option><option>Zing</option><option>Garena</option>
                       </select>
                       <select className="w-full bg-white border border-gray-300 p-2.5 rounded text-xs text-gray-700 outline-none focus:border-red-500">
                         <option>- Mệnh giá -</option><option>10,000đ</option><option>20,000đ</option><option>50,000đ</option><option>100,000đ</option><option>200,000đ</option><option>500,000đ</option>
                       </select>
                       <input type="text" placeholder="Mã thẻ..." className="w-full bg-white border border-gray-300 p-2.5 rounded text-xs outline-none focus:border-red-500" />
                       <input type="text" placeholder="Seri..." className="w-full bg-white border border-gray-300 p-2.5 rounded text-xs outline-none focus:border-red-500" />
                       <button className="w-full bg-red-600 text-white font-bold py-2.5 rounded text-xs uppercase hover:bg-red-700 active:scale-95 transition-all shadow-md">
                         Nạp Thẻ Ngay
                       </button>
                     </div>
                   )}

                   {activeTab === 'chuyenKhoan' && (
                     <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 space-y-3 text-xs font-bold text-gray-700 animate-in fade-in">
                       <div className="flex justify-between"><span>Ngân hàng:</span><span className="text-red-600">MB Bank</span></div>
                       <div className="flex justify-between"><span>Số TK:</span><span className="text-blue-700">0798216387</span></div>
                       <div className="flex justify-between border-b pb-2 border-blue-100"><span>Chủ TK:</span><span>Võ Nguyễn Duy Hoàng</span></div>
                       <div className="pt-1">Nội dung: <span className="bg-yellow-200 text-red-600 px-2 py-1 rounded">NAP {user ? user.username : 'TEN_CUA_BAN'}</span></div>
                       <p className="text-[9px] text-gray-500 mt-2 font-normal italic">* Hệ thống cộng tiền sau 1-3 phút.</p>
                     </div>
                   )}

                   {activeTab === 'topNap' && (
                     <div className="space-y-3 animate-in fade-in">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className="flex justify-between items-center text-[11px] font-bold border-b border-gray-100 pb-2">
                             <div className="flex items-center gap-2">
                                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] shadow-sm ${i===0?'bg-yellow-500':i===1?'bg-gray-400':i===2?'bg-orange-500':'bg-cyan-500'}`}>{i+1}</span>
                                <span className="text-gray-700">user***{i}</span>
                             </div>
                             <span className="text-red-600 font-black">{(8000000 - i*1200000).toLocaleString()}đ</span>
                          </div>
                        ))}
                     </div>
                   )}
                 </div>
              </div>

              {/* CỘT PHẢI: BANNER TO */}
              <div className="lg:col-span-8 rounded-lg overflow-hidden shadow-xl border border-gray-700 relative h-[380px] bg-red-600">
                <img 
                  src="/banner.png" 
                  className="w-full h-full object-cover absolute inset-0 opacity-90" 
                  alt="banner" 
                />
                {/* CHỮ CHIN SHOP NẰM CHÍNH GIỮA BANNER */}
  <div className="absolute inset-0 flex items-center justify-center z-10 select-none">
    <h1 className="text-6xl md:text-8xl font-black italic uppercase text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.9)] tracking-tighter animate-in zoom-in duration-700">
      CHIN <span className="text-yellow-400">SHOP</span>
    </h1>
  </div>
                <div className="absolute bottom-6 inset-x-0 flex flex-col items-center gap-2 px-10 z-10">
                   <div className="bg-gradient-to-r from-red-800 to-red-600 border border-yellow-400 text-yellow-300 font-black uppercase text-[10px] md:text-xs py-2 w-full max-w-sm text-center rounded-sm shadow-lg cursor-pointer hover:scale-105 transition-transform">
                     Tạp hóa acc game uy tín
                   </div>
                   <div className="bg-gradient-to-r from-red-800 to-red-600 border border-yellow-400 text-yellow-300 font-black uppercase text-[10px] md:text-xs py-2 w-full max-w-sm text-center rounded-sm shadow-lg cursor-pointer hover:scale-105 transition-transform">
                     Liên quân, Freefire, Roblox
                   </div>
                </div>
              </div>

           </div>
        </div>

        <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-2 mt-8 border-y border-white/10 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap text-[11px] font-bold">
            {/* Nội dung chạy mỏi mắt luôn */}
    Duy*** vừa quay túi mù <span className="text-pink-400">40.000đ</span> • 1 phút trước | 
    Cmt2**** vừa mua acc FF <span className="text-pink-400">100.000đ</span> • 2 phút trước | 
    Hoàng*** vừa nạp <span className="text-green-400">500.000đ</span> qua ATM • 3 phút trước | 
    Võ Nguyễn Duy Hoàng vừa cập nhật kho hàng VIP • CHIN SHOP UY TÍN SỐ 1 | 
    Linh2k*** vừa trúng Acc VIP Liên Quân từ Túi Mù • 5 phút trước | 
    Khách_ẩn_danh vừa mua Nick Roblox <span className="text-pink-400">200.000đ</span> • 7 phút trước | 
    Admin vừa thêm 50 Acc Free Fire mới vào kho hàng | 
    Tuấn_Pro vừa mở túi mù trúng ngay Skin SSS • 10 phút trước | 
    Hệ thống vừa tự động cộng tiền cho user: NhatAnh*** | 
    CHIN SHOP - Tạp hóa acc game giá rẻ, uy tín, giao dịch tự động 24/7 | 
    Bảo*** vừa mua Acc Liên Quân trắng thông tin <span className="text-pink-400">150.000đ</span> • 12 phút trước | 
    Duy*** vừa quay túi mù <span className="text-pink-400">40.000đ</span> • 15 phút trước | 
    Minh_Ga*** vừa mua Acc Roblox Blox Fruit <span className="text-pink-400">50.000đ</span> • 18 phút trước
          </div>
        </div>

        <main className="max-w-7xl mx-auto p-4 mt-4">
             <Routes>
                <Route path="/" element={<ShopContent products={products} handleBuy={handleBuy} />} />
                <Route path="/category/:categoryName" element={<CategoryPage products={products} handleBuy={handleBuy} />} />
                <Route path="/tui-mu" element={<BlindBoxPage user={user} setUser={setUser} products={products} setProducts={setProducts} />} />
                <Route path="/product/:id" element={<ProductDetail products={products} handleBuy={handleBuy} />} />
                <Route path="/dich-vu" element={<ServicesPage />} />
                <Route path="/history" element={<HistoryPage user={user} />} />
                <Route path="/quan-tri-vien-vip" element={<AdminPanel />} />
             </Routes>
        </main>

        <footer className="bg-[#1e293b] text-white py-12 mt-20 border-t-4 border-red-600">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
<div>
  {/* Lấy ảnh logo.png từ thư mục public và thêm hiệu ứng nhấp nháy */}
  <img 
    src="/logo.jpg" 
    className="mb-3 rounded h-12 object-contain animate-pulse" 
    alt="CHIN SHOP" 
    onError={(e) => { e.target.src = "https://via.placeholder.com/200x60?text=CHIN+SHOP"; }}
  />
                <p className="font-bold italic text-[11px] mb-2">Tiktoker/Streamer/Gamer/Youtuber</p>
                <ul className="space-y-1 text-[11px] font-bold text-gray-300">
                  <li>• Shop acc Liên Quân - FreeFire - FC</li>
                  <li>• Sẵn sàng hỗ trợ khách hàng 24/24.</li>
                  <li>• UY TÍN - GIÁ RẺ - CHẤT LƯỢNG</li>
                </ul>
             </div>
             <div>
                <h4 className="font-black uppercase mb-4 text-white">Lưu ý cần biết</h4>
                <ul className="space-y-3 text-[11px] font-bold text-gray-300">
                  <li>Zalo shop: 079 821 6387</li>
                  <li>Thời gian hỗ trợ thông tin</li>
                  <li>7H - 0H mỗi ngày</li>
                </ul>
             </div>
             <div>
                <h4 className="font-black uppercase mb-4 text-white">Hướng dẫn</h4>
                <ul className="space-y-3 text-[11px] font-bold text-gray-300 cursor-pointer">
                  <li className="hover:text-red-500 transition-all">Hướng dẫn bảo mật</li>
                  <li className="hover:text-red-500 transition-all">Hướng dẫn trả góp</li>
                  <li className="hover:text-red-500 transition-all">Chính sách đổi trả</li>
                </ul>
             </div>
             <div>
                <h4 className="font-black uppercase mb-4 text-white">Kết nối với chúng tôi</h4>
                <a href="https://zalo.me/0798216387" target="_blank" rel="noreferrer" className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-black px-6 py-2 rounded-full text-xs transition-all shadow-md">
                   Nhắn tin Zalo
                </a>
             </div>
          </div>
          <div className="text-center mt-12 pt-6 border-t border-gray-700 opacity-50 text-[9px] font-black uppercase">
             Designed by Vo Nguyen Duy Hoang
          </div>
        </footer>

        {/* NÚT ZALO FLOAT */}
        <a 
          href="https://zalo.me/0798216387" 
          target="_blank" 
          rel="noreferrer"
          className="fixed bottom-6 right-6 z-[999] group"
        >
          <div className="bg-red-600 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl animate-pulse border-2 border-white group-hover:scale-110 transition-all">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="https://zalo.me/0798216387M12 2C6.48 2 2 6.48 2 12c0 1.54.36 2.98 1 4.28L2 22l5.72-1c1.3.64 2.74 1 4.28 1 5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.44 0-2.79-.38-3.95-1.05l-3.23.57.57-3.23C4.38 14.79 4 13.44 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z" /></svg>
          </div>
          <span className="absolute right-16 top-3 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap">CHAT ZALO NGAY!</span>
        </a>

        {/* MODAL ĐĂNG KÝ */}
        {isRegisterOpen && (
          <div className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm">
             <div className="bg-[#0b101e] rounded-xl w-full max-w-md p-8 shadow-[0_0_50px_rgba(220,38,38,0.2)] border border-gray-800 relative animate-in zoom-in duration-200">
                <button onClick={() => setIsRegisterOpen(false)} className="absolute top-4 right-4 font-black text-gray-500 hover:text-white">✕</button>
                <h2 className="text-2xl font-black text-red-600 mb-2">Đăng ký tài khoản mới</h2>
                <p className="text-[10px] text-gray-400 mb-6">
                  Điền tên tài khoản và mật khẩu bên dưới để đăng ký. Nếu đã có tài khoản?{' '}
                  <span className="text-yellow-500 font-bold cursor-pointer hover:underline" onClick={() => { setIsRegisterOpen(false); setIsLoginOpen(true); }}>
                    Đăng nhập ngay
                  </span>
                </p>

                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                   <div>
                     <label className="text-white text-xs mb-1 block">Tên đăng nhập:</label>
                     <input type="text" required className="w-full bg-white p-2.5 rounded outline-none text-black" onChange={(e) => setRegForm({...regForm, username: e.target.value})} />
                   </div>
                   <div>
                     <label className="text-white text-xs mb-1 block">Mật khẩu: <span className="text-[9px] text-gray-400 font-normal">(Mật khẩu phải có ít nhất 8 ký tự, 1 chữ in hoa, 1 ký tự đặc biệt)</span></label>
                     <input type="password" required className="w-full bg-white p-2.5 rounded outline-none text-black" onChange={(e) => setRegForm({...regForm, password: e.target.value})} />
                   </div>
                   <div>
                     <label className="text-white text-xs mb-1 block">Email:</label>
                     <input type="email" required className="w-full bg-white p-2.5 rounded outline-none text-black" onChange={(e) => setRegForm({...regForm, email: e.target.value})} />
                   </div>

                   <div className="pt-2">
                     <div className="flex items-center gap-3 mb-2">
                        <div className="bg-black border border-gray-700 px-6 py-2 font-mono text-xl text-cyan-400 tracking-[10px] line-through decoration-red-500 italic select-none">
                          {captchaCode}
                        </div>
                        <button type="button" onClick={() => setCaptchaCode(generateCaptcha())} className="bg-gray-800 text-white p-2 rounded hover:bg-gray-700 transition-all text-sm shadow-md" title="Đổi mã khác">🔄</button>
                     </div>
                     <input type="text" placeholder="Nhập captcha bên trên..." required value={inputCaptcha} onChange={(e) => setInputCaptcha(e.target.value)} className="w-full bg-white p-2.5 rounded outline-none text-black uppercase" />
                   </div>

                   <button type="submit" className="bg-red-600 text-white w-full py-3 rounded mt-4 font-bold text-xs hover:bg-red-700 transition-all shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                     ĐĂNG KÝ NGAY
                   </button>
                </form>
             </div>
          </div>
        )}

        {/* MODAL ĐĂNG NHẬP */}
        {isLoginOpen && (
          <div className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm">
             <div className="bg-[#0b101e] rounded-xl w-full max-w-md p-8 shadow-[0_0_50px_rgba(220,38,38,0.2)] border border-gray-800 relative animate-in zoom-in duration-200">
                <button onClick={() => setIsLoginOpen(false)} className="absolute top-4 right-4 font-black text-gray-500 hover:text-white">✕</button>
                <h2 className="text-2xl font-black uppercase text-red-600 mb-2">Đăng Nhập</h2>
                
                <p className="text-[10px] text-gray-400 mb-6">
                  Nếu chưa có tài khoản?{' '}
                  <span className="text-yellow-500 font-bold cursor-pointer hover:underline" onClick={() => { setIsLoginOpen(false); setIsRegisterOpen(true); }}>
                    Đăng ký ngay
                  </span>
                </p>

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                   <div>
                     <label className="text-white text-xs mb-1 block">Tên đăng nhập:</label>
                     <input 
                       type="text" 
                       required 
                       className="w-full bg-white p-2.5 rounded outline-none text-black" 
                       onChange={(e) => setLoginForm({...loginForm, username: e.target.value})} 
                     />
                   </div>
                   <div>
                     <label className="text-white text-xs mb-1 block">Mật khẩu:</label>
                     <input 
                       type="password" 
                       required 
                       className="w-full bg-white p-2.5 rounded outline-none text-black" 
                       onChange={(e) => setLoginForm({...loginForm, password: e.target.value})} 
                     />
                   </div>
                   <button type="submit" className="w-full bg-red-600 text-white py-3 rounded mt-4 font-bold text-xs hover:bg-red-700 transition-all shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                     VÀO SHOP
                   </button>
                </form>
             </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;