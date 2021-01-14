const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/social', authController.social);
router.post('/signout', authController.signOut);
router.post('/withdrawal', authController.withdrawal);
router.get('/isauth', authController.isAuth);

module.exports = router;
