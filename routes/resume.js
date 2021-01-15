const express = require('express');
const resumeController = require('../controllers/resumeController');
const jwtMiddleware = require('../lib/jwtMiddleware');

const router = express.Router();

router.post('/save', jwtMiddleware, resumeController.save);
router.patch('/edit', jwtMiddleware, resumeController.edit);
router.delete('/delete', jwtMiddleware, resumeController.delete);
router.get('/list', jwtMiddleware, resumeController.list);

module.exports = router;
