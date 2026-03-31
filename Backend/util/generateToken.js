const jwt = require('jsonwebtoken');

const generateToken = (userData) => {
    // Nếu userData là object thì lấy ._id, nếu là chuỗi thì lấy chính nó
    const id = userData._id || userData;
    const role = userData.role || 'user';

    return jwt.sign(
        { id, role }, 
        process.env.JWT_SECRET, 
        { expiresIn: '30d' }
    );
};

module.exports = generateToken;