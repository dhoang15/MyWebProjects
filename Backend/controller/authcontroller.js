const User = require('../models/users');
// Kiểm tra kỹ file passwordUtils.js xem chữ P viết hoa hay thường nhé!
const { hashPassword, comparePassword } = require('../util/passwordUtils'); 
const generateToken = require('../util/generateToken');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        // Gọi đúng tên hàm đã import ở trên
        const hashedPassword = await hashPassword(password);
        
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        
        // Chỉ truyền _id vào để token gọn nhẹ
        const token = generateToken(newUser._id); 
        
        res.status(201).json({ message: "Đăng ký thành công!", token });
    } catch (error) {
        console.error(error); // In lỗi ra terminal để bạn dễ sửa
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    try {
        // Ở Thunder Client, bạn hãy gửi key là "email" nhé
        const { email, password } = req.body; 

        // Tìm user theo email
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // So sánh mật khẩu nhập vào với mật khẩu đã mã hóa trong DB
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(user._id);a
        
        res.json({ 
            message: "Đăng nhập thành công!",
            username: user.username,
            token 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};