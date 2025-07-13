const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {createItem, updateItem,getItemById,getItems,deleteItem} = require('../controller/InvItemController');
// Importing from invBOStoreUnloadController for getAvailableItemQuantity
const { getAvailableItemQuantity } = require('../controller/invBOStoreUnloadController');
const verifyToken = require("../middlewares/verifyToken");

// Set up the storage engine for multer
// Using memoryStorage to process file conditionally in controller
const storage = multer.memoryStorage();
  
  // Initialize upload variable with the storage engine
  const upload = multer({
    storage: storage, // Using memoryStorage
    limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB limit
    fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png/;
      const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
      const mimeType = fileTypes.test(file.mimetype);
      if (extname && mimeType) {
        return cb(null, true);
      } else {
        cb('Error: Images Only!');
      }
    }
  });

router.post('/', upload.single('ItemImage'), verifyToken, createItem);
router.get('/',verifyToken,getItems);
router.get('/:id',verifyToken, getItemById);
router.put('/:id', upload.single('ItemImage'), verifyToken, updateItem); // Added upload.single('ItemImage')
router.delete('/:id',verifyToken, deleteItem);

// Route to get available quantity for an item in a specific store
router.get('/store/:storeId/item/:itemId/available-quantity', verifyToken, getAvailableItemQuantity);

module.exports = router;

