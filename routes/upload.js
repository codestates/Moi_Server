const express = require('express');
const uploadController = require('../controllers/uploadController/imageUpload');
const deleteImage = require('../controllers/uploadController/deleteImage');
const { upload } = require('../lib/multerMiddleware');

const router = express.Router();

router.post('/image', upload.single('profileImage'), uploadController);
router.post('/delete', deleteImage);

module.exports = router;
