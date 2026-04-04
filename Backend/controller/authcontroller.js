const User = require('../models/users');
const { hashPassword, comparePassword } = require('../util/passwordUtils'); 
const generateToken = require('../util/generateToken');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // 1. Kiểm tra trùng lặp
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Tài khoản hoặc Email đã tồn tại!' });
        }

        // 2. Mã hóa mật khẩu
        const hashedPassword = await hashPassword(password);
        
        // 3. Lưu User mới
        const newUser = new User({ 
            username, 
            email, 
            password: hashedPassword,
            balance: 0 // Khởi tạo số dư bằng 0 cho khách mới
        });
        await newUser.save();
        
        // 4. Tạo Token
        const token = generateToken(newUser._id); 
        
        res.status(201).json({ 
            message: "Đăng ký thành công!", 
            token,
            username: newUser.username 
        });
    } catch (error) {
        console.error("LỖI ĐĂNG KÝ:", error);
        res.status(500).json({ message: 'Lỗi hệ thống khi đăng ký' });
    }
};

exports.login = async (req, res) => {
    try {
        const { loginKey, password } = req.body; 

        const user = await User.findOne({ $or: [{ email: loginKey }, { username: loginKey }] });
        if (!user) {
            return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng!' });
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng!' });
        }

        // FIX LỖI: Xóa chữ 'a' thừa ở cuối dòng này
        const token = generateToken(user._id);
        
        res.json({ 
            message: "Đăng nhập thành công!",
            username: user.username,
            email: user.email,
            balance: user.balance,
            id: user._id,
            token 
        });
    } catch (error) {
        console.error("LỖI ĐĂNG NHẬP:", error);
        res.status(500).json({ message: 'Lỗi hệ thống khi đăng nhập' });
    }
};