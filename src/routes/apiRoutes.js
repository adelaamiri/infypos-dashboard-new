const express = require('express');
const apiController = require('../controllers/apiController');

const router = express.Router();

router.get('/dashboard', apiController.getSnapshot);
router.post('/dashboard', apiController.saveSnapshot);
router.get('/project', apiController.getProject);
router.post('/project', apiController.saveProject);
router.get('/records/:collection', apiController.listRecords);
router.post('/records/:collection', apiController.createRecord);
router.put('/records/:collection/:index', apiController.updateRecord);
router.delete('/records/:collection/:index', apiController.deleteRecord);

module.exports = router;
