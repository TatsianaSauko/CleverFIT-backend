const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Загружаем переменные окружения из .env файла

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI); // Используем переменную окружения
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Better throw an error instead
    }
};

module.exports = connectDB;