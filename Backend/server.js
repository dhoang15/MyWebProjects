const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Hỗ trợ kết nối với Frontend
const connectDB = require('./config/db');

// 1. Cấu hình biến môi trường (Phải đặt trên cùng)
dotenv.config();

// 2. Kết nối tới Cơ sở dữ liệu MongoDB
connectDB();

const app = express();

// 3. Middlewares hệ thống
app.use(cors()); // Cho phép Frontend (React) gọi API từ Backend
app.use(express.json()); // Cho phép Backend đọc dữ liệu JSON từ request body
app.use(express.urlencoded({ extended: false })); // Hỗ trợ đọc dữ liệu từ form (nếu có)

// 4. Khai báo các Tuyến đường (Routes)
// Kết nối với các file trong thư mục routes/
app.use('/api/auth', require('./routes/auth')); 
// app.use('/api/products', require('./routes/api')); // Mở ra khi bạn đã xong file api.js

// 5. Route kiểm tra trạng thái Server (Mặc định)
app.get('/', (req, res) => {
    res.send('API của Chin Shop đang chạy... 🚀');
});

// 6. Xử lý lỗi 404 (Khi người dùng vào link không tồn tại)
app.use((req, res, next) => {
    res.status(404).json({ message: "Đường dẫn không tồn tại!" });
});

// Cho phép Frontend của bạn truy cập
app.use(cors({
    origin: 'https://chinshop-weld.vercel.app', // Thay bằng link Vercel của bạn
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// 7. Khởi chạy Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`---`);
    console.log(`✅ Server đang chạy tại cổng: ${PORT}`);
    console.log(`👉 Link thử nghiệm: http://localhost:${PORT}`);
    console.log(`---`);
});