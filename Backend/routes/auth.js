const express = require('express');
const router = express.Router();
const { protect } = require('../auth/auth');
const { register, login } = require('../controller/authcontroller');
const User = require('../models/users'); 

// 🔐 1. ĐĂNG KÝ & ĐĂNG NHẬP
router.post('/register', register);
router.post('/login', login);

// 👤 2. LẤY THÔNG TIN CÁ NHÂN
router.get('/profile', protect, (req, res) => {
    res.json({ 
        success: true,
        user: req.user 
    });
}); // Đóng đúng dấu ngoặc ở đây

// 🏆 3. LẤY DANH SÁCH TOP NẠP
router.get('/top-depositors', async (req, res) => {
    try {
        const top = await User.find()
            .sort({ total_nap: -1 })
            .limit(5)
            .select('username total_nap');
        res.json(top);
    } catch (error) {
        console.error("Lỗi Top nạp:", error);
        res.status(500).json([]);
    }
});

// ✅ XUẤT ROUTER
module.exports = router;