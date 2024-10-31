const nodemailer = require('nodemailer');

// Настройка почтового транспорта
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'tankacav@gmail.com',
        pass: 'nbma fjng nlfg jsof'
    }
});

module.exports = transporter; 