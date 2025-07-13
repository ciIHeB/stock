const express = require('express');
const router = express.Router();
const {createAutoSRHeader,updateAutoSRHeader,getAutoSRHeaders,getAutoSRHeaderById,getAutoLoadsRequests,deleteAutoSRHeader
} = require('../controller/invAutoSRHeaderController');

const verifyToken = require('../middlewares/verifyToken');

router.post('/', verifyToken, createAutoSRHeader);
router.get('/', verifyToken, getAutoSRHeaders);
router.get('/getAutoLoadsRequests', verifyToken, getAutoLoadsRequests);
router.get('/:id', verifyToken, getAutoSRHeaderById);
router.put('/:id', verifyToken, updateAutoSRHeader);
router.delete('/:id', verifyToken, deleteAutoSRHeader);

module.exports = router;
