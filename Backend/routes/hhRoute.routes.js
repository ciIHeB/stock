const express = require('express');
const router = express.Router();
const {createRoute,
    updateRoute,
    getRoutes,getRouteById,
    deleteRoute} = require('../controller/hhRouteController');
const verifyToken = require("../middlewares/verifyToken");


router.post('/',verifyToken,createRoute);
router.get('/',getRoutes);
router.get('/:id', getRouteById);
router.put('/:id', verifyToken,updateRoute);
router.delete('/:id',verifyToken, deleteRoute);

module.exports = router;
