import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

// --- IMPORT CÁC TRANG ---
import HistoryPage from "@/page/HistoryPage.jsx";
import ProductDetail from "@/page/ProductDetail.jsx";
import CategoryPage from "@/page/CategoryPage.jsx";
import BlindBoxPage from "@/page/BlindBoxPage.jsx";
import ShopContent from "@/page/ShopContent.jsx";
import ServicesPage from "@/page/ServicesPage.jsx";
import AdminPanel from "@/page/AdminPanel.jsx";

// --- IMPORT CÁC COMPONENT ---
import Header from "@/layout/Header.jsx";
import Footer from "@/layout/Footer.jsx";
import { LoginModal, RegisterModal, ProfileModal } from "@/page/AuthModals";

// 🛠️ CẤU HÌNH API URL (Thay link này khi up lên Render)
const API_URL = import.meta.env.VITE_API_URL || 'https://mywebprojects-rxl0.onrender.com/';

function App() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isShaking, setIsShaking] = useState(false); 
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('napThe');
  const [topDepositors, setTopDepositors] = useState([]); 
  
  const [regForm, setRegForm] = useState({ username: '', password: '', email: '' });
  const [loginForm, setLoginForm] = useState({ username: '', password: '' }); // username này dùng để nhập Email/User tùy Backend
  const [captchaCode, setCaptchaCode] = useState(Math.random().toString(36).substring(2, 8).toUpperCase());
  const [inputCaptcha, setInputCaptcha] = useState('');
  const [cardData, setCardData] = useState({ type: 'VIETTEL', amount: '10000', pin: '', serial: '' });

  // 🚀 1. TỰ ĐỘNG ĐĂNG NHẬP KHI F5 TRANG
  useEffect(() => {
    const savedData = localStorage.getItem('userData'); 
    if (savedData) {
      try {
        setUser(JSON.parse(savedData));
      } catch (e) {
        localStorage.removeItem('userData');
      }
    }
    
    // Fetch dữ liệu từ Backend
    fetch(`${API_URL}/api/products`).then(res => res.json()).then(setProducts).catch(() => {});
    fetch(`${API_URL}/api/auth/top-depositors`).then(res => res.json()).then(setTopDepositors).catch(() => {});
  }, []);

  // 🚪 2. XỬ LÝ ĐĂNG XUẤT
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    setUser(null);
    toast.success("Đăng xuất thành công!");
  };

  // 💳 3. XỬ LÝ NẠP THẺ
  const handleCardSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Vui lòng đăng nhập để nạp thẻ!");
    if (!cardData.pin || !cardData.serial) return toast.error("Vui lòng nhập đầy đủ mã thẻ và seri!");
    
    const loadId = toast.loading("Đang gửi thẻ lên hệ thống...");
    setTimeout(() => {
      toast.success("Gửi thẻ thành công! Vui lòng chờ duyệt.", { id: loadId });
      setCardData({ ...cardData, pin: '', serial: '' });
    }, 2000);
  };

  // 📝 4. XỬ LÝ ĐĂNG KÝ (Có mã Captcha)
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (inputCaptcha.toUpperCase() !== captchaCode) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      toast.error("Sai mã Captcha!"); 
      return;
    }

    const loadId = toast.loading("Đang tạo tài khoản...");
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(regForm)
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Đăng ký thành công! Đăng nhập ngay.", { id: loadId });
        setIsRegisterOpen(false); 
        setIsLoginOpen(true);
        setRegForm({ username: '', password: '', email: '' });
        setInputCaptcha('');
      } else { 
        toast.error(data.message || "Đăng ký thất bại!", { id: loadId }); 
      }
    } catch (error) { 
      toast.error("Lỗi kết nối máy chủ!", { id: loadId }); 
    }
  };

  // 🔑 5. XỬ LÝ ĐĂNG NHẬP (Lưu Token)
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const loadId = toast.loading("Đang vào shop...");
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginForm.username, // Map 'username' của form vào 'email' của Backend
          password: loginForm.password
        })
      });
      const data = await res.json();
      if (res.ok) {
        // Lưu cả Object user và Token
        localStorage.setItem('token', data.token);
        localStorage.setItem('userData', JSON.stringify(data));
        
        setUser(data); 
        setIsLoginOpen(false);
        setLoginForm({ username: '', password: '' });
        toast.success(`Chào mừng ${data.username}!`, { id: loadId });
      } else { 
        toast.error(data.message || "Sai tài khoản/mật khẩu!", { id: loadId }); 
      }
    } catch (error) { 
      toast.error("Lỗi kết nối máy chủ!", { id: loadId }); 
    }
  };

  // 🛒 6. XỬ LÝ MUA ACC (Gửi kèm Token)
  const handleBuy = async (item) => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để mua Acc!");
      setIsLoginOpen(true);
      return;
    }

    const loadId = toast.loading("Đang xử lý giao dịch...");
    try {
      const res = await fetch(`${API_URL}/api/buy`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify({ product_id: item.id })
      });
      const data = await res.json();
      if (res.ok) {
        setUser({ ...user, balance: data.newBalance });
        toast.success("Mua Acc thành công! Check lịch sử nhé.", { id: loadId });
        // Cập nhật lại danh sách sản phẩm
        fetch(`${API_URL}/api/products`).then(res => res.json()).then(setProducts);
      } else {
        toast.error(data.message || "Giao dịch thất bại!", { id: loadId });
      }
    } catch (error) {
      toast.error("Lỗi kết nối máy chủ!", { id: loadId });
    }
  };

  return (
    <Router>
      <div className="min-h-screen pb-20 font-sans bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2016/01/27/15/25/space-1164579_1280.png')" }}>
        <Toaster position="top-center" />
        
        <Header user={user} setIsRegisterOpen={setIsRegisterOpen} setIsLoginOpen={setIsLoginOpen} setIsProfileOpen={setIsProfileOpen} handleLogout={handleLogout} />

        <div className="max-w-7xl mx-auto px-4 mt-6">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* --- SIDEBAR: NẠP THẺ / ATM --- */}
              <div className="lg:col-span-4 bg-white rounded-lg shadow-xl overflow-hidden flex flex-col border border-gray-200 h-[380px] italic font-bold">
                 <div className="flex bg-gray-200">
                    <button onClick={() => setActiveTab('napThe')} className={`flex-1 py-3 text-[11px] uppercase ${activeTab === 'napThe' ? 'bg-red-600 text-white' : ''}`}>Nạp thẻ</button>
                    <button onClick={() => setActiveTab('chuyenKhoan')} className={`flex-1 py-3 text-[11px] uppercase ${activeTab === 'chuyenKhoan' ? 'bg-red-600 text-white' : ''}`}>ATM/MOMO</button>
                    <button onClick={() => setActiveTab('topNap')} className={`flex-1 py-3 text-[11px] uppercase ${activeTab === 'topNap' ? 'bg-red-600 text-white' : ''}`}>Top Nạp</button>
                 </div>
                 
                 <div className="p-5 flex-1 bg-white overflow-y-auto custom-scrollbar border-b-2 border-black">
                  {activeTab === 'napThe' && (
                    <form onSubmit={handleCardSubmit} className="space-y-3 animate-in slide-in-from-left duration-300">
                      <select value={cardData.type} onChange={(e) => setCardData({...cardData, type: e.target.value})} className="w-full bg-gray-50 border-2 border-black p-2 rounded-xl text-xs font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none">
                        <option value="VIETTEL">VIETTEL</option>
                        <option value="MOBIFONE">MOBIFONE</option>
                        <option value="VINAPHONE">VINAPHONE</option>
                        <option value="GARENA">GARENA</option>
                        <option value="ZING">ZING</option>
                      </select>
                      <select value={cardData.amount} onChange={(e) => setCardData({...cardData, amount: e.target.value})} className="w-full bg-gray-50 border-2 border-black p-2 rounded-xl text-xs font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none">
                        <option value="10000">10,000đ</option>
                        <option value="50000">50,000đ</option>
                        <option value="100000">100,000đ</option>
                        <option value="500000">500,000đ</option>
                      </select>
                      <div className="grid grid-cols-2 gap-2">
                        <input type="text" value={cardData.pin} onChange={(e) => setCardData({...cardData, pin: e.target.value})} placeholder="Mã thẻ..." className="w-full border-2 border-black p-2 rounded-xl text-xs font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none" />
                        <input type="text" value={cardData.serial} onChange={(e) => setCardData({...cardData, serial: e.target.value})} placeholder="Số Seri..." className="w-full border-2 border-black p-2 rounded-xl text-xs font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none" />
                      </div>
                      <button type="submit" className="w-full bg-red-600 text-white font-black py-3 rounded-2xl text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all border-2 border-black">
                        🔥 NẠP THẺ NGAY
                      </button>
                    </form>
                  )}

                  {activeTab === 'chuyenKhoan' && (
                    <div className="space-y-3 animate-in zoom-in duration-300">
                      <div className="bg-blue-600 border-2 border-black p-4 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-white">
                        <p className="text-[10px] font-black opacity-80 uppercase">MB BANK</p>
                        <p className="text-xl font-black tracking-wider">0798216387</p>
                        <p className="text-[11px] font-bold uppercase">VO NGUYEN DUY HOANG</p>
                      </div>
                      <div className="bg-yellow-300 border-2 border-black p-3 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex justify-between items-center text-black">
                        <div>
                          <p className="text-[9px] font-black text-black/60 uppercase">Nội dung nạp</p>
                          <p className="text-sm font-black text-red-600 uppercase">NAP {user ? user.username : 'CHINSHOP'}</p>
                        </div>
                        <button onClick={() => {
                          navigator.clipboard.writeText(`NAP ${user ? user.username : 'CHINSHOP'}`); 
                          toast.success("Đã copy nội dung nạp!");
                        }} className="bg-black text-white text-[10px] px-3 py-1 rounded font-black">COPY</button>
                      </div>
                    </div>
                  )}

                  {activeTab === 'topNap' && (
                    <div className="space-y-2 animate-in slide-in-from-right duration-300">
                      {topDepositors.map((item, i) => (
                        <div key={i} className={`flex items-center justify-between p-2 border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mb-2 ${i === 0 ? 'bg-orange-400 animate-pulse' : 'bg-white'}`}>
                          <div className="flex items-center gap-2 text-black">
                            <span className={`w-5 h-5 flex items-center justify-center rounded-full border-2 border-black font-black text-[10px] ${i === 0 ? 'bg-yellow-300' : 'bg-gray-100'}`}>{i + 1}</span>
                            <span className="text-[11px] font-black uppercase">{item.username}</span>
                          </div>
                          <span className="text-[11px] font-black text-red-600">{item.total_nap?.toLocaleString()}đ</span>
                        </div>
                      ))}
                    </div>
                  )}
                 </div>
              </div>

              {/* --- BANNER --- */}
              <div className="lg:col-span-8 rounded-lg overflow-hidden relative h-[380px] bg-red-600 flex items-center justify-center">
                 <img src="/banner.png" className="absolute inset-0 w-full h-full object-cover opacity-80" alt="banner" />
                 <h1 className="relative z-10 text-6xl md:text-8xl font-black italic text-white drop-shadow-2xl animate-pulse">CHIN SHOP</h1>
              </div>
           </div>
        </div>

        {/* --- MAIN CONTENT: ROUTES --- */}
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

        <Footer />

        {/* --- MODALS SYSTEM --- */}
        <RegisterModal 
          isOpen={isRegisterOpen} 
          onClose={() => setIsRegisterOpen(false)} 
          onSubmit={handleRegisterSubmit} 
          regForm={regForm} setRegForm={setRegForm} 
          captchaCode={captchaCode} 
          generateCaptcha={() => setCaptchaCode(Math.random().toString(36).substring(2, 8).toUpperCase())} 
          inputCaptcha={inputCaptcha} setInputCaptcha={setInputCaptcha} 
          isShaking={isShaking} 
        />
        <LoginModal 
          isOpen={isLoginOpen} 
          onClose={() => setIsLoginOpen(false)} 
          onSubmit={handleLoginSubmit} 
          loginForm={loginForm} setLoginForm={setLoginForm} 
        />
        <ProfileModal 
          isOpen={isProfileOpen} 
          user={user} 
          onClose={() => setIsProfileOpen(false)} 
        />
      </div>
    </Router>
  );
}

export default App;