const express = require('express');
const router = express.Router();
const db = require('../config/db');
const axios = require('axios'); 

const API_KEY = "KEY_CUA_HOANG_DIIEN_VAO_DAY"; 

router.post('/send-card', async (req, res) => {
    const { telco, amount, serial, code, username } = req.body;

    try {
        // Gửi dữ liệu sang bên API nạp thẻ
        const response = await axios.get(`https://ben-api-nap-the.com/api?key=${API_KEY}&type=${telco}&amount=${amount}&seri=${serial}&pin=${code}`);
        
        if (response.data.status === 1) {
            res.json({ message: "Thẻ đã gửi lên hệ thống, chờ duyệt!" });
        } else {
            res.status(400).json({ message: response.data.msg || "Lỗi nạp thẻ!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Lỗi kết nối API nạp thẻ!" });
    }
});

module.exports = router;