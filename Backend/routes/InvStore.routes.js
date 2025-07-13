const express = require('express');
const router = express.Router();
const {createStore,
    updateStore,
    getStores,getStoreById,
    deleteStore,
    getAvailableQuantity} = require('../controller/InvStoreController'); // Added getAvailableQuantity
const verifyToken = require("../middlewares/verifyToken");


router.post('/',verifyToken,createStore);
router.get('/',getStores);
router.get('/quantity', verifyToken, getAvailableQuantity); // Added route for getAvailableQuantity
router.get('/:id', getStoreById);
router.put('/:id', verifyToken,updateStore);
router.delete('/:id',verifyToken, deleteStore);

module.exports = router;
