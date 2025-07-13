const express = require('express');
const router = express.Router();
const {createSalesManager,
    updateSalesManager,
    getSalesManagers,getSalesManagerById,
    deleteSalesManager} = require('../controller/GenSalesManagerController');
const verifyToken = require("../middlewares/verifyToken");


router.post('/',verifyToken,createSalesManager);
router.get('/',getSalesManagers);
router.get('/:id', getSalesManagerById);
router.put('/:id', verifyToken,updateSalesManager);
router.delete('/:id',verifyToken, deleteSalesManager);

module.exports = router;
