const resBack = {
    sussess: function(res, data) {
        res.json({
            code: res.statusCode,
            status: true,
            data,
        });
    },
    fail: function(res, err) {
        res.json({
            code: res.statusCode,
            status: false,
            data: err,
        });
    },
    auto: function(res, data, err) {
        res.json({
            code: res.statusCode,
            status: data && true,
            data: err ? err : data,
        });
    },
};

module.exports = { resBack };