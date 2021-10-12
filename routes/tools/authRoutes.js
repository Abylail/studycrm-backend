var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const { errors } = require('../../helpers/standart');

// LOGIN
router.get('/login', async function (req, res){
    const { username, password } = req.query;
    if (!(username && password)) res.status(errors.auth.code).json(errors.auth);

    const user = await User.findOne({ where: { username, password }, include: ["role"] });
    if (!user) res.status(errors.auth.code).json(errors.auth);

    const token = jwt.sign(
        { user_id: user.id , username},
        process.env.TOKEN_KEY,
        {  expiresIn: "24h", }
    );

    res.cookie("access_token", "Bearer " + token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })

    res.json({
        info: user,
        access_token: "Bearer " + token
    });
})

// CHECK TOKEN
router.get('/check', async function (req, res){
    const sendError = () => {
        res.status(errors.auth.code).json(errors.auth);
        return null;
    }

    const token = req.cookies["access_token"]?.split(" ")?.[1] || req.headers["access_token"]?.replace(/%20/g, " ").split(" ")?.[1] || null;
    if (!token) sendError();

    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    if (Date.now() <= decodedToken.iat*1000) sendError();

    res.json({ data: decodedToken });
})

// router.get('/refresh', async function (){
//
// })
//
router.get('/logout', async function (req, res){
    res.clearCookie("access_token");
    res.status(200).json({ status: "ok" });
})

module.exports = router;