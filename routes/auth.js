const express = require('express');
const authController = require('../controllers/authController');
const jwtMiddleware = require('../lib/jwtMiddleware');

const router = express.Router();

router.post('/social', authController.social);
router.post('/google', authController.google);
router.post('/facebook', authController.facebook);
router.post('/signout', jwtMiddleware, authController.signOut);
router.post('/withdrawal', jwtMiddleware, authController.withdrawal);
router.get('/isauth', jwtMiddleware, authController.isAuth);

module.exports = router;
