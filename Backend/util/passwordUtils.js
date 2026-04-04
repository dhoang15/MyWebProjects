const bcrypt = require('bcryptjs'); // Nên dùng bcryptjs để tránh lỗi build trên Render

const hashPassword = async (password) => { // Sửa p thành P ở đây
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}

// Xuất ra với tên hàm có chữ P hoa
module.exports = { hashPassword, comparePassword };