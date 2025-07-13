const express = require('express');
const router = express.Router();
const {createUser,
    updateUser,
    getUsers,getUserById,
    deleteUser} = require('../controller/hhUserController');
const verifyToken = require("../middlewares/verifyToken");


// router.post('/',verifyToken,createUser);
router.get('/',verifyToken,getUsers);
router.get('/:id',verifyToken,getUserById);
router.put('/:id', verifyToken,updateUser);
router.delete('/:id',verifyToken, deleteUser);

module.exports = router;
