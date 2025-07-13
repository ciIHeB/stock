const express = require('express');
const router = express.Router();
const {createPaymentTerm,
    updatePaymentTerm,
    getPaymentTerms,getPaymentTermById,
    deletePaymentTerm} = require('../controller/GenPaymentTermController');
const verifyToken = require("../middlewares/verifyToken");


router.post('/',verifyToken,createPaymentTerm);
router.get('/',getPaymentTerms);
router.get('/:id', getPaymentTermById);
router.put('/:id', verifyToken,updatePaymentTerm);
router.delete('/:id',verifyToken, deletePaymentTerm);

module.exports = router;
