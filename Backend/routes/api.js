const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Kéo DB vào

// [GET] /api/products - LẤY DANH SÁCH SẢN PHẨM GỘP CHUNG SỐ LƯỢNG
router.get('/products', async (req, res) => {
  try {
    // Câu lệnh SQL này sẽ gộp các hàng giống Name, Category, Price lại 
    // và đếm xem có bao nhiêu Acc đang 'available'
    const sql = `
      SELECT 
        id, category, name, price, image, 
        COUNT(*) as total_stock 
      FROM products 
      WHERE status = 'available' 
      GROUP BY name, category, price
    `;
    const [products] = await db.query(sql);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// [POST] /api/buy - MUA ACC (CHỐT ĐƠN)
router.post('/buy', async (req, res) => {
  const { user_id, product_id, price } = req.body;
  
  const connection = await db.getConnection(); // Dùng connection riêng để khóa dữ liệu (Transaction)
  try {
    await connection.beginTransaction();

    const [users] = await connection.query('SELECT balance FROM users WHERE id = ?', [user_id]);
    if (users[0].balance < price) throw new Error("Số dư không đủ!");

    const [products] = await connection.query('SELECT username_acc, password_acc, status FROM products WHERE id = ? FOR UPDATE', [product_id]);
    if (products[0].status === 'sold') throw new Error("Acc này đã bị người khác mua mất rồi!");

    // Trừ tiền user
    await connection.query('UPDATE users SET balance = balance - ? WHERE id = ?', [price, user_id]);
    // Đổi status acc thành sold
    await connection.query('UPDATE products SET status = "sold" WHERE id = ?', [product_id]);
    // Lưu lịch sử
    await connection.query(
      'INSERT INTO history (user_id, username_acc, password_acc, price, buy_date) VALUES (?, ?, ?, ?, NOW())',
      [user_id, products[0].username_acc, products[0].password_acc, price]
    );

    await connection.commit();
    res.json({ message: "Mua Acc thành công!", newBalance: users[0].balance - price });
  } catch (err) {
    await connection.rollback();
    res.status(400).json({ message: err.message });
  } finally {
    connection.release();
  }
});
// [POST] /api/products/add - API THÊM ACC MỚI
router.post('/products/add', async (req, res) => {
  const { category, name, ms, price, image, username_acc, password_acc } = req.body;
  try {
    const sql = `INSERT INTO products (category, name, ms, price, image, username_acc, password_acc, status) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, 'available')`;
    await db.query(sql, [category, name, ms, price, image, username_acc, password_acc]);
    res.json({ message: "Thêm Acc vào kho thành công!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;