const express = require('express');
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const {createUnload} = require('../controller/invBOStoreUnloadController'); // Changed to Unload

router.post('/',verifyToken,createUnload); // Changed to createUnload


module.exports = router;