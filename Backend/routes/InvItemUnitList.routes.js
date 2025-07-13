const express = require('express');
const router = express.Router();
const {createItemUnitList,
    updateItemUnitList,
    getItemUnistLists,getItemUnitListById,
    deleteItemUnitList} = require('../controller/InvItemUnitListController');
const verifyToken = require("../middlewares/verifyToken");


router.post('/',createItemUnitList);
router.get('/',getItemUnistLists);
router.get('/:id', getItemUnitListById);
router.put('/:id', verifyToken,updateItemUnitList);
router.delete('/:id',verifyToken, deleteItemUnitList);

module.exports = router;
