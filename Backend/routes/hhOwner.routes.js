const express = require('express');
const router = express.Router();
const {createOwner,
    updateOwner,
    getOwners,getOwnerById,
    deleteOwner} = require('../controller/hhOwnerController');
const verifyToken = require("../middlewares/verifyToken");


router.post('/',verifyToken,createOwner);
router.get('/',getOwners);
router.get('/:id', getOwnerById);
router.put('/:id', verifyToken,updateOwner);
router.delete('/:id',verifyToken, deleteOwner);

module.exports = router;
