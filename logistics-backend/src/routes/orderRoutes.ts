import { Router } from 'express';
import {
  createOrderController,
  updateOrderController,
  addEventToOrderController,
  getOrderEventsController,
  getAllOrdersController,
  deleteOrderController,
  getOrderByIdController,
  getMostRecentEventController
} from '../controllers/orderController';

const router = Router();

router.get('/orders', getAllOrdersController);
router.post('/orders', createOrderController);
router.put('/orders/:id', updateOrderController);
router.get('/orders/:id', getOrderByIdController);
router.delete('/orders/:id', deleteOrderController);
router.post('/orders/:id/events', addEventToOrderController);
router.get('/orders/:id/events', getOrderEventsController);
router.get('/orders/:id/events/recent', getMostRecentEventController);

export default router;
