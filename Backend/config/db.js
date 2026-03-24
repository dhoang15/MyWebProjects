const mysql = require('mysql2');

const db = mysql.createConnection({
    // Đổi 'localhost' thành '127.0.0.1' để chắc chắn kết nối IPv4
    host: '127.0.0.1', 
    user: 'root',      
    password: '',      
    database: 'chin_shop',
    // Thêm port vào cho chắc ăn, vì log của bạn báo có sự chồng chéo cổng
    port: 3306 
});

db.connect(err => {
    if (err) {
        console.error("❌ Lỗi kết nối MySQL rồi Hoàng ơi:");
        console.error("- Mã lỗi:", err.code);
        console.error("- Chi tiết:", err.message);
        console.log("\n💡 Mẹo: Kiểm tra XAMPP đã Start MySQL (màu xanh) chưa nhé!");
    } else {
        console.log("✅ DATABASE CHIN SHOP ĐÃ THÔNG SUỐT! CHIẾN THÔI!");
    }
});

module.exports = db;