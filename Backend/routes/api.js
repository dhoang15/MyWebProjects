const express = require('express');
const router = express.Router();
// SỬA TẠI ĐÂY: Dùng product (p thường) cho đúng với ảnh thư mục của bạn
const Product = require('../models/product'); 

// 🍎 1. LẤY DANH SÁCH TẤT CẢ SẢN PHẨM (Link: /api/products)
router.get('/products', async (req, res) => {
    try {
        // Thêm log này để kiểm tra ở Terminal Render
        console.log("Đang lấy danh sách Acc...");
        const products = await Product.find().sort({ createdAt: -1 }); 
        res.json(products);
    } catch (error) {
        console.error("Lỗi lấy sản phẩm:", error);
        res.status(500).json([]); 
    }
});

// 🍎 2. LẤY CHI TIẾT 1 SẢN PHẨM (Link: /api/products/:id)
router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Không tìm thấy Acc!" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
});

module.exports = router;