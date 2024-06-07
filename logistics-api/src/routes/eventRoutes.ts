import express from 'express';
import { createEventHandler, getEventsByOrderIdHandler, getLastEventByOrderIdHandler } from '../controllers/eventController';
import validateSchema from '../middlewares/validateSchema';
import { eventSchema } from '../schemas/eventSchema';

const router = express.Router();

// Route to create a new event
router.post('/events', validateSchema(eventSchema), createEventHandler);

// Route to get all events for a specific order
router.get('/events/:id', getEventsByOrderIdHandler);

// Route to get the last event for a specific order
router.get('/events/:id/last', getLastEventByOrderIdHandler);

export default router;
