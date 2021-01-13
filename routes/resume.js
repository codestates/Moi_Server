const express = require('express');
const resumeController = require('../controllers/resumeController');

const router = express.Router();

router.post('/save', resumeController.save);
router.patch('/edit', resumeController.edit);
router.delete('/delete', resumeController.delete);
router.get('/list/:resumeId', resumeController.list);

module.exports = router;
