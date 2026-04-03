const express = require('express');
const router = express.Router();
const Product = require('../models/product');
// 🍎 1. LẤY DANH SÁCH TẤT CẢ SẢN PHẨM (ACC)
router.get('/products', async (req, res) => {
    try {
        // Lấy tất cả sản phẩm từ MongoDB
        const products = await Product.find().sort({ createdAt: -1 }); 
        
        // Trả về mảng JSON cho Frontend
        res.json(products);
    } catch (error) {
        console.error("Lỗi lấy sản phẩm:", error);
        res.status(500).json({ message: "Lỗi máy chủ khi lấy sản phẩm" });
    }
});

// 🍎 2. LẤY CHI TIẾT 1 SẢN PHẨM (Dùng cho trang ProductDetail)
router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Không tìm thấy Acc này!" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
});

module.exports = router;