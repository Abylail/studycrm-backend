var express = require('express');
var router = express.Router();

const { auth } = require('../../helpers/middlewares');

const UserController = require('../../controllers/UserController');

router.get('/list', auth, async function (req, res){
    const result = await UserController.list();
    res.json(result);
})

module.exports = router;