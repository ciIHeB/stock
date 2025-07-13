const router = require("express").Router();
const {createUserGroup,getUserGroups,getUserGroupById,updateUserGroup,deleteUserGroup,} = require("../controller/SecUserGroupController");
const verifyToken = require("../middlewares/verifyToken");

router.post('/',verifyToken,createUserGroup);
router.get('/',verifyToken,getUserGroups);
router.get('/:id',verifyToken, getUserGroupById);
router.put('/:id', verifyToken, updateUserGroup);
router.delete('/:id', verifyToken, deleteUserGroup);

module.exports = router;
