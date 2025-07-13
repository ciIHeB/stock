const express = require('express');
const router = express.Router();
const {createBranch,getBranchById,getBranches,updateBranch,deleteBranch} = require('../controller/BranchController');
const verifyToken = require("../middlewares/verifyToken");


router.post('/',createBranch);
router.get('/',getBranches);
router.get('/:id', getBranchById);
router.put('/:id', updateBranch);
router.delete('/:id',verifyToken, deleteBranch);

module.exports = router;
