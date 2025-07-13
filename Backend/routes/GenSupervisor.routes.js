const express = require('express');
const router = express.Router();
const {createSupervisor,
    updateSupervisor,
    getSupervisors,getSupervisorById,
    deleteSupervisor} = require('../controller/GenSupervisorController');
const verifyToken = require("../middlewares/verifyToken");


router.post('/',verifyToken,createSupervisor);
router.get('/',getSupervisors);
router.get('/:id', getSupervisorById);
router.put('/:id', verifyToken,updateSupervisor);
router.delete('/:id',verifyToken, deleteSupervisor);

module.exports = router;
