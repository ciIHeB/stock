const express = require('express');
const router = express.Router();
const {createItemCategory3,updateItemCategory3,getItemCategories3,getItemCategory3ById,deleteItemCategory3} = require('../controller/InvItemCategory3Controller');
const verifyToken = require("../middlewares/verifyToken");


router.post('/',verifyToken,createItemCategory3);
router.get('/',getItemCategories3);
router.get('/:id', getItemCategory3ById);
router.put('/:id', verifyToken,updateItemCategory3);
router.delete('/:id',verifyToken, deleteItemCategory3);

module.exports = router;
