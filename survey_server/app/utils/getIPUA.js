exports.getIPUA = req => {
    const ip = req.ip;
    const domain = req.headers['referer'];
    const onlyId = ip + domain + req.headers['user-agent'];

    return onlyId;
};