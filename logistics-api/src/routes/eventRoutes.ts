import { Router } from 'express';
import { createNewEvent, getOrderEvents } from '../controllers/eventController';
import { validateSchema } from '../middlewares/validateSchema';
import { eventSchema } from '../schemas/eventSchema';

const router = Router();

router.post('/orders/:orderId/events', validateSchema(eventSchema), createNewEvent);
router.get('/orders/:orderId/events', getOrderEvents);

export default router;
