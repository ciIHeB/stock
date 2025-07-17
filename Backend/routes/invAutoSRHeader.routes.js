const express = require('express');
const router = express.Router();
const {createAutoSRHeader,updateAutoload,getAutoSRHeaders,getAutoSRHeaderById,getAutoLoadsRequests,deleteAutoSRHeader
,getAutoSRDetails} = require('../controller/invAutoSRHeaderController');

const verifyToken = require('../middlewares/verifyToken');

router.post('/', verifyToken, createAutoSRHeader);
router.get('/', verifyToken, getAutoSRHeaders);
router.get('/getAutoLoadsRequests', verifyToken, getAutoLoadsRequests);
router.get('/details/:SRNumber', verifyToken, getAutoSRDetails);
router.get('/:id', verifyToken, getAutoSRHeaderById);
router.put('/:SRNumber', verifyToken, updateAutoload);
router.delete('/:id', verifyToken, deleteAutoSRHeader);

module.exports = router;
