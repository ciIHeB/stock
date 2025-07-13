const express = require('express');
const router = express.Router();
const {createCustomerClass,
    updateCustomerClass,
    getCustomerClasss,getCustomerClassById,
    deleteCustomerClass} = require('../controller/SalCustomerClassController');
const verifyToken = require("../middlewares/verifyToken");


router.post('/',verifyToken,createCustomerClass);
router.get('/',getCustomerClasss);
router.get('/:id', getCustomerClassById);
router.put('/:id', verifyToken,updateCustomerClass);
router.delete('/:id',verifyToken, deleteCustomerClass);

module.exports = router;
