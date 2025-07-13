const express = require('express');
const router = express.Router();
const {createGeo,
    updateGeo,
    getGeos,getGeoById,
    deleteGeo} = require('../controller/SalGeoController');
const verifyToken = require("../middlewares/verifyToken");


router.post('/',verifyToken,createGeo);
router.get('/',getGeos);
router.get('/:id', getGeoById);
router.put('/:id', verifyToken,updateGeo);
router.delete('/:id',verifyToken, deleteGeo);

module.exports = router;
