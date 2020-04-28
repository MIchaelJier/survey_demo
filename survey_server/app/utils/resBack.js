const resBack = {
    sussess: function(res, data, word = '操作成功') {
        res.json({
            statusCode: res.statusCode,
            code: word,
            status: true,
            data,
        });
    },
    fail: function(res, err, word = '操作失败') {
        res.json({
            statusCode: res.statusCode,
            code: word,
            status: false,
            data: err,
        });
    },
    auto: function(res, data, err) {
        res.json({
            statusCode: res.statusCode,
            code: err ? arguments[4] || '操作失败': arguments[3] || '操作成功',
            status: data && true,
            data: err ? err : data,
        });
    },
};

module.exports = { resBack };