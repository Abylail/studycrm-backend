var express = require('express');
var router = express.Router();

const ModelController = require('../../controllers/ModelController');

router.get('/role/list', async function (req, res){
    const result = await ModelController.role.list();
    res.json(result);
});

module.exports = router;