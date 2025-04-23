const express = require('express');
const router = express.Router();
const travelLogController = require('../controllers/travelLogController');
const authenticate = require('../middleware/authenticate');

router.use(authenticate); 

router.get('/', travelLogController.getAllTravelLogs);
router.post('/', travelLogController.createTravelLog);
router.put('/:id', travelLogController.updateTravelLog);
router.delete('/:id', travelLogController.deleteTravelLog);

module.exports = router;
