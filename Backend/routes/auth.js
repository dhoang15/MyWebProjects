const express = require('express');
const router = express.Router();
const { protect } = require('../auth/auth');
const { register, login } = require('../controller/authcontroller');
const User = require('../models/users'); // Import Model User ngay đầu file cho gọn

// 🔐 1. ĐĂNG KÝ & ĐĂNG NHẬP
router.post('/register', register);
router.post('/login', login);

// 👤 2. LẤY THÔNG TIN CÁ NHÂN (Yêu cầu đăng nhập)
router.get('/profile', protect, (req, res) => {
    res.json({ 
        success: true,
        user: req.user 
    });
});

// 🏆 3. LẤY DANH SÁCH TOP NẠP (Công khai để hiện Sidebar)
router.get('/top-depositors', async (req, res) => {
    try {
        // Lấy top 5 người nạp nhiều nhất, chỉ lấy tên và số tiền
        const top = await User.find()
            .sort({ total_nap: -1 }) 
            .limit(5)
            .select('username total_nap');
            
        res.json(top);
    } catch (error) {
        console.error("Lỗi lấy Top nạp:", error);
        res.status(500).json([]); // Lỗi thì trả về mảng rỗng để web không bị trắng trang
    }
});

// ✅ XUẤT ROUTER
module.exports = router;