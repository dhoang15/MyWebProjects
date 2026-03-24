const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Kéo kết nối DB vào

// [POST] /api/auth/register - ĐĂNG KÝ
router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const [existing] = await db.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email]);
    if (existing.length > 0) return res.status(400).json({ message: "Tên đăng nhập hoặc email đã tồn tại!" });

    await db.query('INSERT INTO users (username, password, email, balance) VALUES (?, ?, ?, 0)', [username, password, email]);
    res.status(201).json({ message: "Đăng ký thành công!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// [POST] /api/auth/login - ĐĂNG NHẬP
router.post('/login', async (req, res) => {
 const username = req.body.username.trim();
 const password = req.body.password.trim();
  try {
    const [users] = await db.query('SELECT id, username, balance, email FROM users WHERE username = ? AND password = ?', [username, password]);
    if (users.length === 0) return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu!" });
    
    res.json(users[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// [GET] /api/auth/history/:id - LẤY LỊCH SỬ MUA HÀNG
router.get('/history/:id', async (req, res) => {
  try {
    const [history] = await db.query('SELECT * FROM history WHERE user_id = ? ORDER BY buy_date DESC', [req.params.id]);
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;