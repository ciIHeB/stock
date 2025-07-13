const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {getCompanies,getCompanyById,createCompany,updateCompany,deleteCompany} = require('../controller/CompanyController');
const verifyToken = require("../middlewares/verifyToken");


// Set up the storage engine for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/company_logos/'); // specify the directory to store images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // generate a unique filename
  }
});

// Initialize upload variable with the storage engine
const upload = multer({
  storage: storage,
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

router.post('/', upload.single('logo'), createCompany);
router.get('/', getCompanies);
router.get('/:id', getCompanyById);
router.put('/:id', updateCompany);
router.delete('/:id', verifyToken,deleteCompany);

module.exports = router;
