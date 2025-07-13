const express = require('express');
const router = express.Router();
const {createAreaManager,
    updateAreaManager,
    getAreaManagers,getAreaManagerById,
    deleteAreaManager} = require('../controller/GenAreaManagerController');
const verifyToken = require("../middlewares/verifyToken");


router.post('/',verifyToken,createAreaManager);
router.get('/',getAreaManagers);
router.get('/:id', getAreaManagerById);
router.put('/:id', verifyToken,updateAreaManager);
router.delete('/:id',verifyToken, deleteAreaManager);

module.exports = router;
