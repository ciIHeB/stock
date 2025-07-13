const express = require('express');
const router = express.Router();
const {createItemUnit,
    updateItemUnit,
    getItemUnists,getItemUnitById,
    deleteItemUnit} = require('../controller/InvItemUnitController');
const verifyToken = require("../middlewares/verifyToken");


router.post('/',verifyToken,createItemUnit);
router.get('/',getItemUnists);
router.get('/:id', getItemUnitById);
router.put('/:id', verifyToken,updateItemUnit);
router.delete('/:id',verifyToken, deleteItemUnit);

module.exports = router;
