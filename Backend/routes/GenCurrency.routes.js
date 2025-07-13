const express = require('express');
const router = express.Router();
const {createCurrency,
    updateCurrency,
    getCurrencys,getCurrencyById,
    deleteCurrency} = require('../controller/GenCurrencyController');
const verifyToken = require("../middlewares/verifyToken");


router.post('/',verifyToken,createCurrency);
router.get('/',getCurrencys);
router.get('/:id', getCurrencyById);
router.put('/:id', verifyToken,updateCurrency);
router.delete('/:id',verifyToken, deleteCurrency);

module.exports = router;
