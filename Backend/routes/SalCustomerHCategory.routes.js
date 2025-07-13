const express = require('express');
const router = express.Router();
const {createCustomerHCategory,
    updateCustomerHCategory,
    getCustomerHCategories,getCustomerHCategoryById,
    deleteCustomerHCategory} = require('../controller/SalCustomerHCategoryController');
const verifyToken = require("../middlewares/verifyToken");


router.post('/',verifyToken,createCustomerHCategory);
router.get('/',getCustomerHCategories);
router.get('/:id', getCustomerHCategoryById);
router.put('/:id', verifyToken,updateCustomerHCategory);
router.delete('/:id',verifyToken, deleteCustomerHCategory);

module.exports = router;
