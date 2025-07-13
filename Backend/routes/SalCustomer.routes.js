const express = require('express');
const router = express.Router();
const {createCustomer,
    updateCustomer,
    getCustomers,getCustomerById,
    deleteCustomer} = require('../controller/SalCustomerController');
const verifyToken = require("../middlewares/verifyToken");


router.post('/',verifyToken,createCustomer);
router.get('/',getCustomers);
router.get('/:id', getCustomerById);
router.put('/:id', verifyToken,updateCustomer);
router.delete('/:id',verifyToken, deleteCustomer);

module.exports = router;
