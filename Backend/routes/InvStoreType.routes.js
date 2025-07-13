const express = require('express');
const router = express.Router();
const {createStoreType,
    updateStoreType,
    getStoreTypes,getStoreTypeById,
    deleteStoreType} = require('../controller/InvStoreTypeController');
const verifyToken = require("../middlewares/verifyToken");


router.post('/',verifyToken,createStoreType);
router.get('/',getStoreTypes);
router.get('/:id', getStoreTypeById);
router.put('/:id', verifyToken,updateStoreType);
router.delete('/:id',verifyToken, deleteStoreType);

module.exports = router;
