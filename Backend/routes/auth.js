const express = require('express');
const router = express.Router();
const { protect } = require('../auth/auth'); // Middleware kiểm tra Token
const { register, login } = require('../controller/authcontroller');

// 🔐 1. Tuyến đường Đăng ký & Đăng nhập (Công khai)
router.post('/register', register);
router.post('/login', login);

// 👤 2. Lấy thông tin cá nhân (Phải Đăng nhập mới xem được)
// SỬA TẠI ĐÂY: Thêm protect vào trước (req, res)
router.get('/profile', protect, (req, res) => {
    res.json({ 
        success: true,
        message: "Lấy thông tin thành công!",
        user: req.user // Protect đã giải mã Token và gán user vào đây
    });
});

// ✅ THIẾU DÒNG NÀY LÀ SẬP SERVER:
module.exports = router;