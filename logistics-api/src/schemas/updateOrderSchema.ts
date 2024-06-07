import { body } from 'express-validator';

export const updateOrderSchema = [
  body('product').optional().isString().withMessage('Product must be a string'),
  body('quantity').optional().isInt({ gt: 0 }).withMessage('Quantity must be a positive integer'),
  body('source').optional().isString().withMessage('Source must be a string'),
  body('destination').optional().isString().withMessage('Destination must be a string'),
  body('status').optional().isString().withMessage('Status must be a string')
];
