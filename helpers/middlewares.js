const jwt = require('jsonwebtoken');
const { errors } = require('../helpers/standart');

function auth(req, res, next) {
    const sendError = () => {
        res.status(errors.auth.code).json(errors.auth);
        return null;
    }

    const token = req.headers["access_token"]?.replace(/%20/g, " ").split(" ")[1] || null;
    if (!token) sendError();

    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    if (Date.now() <= decodedToken.iat*1000) sendError();

    next();
}

module.exports = {
    auth
}