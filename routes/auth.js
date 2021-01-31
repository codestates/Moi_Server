const express = require('express');
const authController = require('../controllers/authController');
const jwtMiddleware = require('../lib/jwtMiddleware');

const router = express.Router();

router.post('/google', authController.google);
router.post('/kakao', authController.kakao);
router.post('/github', authController.github);
router.post('/signout', jwtMiddleware, authController.signOut);
router.post('/withdrawal', jwtMiddleware, authController.withdrawal);
router.get('/isauth', jwtMiddleware, authController.isAuth);

module.exports = router;
