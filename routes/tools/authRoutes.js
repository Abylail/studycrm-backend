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
    const token = req.cookies["access_token"]?.split(" ")?.[1] || req.headers["access_token"]?.split(" ")?.[1] || null;
    if (!token) res.status(errors.auth.code).json(errors.auth);

    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    const date = Math.floor((Date.now() / 1000) - 30);

    res.json({ info: decodedToken, date: date });
})

// router.get('/refresh', async function (){
//
// })
//
router.get('/logout', async function (){

})

module.exports = router;