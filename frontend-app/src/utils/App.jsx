import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

// --- COMPONENTS ---
import Header from "@/layout/Header.jsx";
import Footer from "@/layout/Footer.jsx";
import Sidebar from "@/layout/Sidebar.jsx";
import { RegisterModal, LoginModal, ProfileModal } from "@/page/AuthModals.jsx";

// --- PAGES ---
import ShopContent from "@/page/ShopContent.jsx";
import CategoryPage from "@/page/CategoryPage.jsx";
import HistoryPage from "@/page/HistoryPage.jsx";
import ProductDetail from "@/page/ProductDetail.jsx";
import BlindBoxPage from "@/page/BlindBoxPage.jsx";
import ServicesPage from "@/page/ServicesPage.jsx";
import AdminPanel from "@/page/AdminPanel.jsx";

function App() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [topDepositors, setTopDepositors] = useState([]);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Auth States
  const [regForm, setRegForm] = useState({ username: '', password: '', email: '' });
  const [loginForm, setLoginForm] = useState({ loginKey: '', password: '' });
  const [captchaCode, setCaptchaCode] = useState("");

  const API_URL = (import.meta.env.VITE_API_URL || 'https://mywebprojects-rxl0.onrender.com').replace(/\/$/, '');

  useEffect(() => {
    // 1. Load User
    const saved = localStorage.getItem('userData');
    if (saved) try { setUser(JSON.parse(saved)); } catch(e) { localStorage.removeItem('userData'); }

    // 2. Fetch Data
    const loadData = async () => {
      try {
        const [pRes, tRes] = await Promise.all([
          fetch(`${API_URL}/api/products`),
          fetch(`${API_URL}/api/auth/top-depositors`)
        ]);
        if (pRes.ok) setProducts(await pRes.json());
        if (tRes.ok) setTopDepositors(await tRes.json());
      } catch (err) { setProducts([]); }
    };
    loadData();
  }, [API_URL]);

  const handleLogout = () => {
    localStorage.clear(); setUser(null); toast.success("Đã đăng xuất!");
  };

const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const id = toast.loading("Đang vào shop...");
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // FIX TẠI ĐÂY: Dùng loginKey thay vì email
        body: JSON.stringify({ 
          loginKey: loginForm.loginKey, 
          password: loginForm.password 
        })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userData', JSON.stringify(data));
        setUser(data); 
        setIsLoginOpen(false);
        toast.success(`Chào ${data.username}!`, { id });
      } else { 
        // Backend trả về message gì thì hiện đúng cái đó (ví dụ: "Tài khoản không tồn tại")
        toast.error(data.message || "Lỗi đăng nhập!", { id }); 
      }
    } catch (err) { 
      toast.error("Lỗi kết nối Server!", { id }); 
    }
  };
  return (
    <Router>
      <div className="min-h-screen pb-20 font-sans bg-fixed bg-cover bg-center text-black" style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2016/01/27/15/25/space-1164579_1280.png')" }}>
        <Toaster position="top-center" />
        <Header user={user} setIsRegisterOpen={setIsRegisterOpen} setIsLoginOpen={setIsLoginOpen} setIsProfileOpen={setIsProfileOpen} handleLogout={handleLogout} />

        {/* CỐ ĐỊNH SIDEBAR & BANNER Ở TRÊN */}
        <div className="max-w-7xl mx-auto px-4 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4">
               <Sidebar user={user} topDepositors={topDepositors} />
            </div>
            <div className="lg:col-span-8 rounded-3xl overflow-hidden relative h-[380px] bg-red-600 flex items-center justify-center border-4 border-black shadow-2xl">
              <img src="/banner.png" className="absolute inset-0 w-full h-full object-cover opacity-80" alt="banner" />
              <h1 className="relative z-10 text-6xl md:text-8xl font-black italic text-white drop-shadow-[5px_5px_0px_rgba(0,0,0,1)] animate-pulse">CHIN SHOP</h1>
            </div>
          </div>
        </div>

        {/* NỘI DUNG THAY ĐỔI THEO ROUTE */}
        <main className="max-w-7xl mx-auto p-4 mt-4">
          <Routes>
            <Route path="/" element={<ShopContent prsoducts={products} />} />
            <Route path="/category/:categoryName" element={<CategoryPage products={products} />} />
            <Route path="/product/:id" element={<ProductDetail products={products} />} />
            <Route path="/history" element={<HistoryPage user={user} />} />
            <Route path="/tui-mu" element={<BlindBoxPage user={user} setUser={setUser} setProducts={setProducts} />} />
            <Route path="/dich-vu" element={<ServicesPage />} />
            <Route path="/quan-tri-vien-vip" element={<AdminPanel />} />
          </Routes>
        </main>

        <Footer />

        {/* MODALS */}
        <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onSubmit={handleLoginSubmit} loginForm={loginForm} setLoginForm={setLoginForm} />
        <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} regForm={regForm} setRegForm={setRegForm} captchaCode={captchaCode} generateCaptcha={() => setCaptchaCode(Math.random().toString(36).substring(2, 8).toUpperCase())} />
        <ProfileModal isOpen={isProfileOpen} user={user} onClose={() => setIsProfileOpen(false)} />
      </div>
    </Router>
  );
}

export default App;