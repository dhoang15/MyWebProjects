const express = require('express');
const router = express.Router();
const {protect} = require('../auth/auth');
const { register, login } = require('../controller/authcontroller');

// Đảm bảo các hàm register và login đã được định nghĩa trong controller
router.post('/register', register);
router.post('/login', login);

router.get('/profile', (req, res) => {
    res.json({ 
        message: "Thông tin người dùng",
        user: req.user // Thông tin user đã được gán vào req.user trong middleware protect
    });
});

// THIẾU DÒNG NÀY LÀ SẬP SERVER:
module.exports = router;