const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// 1. Cấu hình (Phải đặt trên cùng)
dotenv.config();
const app = express();

// 2. Kết nối Database
connectDB();

// 3. Middlewares (PHẢI ĐẶT TRƯỚC ROUTES)
app.use(cors({
    origin: '*', // Cho phép tất cả để test, hoặc điền đúng link Vercel của Hoàng
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 4. Khai báo Routes (Sửa lại cho chuẩn đường dẫn)
app.use('/api/auth', require('./routes/auth')); 
// SỬA TẠI ĐÂY: Dùng /api để link thành /api/products
app.use('/api', require('./routes/api')); 

// 5. Route mặc định    
app.get('/', (req, res) => {
    res.send('API đang chạy');
});

// 6. Xử lý lỗi 404 (PHẢI ĐẶT CUỐI CÙNG SAU CÁC ROUTES)
app.use((req, res) => {
    res.status(404).json({ message: "Đường dẫn không tồn tại trên Server!" });
});

// 7. Khởi chạy
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại: ${PORT}`);
});