import { Router } from 'express';
import {
  createConsignmentController,
  updateConsignmentController,
  addEventToConsignmentController,
  getConsignmentEventsController,
  getAllConsignmentsController,
  deleteConsignmentController,
  getConsignmentByIdController,
  getMostRecentEventController,
} from '../controllers/consignmentController';

const router = Router();

router.post('/consignments', createConsignmentController);
router.put('/consignments/:id', updateConsignmentController);
router.post('/consignments/:id/events', addEventToConsignmentController);
router.get('/consignments/:id/events', getConsignmentEventsController);
router.get('/consignments', getAllConsignmentsController);
router.delete('/consignments/:id', deleteConsignmentController);
router.get('/consignments/:id', getConsignmentByIdController);
router.get('/consignments/:id/events/recent', getMostRecentEventController);

export default router;
