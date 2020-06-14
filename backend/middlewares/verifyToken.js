const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

    const token = req.signedCookies.jwt;
    const info = req.cookies.jwt2;
    if (!token || !info) return res.status(401).send('Access Denied').end();

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        return res.status(401).json({"message": "Token expired"});
    }
}
