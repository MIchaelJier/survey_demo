const Model = require('../model');
const { resBack } = require('../../utils/resBack');
const { UsersList } = Model;
const { transporter } = require('../mailBase');

const usersListControl = {
  // 登录 POST
  login(req, res) {
    const userEmail = req.body.email;

    UsersList
    .findOne({ email: userEmail })
    .exec((err, data) => {
        if (data ? data.password === req.body.password : false) {
            const { _id, email } = data;

            resBack.sussess(res, {_id, email}, '登录成功');
        } else {
            resBack.fail(res, null, '密码或邮箱不正确');
        }
    });
  },
  // 注册 POST
  register(req, res) {
    const requestBody = req.body;

    // 获取随机4位数密码
    requestBody.password = (~~(Math.random() * 10000)).toString().padStart(4, '0');
    const newUser = new UsersList(requestBody);
    // 邮件格式
    const mailOptions = {
            from: '908430737@qq.com',
            to: requestBody.email,  
            subject: `我们已经收到了您（${requestBody.email}）的注册请求`,
            html: `您的密码: ${requestBody.password}, 请务必妥善保管`,
        };

    UsersList
    .findOne({ email: newUser.email })
    .exec((err, data) => {
        if (data !== null) {
            res.json({
                statusCode: res.statusCode,
                code: '该邮箱已注册',
                status: false,
            });
        } else { 
            // eslint-disable-next-line no-unused-vars
            newUser.save((err, data) => {
                // 发送带有密码的邮件
                transporter.sendMail(mailOptions, function (innerErr, info) {
                    resBack.auto(res, info, innerErr || err, '注册成功');
                });
            });
        }
    });
  },
};

module.exports = usersListControl;
