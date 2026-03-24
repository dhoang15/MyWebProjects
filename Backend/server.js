const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// GỌI CÁC ROUTES ĐÃ CHIA MỤC
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const naptheRoutes = require('./routes/napthe');

app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/api/card', naptheRoutes);

app.listen(5000, () => {
    console.log("🚀 Server CHIN SHOP đang chạy tại: http://localhost:5000");
});