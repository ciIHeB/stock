const express = require('express');
const router = express.Router();
const {createCustomerCluster,
    updateCustomerCluster,
    getCustomerClusters,getCustomerClusterById,
    deleteCustomerCluster} = require('../controller/SalCustomerClusterController');
const verifyToken = require("../middlewares/verifyToken");


router.post('/',verifyToken,createCustomerCluster);
router.get('/',getCustomerClusters);
router.get('/:id', getCustomerClusterById);
router.put('/:id', verifyToken,updateCustomerCluster);
router.delete('/:id',verifyToken, deleteCustomerCluster);

module.exports = router;
