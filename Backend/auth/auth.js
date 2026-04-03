const jwt = require('jsonwebtoken');
const User = require('../models/users');

const protect = async (req, res, next) => {
    let token;

    // 1. Kiểm tra xem có Token trong Header không
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Lấy token từ chuỗi "Bearer <token>"
            token = req.headers.authorization.split(' ')[1];

            // 2. Giải mã Token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. Tìm User và gán vào req (Loại bỏ mật khẩu cho an toàn)
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({ message: 'Người dùng không tồn tại!' });
            }

            return next(); // ✅ Cho phép đi tiếp vào Controller
        } catch (error) {
            console.error("Lỗi xác thực Token:", error);
            return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn!' });
        }
    }

    // 4. Nếu hoàn toàn không có Token
    if (!token) {
        return res.status(401).json({ message: 'Bạn chưa đăng nhập, vui lòng gửi Token!' });
    }
};

module.exports = { protect };