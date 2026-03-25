import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

// IMPORT COMPONENTS ĐÃ TÁCH
import Header from "@/layout/Header.jsx";
import Footer from "@/layout/Footer.jsx";
// AuthModals nãy Hoàng để ở src/page nên dùng @/page là đúng
import { RegisterModal, LoginModal, ProfileModal } from "@/page/AuthModals.jsx";

// IMPORT PAGES
import ShopContent from "@/page/ShopContent.jsx";
import CategoryPage from '@/page/CategoryPage.jsx';
// ... các trang khác

function App() {
  // --- GIỮ NGUYÊN TOÀN BỘ LOGIC STATE & HANDLER CỦA HOÀNG Ở ĐÂY ---
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  // ... các hàm handleLogin, handleRegister, handleBuy ...

  return (
    <Router>
      <div className="min-h-screen pb-20 font-sans bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('https://...')" }}>
        <Toaster position="top-center" />
        
        {/* HEADER GỌI LÊN GỌN GÀNG */}
        <Header 
          user={user} 
          setIsRegisterOpen={setIsRegisterOpen} 
          setIsLoginOpen={setIsLoginOpen} 
          setIsProfileOpen={setIsProfileOpen} 
          handleLogout={handleLogout} 
        />

        <main className="max-w-7xl mx-auto p-4 mt-4">
          <Routes>
            <Route path="/" element={<ShopContent products={products} handleBuy={handleBuy} />} />
            <Route path="/category/:categoryName" element={<CategoryPage products={products} handleBuy={handleBuy} />} />
            {/* ... các Route khác giữ nguyên */}
          </Routes>
        </main>

        <Footer />

        {/* CÁC MODALS GỌI LÊN Ở ĐÂY */}
        <RegisterModal 
          isOpen={isRegisterOpen} 
          onClose={() => setIsRegisterOpen(false)} 
          onSubmit={handleRegisterSubmit}
          regForm={regForm}
          setRegForm={setRegForm}
          captchaCode={captchaCode}
          generateCaptcha={() => setCaptchaCode(generateCaptcha())}
          inputCaptcha={inputCaptcha}
          setInputCaptcha={setInputCaptcha}
        />
        
        <LoginModal 
          isOpen={isLoginOpen} 
          onClose={() => setIsLoginOpen(false)} 
          onSubmit={handleLoginSubmit}
          loginForm={loginForm}
          setLoginForm={setLoginForm}
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