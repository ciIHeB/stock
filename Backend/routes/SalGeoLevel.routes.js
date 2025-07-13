const express = require('express');
const router = express.Router();
const {createGeoLevel,
    updateGeoLevel,
    getGeoLevels,getGeoLevelById,
    deleteGeoLevel} = require('../controller/SalGeoLevelController');
const verifyToken = require("../middlewares/verifyToken");


router.post('/',verifyToken,createGeoLevel);
router.get('/',getGeoLevels);
router.get('/:id', getGeoLevelById);
router.put('/:id', verifyToken,updateGeoLevel);
router.delete('/:id',verifyToken, deleteGeoLevel);

module.exports = router;
