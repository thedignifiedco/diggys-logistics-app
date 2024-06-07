import express from 'express';
import { createOrderHandler, getOrderByIdHandler, updateOrderHandler, deleteOrderHandler, getAllOrdersHandler } from '../controllers/orderController';
import validateSchema from '../middlewares/validateSchema';
import { orderSchema } from '../schemas/orderSchema';
import { updateOrderSchema } from '../schemas/updateOrderSchema';

const router = express.Router();

// Route to create a new order
router.post('/orders', validateSchema(orderSchema), createOrderHandler);

// Route to get all orders
router.get('/orders', getAllOrdersHandler);

// Route to get, update, or delete a specific order by ID
router.route('/orders/:id')
  .get(getOrderByIdHandler)
  .put(validateSchema(updateOrderSchema), updateOrderHandler)
  .delete(deleteOrderHandler);

export default router;
