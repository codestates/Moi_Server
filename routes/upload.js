const express = require('express');
const uploadController = require('../controllers/uploadController/imageUpload');

const router = express.Router();

router.post('/image', uploadController);

module.exports = router;
