import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

// IMPORT CÁC TRANG
import HistoryPage from "./HistoryPage.jsx";
import ProductDetail from "./ProductDetail.jsx";
import CategoryPage from "./CategoryPage.jsx";
import BlindBoxPage from "./BlindBoxPage.jsx";
import ShopContent from "./ShopContent.jsx";
import ServicesPage from "./ServicesPage.jsx";
import AdminPanel from "./AdminPanel.jsx";

// IMPORT CÁC COMPONENT
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { RegisterModal, LoginModal, ProfileModal } from "./AuthModals.jsx";

function App() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('napThe');
  const [topDepositors, setTopDepositors] = useState([]); 
  
  const [regForm, setRegForm] = useState({ username: '', password: '', email: '' });
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [captchaCode, setCaptchaCode] = useState(Math.random().toString(36).substring(2, 8).toUpperCase());
  const [inputCaptcha, setInputCaptcha] = useState('');

  // State dành riêng cho nạp thẻ
  const [cardData, setCardData] = useState({ type: 'VIETTEL', amount: '10000', pin: '', serial: '' });

  useEffect(() => {
    fetch('http://localhost:5000/api/products').then(res => res.json()).then(data => setProducts(data)).catch(() => {});
    fetch('http://localhost:5000/api/auth/top-depositors').then(res => res.json()).then(data => setTopDepositors(data)).catch(() => {});
  }, []);

  // --- LOGIC XỬ LÝ NẠP THẺ ---
  const handleCardSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Vui lòng đăng nhập để nạp thẻ!");
    if (!cardData.pin || !cardData.serial) return toast.error("Vui lòng nhập đầy đủ mã thẻ và seri!");
    if (cardData.pin.length < 10) return toast.error("Mã thẻ không hợp lệ!");

    const loadId = toast.loading("Đang gửi thẻ lên hệ thống...");
    // Ở đây sau này Hoàng gọi API nạp thẻ bên gạch thẻ nhé
    setTimeout(() => {
      toast.success("Gửi thẻ thành công! Vui lòng chờ 1-5 phút để duyệt.", { id: loadId });
      setCardData({ ...cardData, pin: '', serial: '' }); // Xóa trắng ô nhập sau khi xong
    }, 2000);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (inputCaptcha.toUpperCase() !== captchaCode) {
      toast.error("Sai mã Captcha!"); return;
    }
    const loadId = toast.loading("Đang đăng ký...");
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(regForm)
      });
      if (res.ok) {
        toast.success("Đăng ký thành công!", { id: loadId });
        setIsRegisterOpen(false); setIsLoginOpen(true);
      } else { toast.error("Đăng ký thất bại!", { id: loadId }); }
    } catch (error) { toast.error("Lỗi kết nối!", { id: loadId }); }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const loadId = toast.loading("Đang vào shop...");
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data); setIsLoginOpen(false);
        toast.success(`Chào ${data.username}!`, { id: loadId });
      } else { toast.error("Sai tài khoản/mật khẩu!", { id: loadId }); }
    } catch (error) { toast.error("Lỗi kết nối!", { id: loadId }); }
  };

  return (
    <Router>
      <div className="min-h-screen pb-20 font-sans bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2016/01/27/15/25/space-1164579_1280.png')" }}>
        <Toaster position="top-center" />
        
        <Header user={user} setIsRegisterOpen={setIsRegisterOpen} setIsLoginOpen={setIsLoginOpen} setIsProfileOpen={setIsProfileOpen} handleLogout={() => setUser(null)} />

        <div className="max-w-7xl mx-auto px-4 mt-6">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              <div className="lg:col-span-4 bg-white rounded-lg shadow-xl overflow-hidden flex flex-col border border-gray-200 h-[380px] italic font-bold">
                 <div className="flex bg-gray-200">
                    <button onClick={() => setActiveTab('napThe')} className={`flex-1 py-3 text-[11px] uppercase ${activeTab === 'napThe' ? 'bg-red-600 text-white' : ''}`}>Nạp thẻ</button>
                    <button onClick={() => setActiveTab('chuyenKhoan')} className={`flex-1 py-3 text-[11px] uppercase ${activeTab === 'chuyenKhoan' ? 'bg-red-600 text-white' : ''}`}>ATM/MOMO</button>
                    <button onClick={() => setActiveTab('topNap')} className={`flex-1 py-3 text-[11px] uppercase ${activeTab === 'topNap' ? 'bg-red-600 text-white' : ''}`}>Top Nạp</button>
                 </div>
                 
                 <div className="p-5 flex-1 bg-white overflow-y-auto custom-scrollbar border-b-2 border-black">
                  {activeTab === 'napThe' && (
                    <div className="space-y-3 animate-in slide-in-from-left duration-300">
                      <select value={cardData.type} onChange={(e) => setCardData({...cardData, type: e.target.value})} className="w-full bg-gray-50 border-2 border-black p-2 rounded-xl text-xs font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none">
                        <option value="VIETTEL">VIETTEL</option>
                        <option value="MOBIFONE">MOBIFONE</option>
                        <option value="VINAPHONE">VINAPHONE</option>
                        <option value="GARENA">GARENA</option>
                        <option value="ZING">ZING</option>

                      </select>
                      <select value={cardData.amount} onChange={(e) => setCardData({...cardData, amount: e.target.value})} className="w-full bg-gray-50 border-2 border-black p-2 rounded-xl text-xs font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none">
                        <option value="10000">10,000đ</option>
                        <option value="20000">20,000đ</option>
                        <option value="50000">50,000đ</option>
                        <option value="100000">100,000đ</option>
                        <option value="200000">200,000đ</option>
                        <option value="500000">500,000đ</option>
                      </select>
                      <div className="grid grid-cols-2 gap-2">
                        <input type="text" value={cardData.pin} onChange={(e) => setCardData({...cardData, pin: e.target.value})} placeholder="Mã thẻ..." className="w-full border-2 border-black p-2 rounded-xl text-xs font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none" />
                        <input type="text" value={cardData.serial} onChange={(e) => setCardData({...cardData, serial: e.target.value})} placeholder="Số Seri..." className="w-full border-2 border-black p-2 rounded-xl text-xs font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none" />
                      </div>
                      <button onClick={handleCardSubmit} className="w-full bg-red-600 text-white font-black py-3 rounded-2xl text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all border-2 border-black">
                        🔥 NẠP THẺ NGAY
                      </button>
                    </div>
                  )}

                  {activeTab === 'chuyenKhoan' && (
                    <div className="space-y-3 animate-in zoom-in duration-300">
                      <div className="bg-blue-600 border-2 border-black p-4 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-white">
                        <p className="text-[10px] font-black opacity-80 uppercase">MB BANK</p>
                        <p className="text-xl font-black tracking-wider text-white">0798216387</p>
                        <p className="text-[11px] font-bold uppercase">VO NGUYEN DUY HOANG</p>
                      </div>
                      <div className="bg-yellow-300 border-2 border-black p-3 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex justify-between items-center">
                        <div className="text-black">
                          <p className="text-[9px] font-black text-black/60 uppercase">Nội dung nạp</p>
                          <p className="text-sm font-black text-red-600 uppercase">NAP {user ? user.username : 'DUYHOANG'}</p>
                        </div>
                        <button onClick={() => {
                          const content = `NAP ${user ? user.username : 'DUYHOANG'}`;
                          navigator.clipboard.writeText(content); 
                          toast.success("Đã copy nội dung nạp!");
                        }} className="bg-black text-white text-[10px] px-3 py-1 rounded font-black">COPY</button>
                      </div>
                    </div>
                  )}

                  {activeTab === 'topNap' && (
                    <div className="space-y-2 animate-in slide-in-from-right duration-300">
                      {(topDepositors && topDepositors.length > 0 ? topDepositors : [
                        {username: "Hoda***", total_nap: 5000000},
                        {username: "Ngan***", total_nap: 2000000},
                        {username: "VipRo***", total_nap: 1500000},
                        {username: "TrumFre***", total_nap: 800000},
                        {username: "Ungsad***", total_nap: 500000}
                      ]).map((item, i) => (
                        <div key={i} className={`flex items-center justify-between p-2 border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mb-2 ${i === 0 ? 'bg-orange-400 animate-pulse' : 'bg-white'}`}>
                          <div className="flex items-center gap-2">
                            <span className={`w-5 h-5 flex items-center justify-center rounded-full border-2 border-black font-black text-[10px] text-black ${i === 0 ? 'bg-yellow-300' : 'bg-gray-100'}`}>{i + 1}</span>
                            <span className="text-[11px] font-black uppercase text-black">{item.username}</span>
                          </div>
                          <span className="text-[11px] font-black text-red-600">{item.total_nap?.toLocaleString()}đ</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-span-8 rounded-lg overflow-hidden relative h-[380px] bg-red-600 flex items-center justify-center">
                 <img src="/banner.png" className="absolute inset-0 w-full h-full object-cover opacity-80" alt="banner" />
                 <h1 className="relative z-10 text-6xl md:text-8xl font-black italic text-white drop-shadow-2xl animate-pulse">CHIN SHOP</h1>
              </div>
           </div>
        </div>

        <main className="max-w-7xl mx-auto p-4 mt-4">
             <Routes>
                <Route path="/" element={<ShopContent products={products} handleBuy={(item) => console.log(item)} />} />
                <Route path="/category/:categoryName" element={<CategoryPage products={products} handleBuy={(item) => console.log(item)} />} />
                <Route path="/tui-mu" element={<BlindBoxPage user={user} setUser={setUser} products={products} setProducts={setProducts} />} />
                <Route path="/product/:id" element={<ProductDetail products={products} handleBuy={(item) => console.log(item)} />} />
                <Route path="/dich-vu" element={<ServicesPage />} />
                <Route path="/history" element={<HistoryPage user={user} />} />
                <Route path="/quan-tri-vien-vip" element={<AdminPanel />} />
             </Routes>
        </main>

        <Footer />

        <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} onSubmit={handleRegisterSubmit} regForm={regForm} setRegForm={setRegForm} captchaCode={captchaCode} generateCaptcha={() => setCaptchaCode(Math.random().toString(36).substring(2, 8).toUpperCase())} inputCaptcha={inputCaptcha} setInputCaptcha={setInputCaptcha} />
        <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onSubmit={handleLoginSubmit} loginForm={loginForm} setLoginForm={setLoginForm} />
        <ProfileModal isOpen={isProfileOpen} user={user} onClose={() => setIsProfileOpen(false)} />
      </div>
    </Router>
  );
}

export default App;