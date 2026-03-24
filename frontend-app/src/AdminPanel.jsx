import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import HistoryPage from "./HistoryPage.jsx";
import ProductDetail from "./ProductDetail.jsx";
import CategoryPage from "./CategoryPage.jsx";
import BlindBoxPage from "./BlindBoxPage.jsx";
import ShopContent from "./ShopContent.jsx";
import ServicesPage from "./ServicesPage.jsx";
import AdminPanel from "./AdminPanel.jsx";

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
        setIsRegisterOpen(false); setIsLoginOpen(true); setInputCaptcha(''); setCaptchaCode(generateCaptcha());
      } else { toast.error(data.message || "Đăng ký thất bại!", { id: loadId }); }
    } catch (error) { toast.error("Lỗi kết nối máy chủ!", { id: loadId }); }
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
        setUser(data); setIsLoginOpen(false);
        toast.success(`Chào mừng ${data.username} trở lại!`, { id: loadId });
      } else { toast.error(data.message || "Sai tài khoản hoặc mật khẩu!", { id: loadId }); }
    } catch (error) { toast.error("Lỗi kết nối máy chủ!", { id: loadId }); }
  };

  const handleBuy = async (item) => {
    if (!item || !item.id) { toast.error("Sản phẩm lỗi!"); return; }
    if (!user) { toast.error("Vui lòng đăng nhập!"); setIsLoginOpen(true); return; }
    const finalPrice = item.category === "TÚI MÙ" ? 10000 : item.price;
    const loadId = toast.loading("Đang xử lý...");
    try {
      const res = await fetch('http://localhost:5000/api/buy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id, product_id: item.id, price: finalPrice })
      });
      const data = await res.json();
      if (res.ok) {
        setUser({ ...user, balance: data.newBalance });
        toast.success("Mua Acc thành công!", { id: loadId });
        fetch('http://localhost:5000/api/products').then(res => res.json()).then(data => setProducts(data));
      } else { toast.error(data.message, { id: loadId }); }
    } catch (error) { toast.error("Lỗi kết nối!", { id: loadId }); }
  };

  const handleLogout = () => { setUser(null); toast.success("Đã thoát!"); }

  return (
    <Router>
      <div className="min-h-screen pb-20 font-sans bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2016/01/27/15/25/space-1164579_1280.png')" }}>
        <Toaster position="top-center" />
        
        {/* HEADER */}
        <header className="bg-red-600 sticky top-0 z-50 shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center text-white">
            <Link to="/" className="flex items-center gap-3">
              <img src="/stic.webp" alt="CHIN SHOP" className="h-20 object-contain hover:scale-105 transition-transform" />
            </Link>
            <nav className="hidden md:flex gap-6 text-[11px] font-bold uppercase">
                <Link to="/" className="hover:text-yellow-300">Trang chủ</Link>
                <Link to="/nap-tien" className="hover:text-yellow-300">Nạp Tiền</Link>
                <Link to="/tui-mu" className="hover:text-yellow-300">Túi Mù</Link>
                <Link to="/dich-vu" className="hover:text-yellow-300">Dịch vụ Khác</Link>
            </nav>
            {!user ? (
              <div className="flex gap-2">
                 <button onClick={() => setIsRegisterOpen(true)} className="bg-black/20 text-white px-4 py-2 rounded font-black text-[10px] uppercase">Đăng ký</button>
                 <button onClick={() => setIsLoginOpen(true)} className="bg-white text-red-600 px-5 py-2 rounded font-black text-[10px] uppercase">Đăng nhập</button>
              </div>
            ) : (
              <div className="relative group">
                 <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded cursor-pointer">
                    <img src="https://via.placeholder.com/30x30?text=A" className="w-6 h-6 rounded-full" alt="avatar" />
                    <div className="flex flex-col items-end">
                       <span className="text-[9px] font-bold">{user.username}</span>
                       <span className="text-[11px] font-black text-yellow-400">{user.balance?.toLocaleString()}đ</span>
                    </div>
                 </div>
                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden">
                    <ul className="text-gray-800 text-[11px] font-bold">
                       <li className="hover:bg-gray-100"><Link to="/history" className="px-4 py-3 block">📜 Lịch sử mua Acc</Link></li>
                       <li className="hover:bg-gray-100 cursor-pointer"><div onClick={() => setIsProfileOpen(true)} className="px-4 py-3">👤 Thông tin tài khoản</div></li>
                       <li className="border-t hover:bg-red-50 cursor-pointer"><div onClick={handleLogout} className="px-4 py-3 text-red-600">🚪 Thoát tài khoản</div></li>
                    </ul>
                 </div>
              </div>
            )}
          </div>
        </header>

        {/* PROFILE MODAL */}
        {isProfileOpen && user && (
          <div className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
             <div className="bg-white rounded-xl w-full max-w-sm p-6 shadow-2xl relative border-t-4 border-red-600">
                <button onClick={() => setIsProfileOpen(false)} className="absolute top-4 right-4 font-black text-gray-500">✕</button>
                <div className="text-center mb-6">
                   <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2"><span className="text-2xl font-black text-red-600 uppercase">{user.username.charAt(0)}</span></div>
                   <h2 className="text-lg font-black uppercase">{user.username}</h2>
                </div>
                <div className="space-y-3 bg-gray-50 p-4 rounded-lg text-sm font-bold">
                   <div className="flex justify-between border-b pb-2"><span>Số dư:</span><span className="text-red-600">{user.balance?.toLocaleString()}đ</span></div>
                   <div className="flex justify-between"><span>Email:</span><span>{user.email || 'Đã liên kết'}</span></div>
                </div>
                <button onClick={() => setIsProfileOpen(false)} className="w-full bg-black text-white mt-4 py-2 rounded-lg font-bold text-xs uppercase">Đóng</button>
             </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 mt-6">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-4 bg-white rounded-lg shadow-xl overflow-hidden flex flex-col h-[380px]">
                 <div className="flex bg-gray-200">
                   <button onClick={() => setActiveTab('napThe')} className={`flex-1 py-3 text-[11px] font-bold uppercase ${activeTab === 'napThe' ? 'bg-red-600' : ''}`}>Nạp thẻ</button>
                   <button onClick={() => setActiveTab('chuyenKhoan')} className={`flex-1 py-3 text-[11px] font-bold uppercase ${activeTab === 'chuyenKhoan' ? 'bg-red-600' : ''}`}>ATM</button>
                 </div>
                 <div className="p-5 flex-1 overflow-y-auto">
                   {activeTab === 'napThe' && (
                     <div className="space-y-4">
                       <select className="w-full border p-2.5 rounded text-xs"><option>Viettel</option><option>Mobifone</option></select>
                       <input type="text" placeholder="Mã thẻ..." className="w-full border p-2.5 rounded text-xs" />
                       <button className="w-full bg-red-600 text-white font-bold py-2.5 rounded text-xs uppercase">Nạp Thẻ Ngay</button>
                     </div>
                   )}
                   {activeTab === 'chuyenKhoan' && <div className="text-xs font-bold">MB Bank: 0798216387</div>}
                 </div>
              </div>
              <div className="lg:col-span-8 rounded-lg overflow-hidden relative h-[380px] bg-red-600">
                <img src="/banner.png" className="w-full h-full object-cover absolute inset-0 opacity-90" alt="banner" />
                <div className="absolute inset-0 flex items-center justify-center z-10"><h1 className="text-6xl md:text-8xl font-black italic text-white">CHIN SHOP</h1></div>
              </div>
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

        <footer className="bg-[#1e293b] text-white py-12 mt-20 border-t-4 border-red-600 text-center">
            <img src="/logo.jpg" className="mx-auto h-12 mb-4" alt="logo" />
            <p className="text-[9px] font-black uppercase">Designed by Vo Nguyen Duy Hoang</p>
        </footer>

        {/* MODALS LOGIN/REGISTER (GIỮ NGUYÊN CODE CŨ CỦA HOÀNG) */}
        {isRegisterOpen && (
           <div className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4">
              <div className="bg-[#0b101e] rounded-xl w-full max-w-md p-8 border border-gray-800 relative">
                 <button onClick={() => setIsRegisterOpen(false)} className="absolute top-4 right-4 text-white">✕</button>
                 <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    <input type="text" placeholder="User" required className="w-full p-2.5 rounded text-black" onChange={(e) => setRegForm({...regForm, username: e.target.value})} />
                    <input type="password" placeholder="Pass" required className="w-full p-2.5 rounded text-black" onChange={(e) => setRegForm({...regForm, password: e.target.value})} />
                    <input type="email" placeholder="Email" required className="w-full p-2.5 rounded text-black" onChange={(e) => setRegForm({...regForm, email: e.target.value})} />
                    <div className="flex items-center gap-3">
                       <div className="bg-black text-cyan-400 p-2 font-mono">{captchaCode}</div>
                       <input type="text" placeholder="Captcha" className="flex-1 p-2 rounded text-black" value={inputCaptcha} onChange={(e) => setInputCaptcha(e.target.value)} />
                    </div>
                    <button type="submit" className="bg-red-600 text-white w-full py-3 rounded">ĐĂNG KÝ</button>
                 </form>
              </div>
           </div>
        )}

        {isLoginOpen && (
           <div className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4">
              <div className="bg-[#0b101e] rounded-xl w-full max-w-md p-8 border border-gray-800 relative">
                 <button onClick={() => setIsLoginOpen(false)} className="absolute top-4 right-4 text-white">✕</button>
                 <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <input type="text" placeholder="Username" required className="w-full p-2.5 rounded text-black" onChange={(e) => setLoginForm({...loginForm, username: e.target.value})} />
                    <input type="password" placeholder="Password" required className="w-full p-2.5 rounded text-black" onChange={(e) => setLoginForm({...loginForm, password: e.target.value})} />
                    <button type="submit" className="w-full bg-red-600 text-white py-3 rounded">ĐĂNG NHẬP</button>
                 </form>
              </div>
           </div>
        )}

      </div>
    </Router>
  );
}

export default App;