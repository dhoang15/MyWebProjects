const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true,        // Xóa khoảng trắng 2 đầu
        lowercase: true    // Luôn lưu chữ thường để dễ tìm kiếm
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true,
        lowercase: true
    },
    password: { 
        type: String, 
        required: true 
    },
    balance: { 
        type: Number, 
        default: 0,
        min: [0, 'Số dư không được âm!'] // Bảo vệ ví tiền của shop
    },
    total_nap: { // Thêm cái này để làm chức năng "Top Nạp" mà Hoàng viết ở routes/auth.js
        type: Number,
        default: 0
    },
    role: { 
        type: String, 
        enum: ['user', 'admin'], 
        default: 'user' 
    }
}, { 
    timestamps: true // Tự động tạo createdAt và updatedAt
});

module.exports = mongoose.model('User', userSchema);