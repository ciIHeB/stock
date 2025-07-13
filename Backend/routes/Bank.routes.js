const express = require('express');
const router = express.Router();
const path = require('path');
const verifyToken = require("../middlewares/verifyToken");

const {getBankById, getBanks, createBank,deleteBank,updateBank} = require('../controller/BankController');



router.post('/', createBank);
router.get('/', getBanks);
router.get('/:id', getBankById);
router.put('/:id', updateBank);
router.delete('/:id', verifyToken,deleteBank);

module.exports = router;
