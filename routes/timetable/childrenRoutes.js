var express = require('express');
var router = express.Router();

const ChildController = require('../../controllers/ChildController');

/* LIST */
router.get('/list', async function (req, res){
    const result = await ChildController.list();
    res.json(result);
});

/* INFO ( by ID ) */
router.get('/info/:id', async function (req, res){
    const result = await ChildController.info(req.params.id);
    res.json(result);
})

/* ADD */
router.post('/add', async function (req, res){
    const result = await ChildController.add(req.body);
    res.json(result);
})

/* EDIT ( by ID ) */
router.put('/edit/:id', async function (req, res){
    const result = await ChildController.edit(req.params.id, req.body);
    res.json(result);
})

/* REMOVE ( by ID )*/
router.delete('/delete/:id', async function (req, res){
    const result = await ChildController.remove(req.params.id);
    res.json(result);
})

module.exports = router;