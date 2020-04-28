const nodemailer = require('nodemailer');

// 定义邮件服务器服
const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    service: 'qq',
    secure: true,
    // 我们需要登录到网页邮箱中，然后配置SMTP和POP3服务器的密码
    auth: {
        user: '908430737@qq.com',
        pass: 'rjxwlaytpoznbfdc',
    },
});

module.exports = {
    transporter,
};