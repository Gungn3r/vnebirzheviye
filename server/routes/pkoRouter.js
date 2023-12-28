const express = require('express');
const upload = require('../middleware/multer'); // Middleware multer
const PKOController = require('../controllers/pkoController');

const router = express.Router();

// Маршрут для загрузки файлов
router.post('/upload', upload.fields([{ name: 'doc_1' }, { name: 'doc_2' }, { name: 'doc_3' }, { name: 'doc_4' }, { name: 'doc_5' }, { name: 'doc_6' }, { name: 'doc_7' }]), PKOController.uploadFiles);

module.exports = router;
