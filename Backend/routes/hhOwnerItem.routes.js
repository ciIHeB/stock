const express = require('express');
const router = express.Router();
const {createOwnerItem,
    updateOwnerItem,
    getOwnerItems,getOwnerItemById,
    deleteOwnerItem} = require('../controller/hhOwnerItemController');
const verifyToken = require("../middlewares/verifyToken");


router.post('/',verifyToken,createOwnerItem);
router.get('/',getOwnerItems);
router.get('/:id', getOwnerItemById);
router.put('/:id', verifyToken,updateOwnerItem);
router.delete('/:id',verifyToken, deleteOwnerItem);

module.exports = router;
