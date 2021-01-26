const express = require('express');
const mailController = require('../controllers/mailController/mail');
const router = express.Router();

router.post('/', mailController);

module.exports = router;
