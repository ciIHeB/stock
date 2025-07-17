const express = require('express');
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const {getStock} = require('../controller/invStoreTransactionController');

router.get('/:storeId/:itemId',verifyToken,getStock);

module.exports = router;
