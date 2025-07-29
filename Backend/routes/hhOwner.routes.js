const express = require('express');
const router = express.Router();
const {createOwner,
    updateOwner,
    getOwners,getOwnerById,getOwnerByUserId,
    deleteOwner} = require('../controller/hhOwnerController');
const verifyToken = require("../middlewares/verifyToken");


router.post('/',verifyToken,createOwner);
router.get('/',getOwners);
router.get('/user/:userId', getOwnerByUserId);
router.get('/:id', getOwnerById);
router.put('/:id', verifyToken,updateOwner);
router.delete('/:id',verifyToken, deleteOwner);

module.exports = router;


