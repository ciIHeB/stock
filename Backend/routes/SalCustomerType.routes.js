const express = require('express');
const router = express.Router();
const {createCustomerType,
    updateCustomerType,
    getCustomerTypes,getCustomerTypeById,
    deleteCustomerType} = require('../controller/SalCustomerTypeController');
const verifyToken = require("../middlewares/verifyToken");


router.post('/',verifyToken,createCustomerType);
router.get('/',getCustomerTypes);
router.get('/:id', getCustomerTypeById);
router.put('/:id', verifyToken,updateCustomerType);
router.delete('/:id',verifyToken, deleteCustomerType);

module.exports = router;
