const User = require('../models/users');
const { hashPassword, comparePassword } = require('../util/passwordUtils'); 
const generateToken = require('../util/generateToken');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin!' });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: 'Mật khẩu phải từ 6 ký tự trở lên!' });
        }

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Tài khoản hoặc Email đã tồn tại!' });
        }

        const hashedPassword = await hashPassword(password);
        
        const newUser = new User({ 
            username, 
            email, 
            password: hashedPassword,
            balance: 0 
        });
        await newUser.save();
        
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

        if (!loginKey || !password) {
            return res.status(400).json({ message: 'Vui lòng nhập tài khoản và mật khẩu!' });
        }

        const user = await User.findOne({ 
            $or: [
                { email: loginKey }, 
                { username: loginKey }
            ] 
        });

        if (!user) {
            return res.status(400).json({ message: 'Tài khoản hoặc mật khẩu không đúng!' });
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Tài khoản hoặc mật khẩu không đúng!' });
        }

        const token = generateToken(user._id);
        
        res.json({ 
            message: "Đăng nhập thành công!",
            id: user._id,
            username: user.username,
            email: user.email,
            balance: user.balance,
            token 
        });
    } catch (error) {
        console.error("LỖI ĐĂNG NHẬP:", error);
        res.status(500).json({ message: 'Lỗi hệ thống' });
    }
};