const express = require('express');
const router = express.Router();
const {createItemCategory2,updateItemCategory2,getItemCategories2,getItemCategory2ById,deleteItemCategory2} = require('../controller/InvItemCategory2Controller');
const verifyToken = require("../middlewares/verifyToken");


router.post('/',verifyToken,createItemCategory2);
router.get('/',getItemCategories2);
router.get('/:id', getItemCategory2ById);
router.put('/:id', verifyToken,updateItemCategory2);
router.delete('/:id',verifyToken, deleteItemCategory2);

module.exports = router;
