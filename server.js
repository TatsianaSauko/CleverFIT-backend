const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const emailRoutes = require('./routes/email');
const feedbackRoutes = require('./routes/feedback');
const uploadImageRoutes = require('./routes/upload-image');
const trainingRoutes = require('./routes/training');
const catalogRoutes = require('./routes/catalogs');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(bodyParser.json());

app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true
}));
app.use(cookieParser());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "http://localhost:3000");
    res.header('Access-Control-Allow-Headers', true);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/auth', emailRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/upload-image', uploadImageRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/training', trainingRoutes);
app.use('/catalogs', catalogRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

