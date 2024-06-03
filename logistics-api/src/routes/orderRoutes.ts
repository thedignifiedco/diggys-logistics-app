import { Router } from 'express';
import { createNewOrder, updateOrderDetails, getOrderEventsDetails } from '../controllers/orderController';
import { validateSchema } from '../middlewares/validateSchema';
import { orderCreationSchema, orderUpdateSchema } from '../schemas/orderSchema';

const router = Router();

router.post('/orders', validateSchema(orderCreationSchema), createNewOrder);
router.put('/orders/:orderId', validateSchema(orderUpdateSchema), updateOrderDetails);
router.get('/orders/:orderId/events', getOrderEventsDetails);

export default router;
