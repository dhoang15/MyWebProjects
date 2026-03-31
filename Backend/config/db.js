const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Đảm bảo MONGO_URI trong file .env đã chính xác
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1); // Dừng server nếu lỗi kết nối
    }
};

// SAI: module.exports = { connectDB }; 
// ĐÚNG:
module.exports = connectDB;