const router = require("express").Router();
const { createUser,deleteUser,getUserById,getUsers,updateUser } = require("../controller/UserController");
const verifyToken = require("../middlewares/verifyToken");

router.post('/',createUser);
router.get('/',getUsers);
router.get('/:id',verifyToken, getUserById);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);

module.exports = router;