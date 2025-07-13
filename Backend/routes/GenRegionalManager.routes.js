const express = require('express');
const router = express.Router();
const {createRegionalManager,
    updateRegionalManager,
    getRegionalManagers,getRegionalManagerById,
    deleteRegionalManager} = require('../controller/GenRegionalManagerController');
const verifyToken = require("../middlewares/verifyToken");


router.post('/',verifyToken,createRegionalManager);
router.get('/',getRegionalManagers);
router.get('/:id', getRegionalManagerById);
router.put('/:id', verifyToken,updateRegionalManager);
router.delete('/:id',verifyToken, deleteRegionalManager);

module.exports = router;
