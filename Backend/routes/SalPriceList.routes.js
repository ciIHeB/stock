const express = require('express');
const router = express.Router();
const {createPriceList, updatePriceList,getPriceListById,getPriceLists,deletePriceList} = require('../controller/SalPriceListController');
const verifyToken = require("../middlewares/verifyToken");


router.post('/',verifyToken,createPriceList);
router.get('/',verifyToken,getPriceLists);
router.get('/:ItemID',verifyToken, getPriceListById);
router.put('/:ItemID', verifyToken, updatePriceList);
router.delete('/:id', verifyToken, deletePriceList);
module.exports = router;
