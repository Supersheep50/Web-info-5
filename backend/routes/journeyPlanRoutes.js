const express = require('express');
const router = express.Router();
const journeyPlanController = require('../controllers/journeyPlanController');
const authenticate = require('../middleware/authenticate');

router.use(authenticate); // All routes protected

router.get('/', journeyPlanController.getAllJourneyPlans);
router.post('/', journeyPlanController.createJourneyPlan);
router.put('/:id', journeyPlanController.updateJourneyPlan);
router.delete('/:id', journeyPlanController.deleteJourneyPlan);

module.exports = router;
