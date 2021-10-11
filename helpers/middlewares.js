const jwt = require('jsonwebtoken');
const User = require('../models/User');

function auth(req, res, next) {
    console.log("AUTH", req.headers['access_token'])
    next();
}

module.exports = {
    auth
}