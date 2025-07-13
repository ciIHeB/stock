const express = require('express');
const router = express.Router();
const {createPaymentMethod,
    updatePaymentMethod,
    getPaymentMethods,getPaymentMethodById,
    deletePaymentMethod} = require('../controller/GenPaymentMethodController');
const verifyToken = require("../middlewares/verifyToken");


router.post('/',verifyToken,createPaymentMethod);
router.get('/',getPaymentMethods);
router.get('/:id', getPaymentMethodById);
router.put('/:id', verifyToken,updatePaymentMethod);
router.delete('/:id',verifyToken, deletePaymentMethod);

module.exports = router;
