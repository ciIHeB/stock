const express = require('express');
const router = express.Router();
const {createItemStatus,updateItemStatus,getItemStatus,getItemStatusById,deleteItemStatus} = require('../controller/InvItemStatusController');
const verifyToken = require("../middlewares/verifyToken");


router.post('/',verifyToken,createItemStatus);
router.get('/',getItemStatus);
router.get('/:id', getItemStatusById);
router.put('/:id', verifyToken,updateItemStatus);
router.delete('/:id',verifyToken, deleteItemStatus);

module.exports = router;
