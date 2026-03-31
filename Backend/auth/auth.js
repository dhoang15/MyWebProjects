const jwt = require('jsonwebtoken');
const User = require('../models/users');

const protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            return next(); // BẮT BUỘC phải có next() để chạy tiếp vào profile
        }
        
        if (!token) {
            return res.status(401).json({ message: 'Không có token!' });
        }
    } catch (error) {
        return res.status(401).json({ message: 'Token sai!' });
    }
};

module.exports = { protect }; // Xuất dạng Object có ngoặc nhọn