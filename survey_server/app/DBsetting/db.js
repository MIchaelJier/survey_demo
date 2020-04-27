const mongoose = require('mongoose'); 

mongoose.connect(
    'mongodb://localhost/survey_base', 
    {useNewUrlParser: true, useUnifiedTopology: true},
    function(err) {
        err ? console.log('Connection Error:' + err) : '';
    }); 
 
var db = mongoose.connection;

db.on('error', function callback() { //监听是否有异常
    console.log('Connection error');
});
db.once('open', function callback() { //监听一次打开
    //在这里创建你的模式和模型
    console.log('connected!');
});

module.exports = mongoose;
