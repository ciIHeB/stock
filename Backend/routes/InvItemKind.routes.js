const express = require('express');
const router = express.Router();
const {createItemKind, updateItemKind,getItemKindById,getItemKinds,deleteItemKind} = require('../controller/InvItemKindController');
const verifyToken = require("../middlewares/verifyToken");


router.post('/',verifyToken,createItemKind);
router.get('/',getItemKinds);
router.get('/:id', getItemKindById);
router.put('/:id', verifyToken,updateItemKind);
router.delete('/:id',verifyToken, deleteItemKind);

module.exports = router;
