const express = require('express');
const router = express.Router();
const {createItemCategory,updateItemCategory,getItemCategories,getItemCategoryById,deleteItemCategory} = require('../controller/InvItemCategoryController');
const verifyToken = require("../middlewares/verifyToken");


router.post('/',verifyToken,createItemCategory);
router.get('/',getItemCategories);
router.get('/:id', getItemCategoryById);
router.put('/:id', verifyToken,updateItemCategory);
router.delete('/:id',verifyToken, deleteItemCategory);

module.exports = router;
