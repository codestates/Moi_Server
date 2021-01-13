const express = require('express');

const router = express.Router();

router.get('/google');
router.get('/google/callback');
router.get('/facebook');
router.get('/facebook/callback');
router.get('/github');
router.get('/github/callback');
router.post('/signout');
router.post('/withdrawal');
router.get('/isauth');

module.exports = router;
