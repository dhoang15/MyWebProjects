const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },       // Tên Acc (vd: Acc Liên Quân Rank Cao)
    category: { type: String, required: true },    // Danh mục (LIENQUAN, FREEFIRE...)
    price: { type: Number, required: true },      // Giá tiền
    image: { type: String, required: true },      // Link ảnh Acc
    description: { type: String },                 // Mô tả chi tiết
    accountInfo: { type: String, required: true }, // Thông tin tài khoản (chỉ hiện sau khi mua)
    status: { type: String, default: 'available' } // Trạng thái: available hoặc sold
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);