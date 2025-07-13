const express = require('express');
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const {createLoad} = require('../controller/invBOStoreLoadController');

router.post('/',verifyToken,createLoad);


module.exports = router;