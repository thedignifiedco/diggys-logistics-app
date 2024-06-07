import { body } from 'express-validator';

export const orderSchema = [
  body('product').isString().withMessage('Product is required'),
  body('quantity').isInt({ gt: 0 }).withMessage('Quantity must be a positive integer'),
  body('source').isString().withMessage('Source is required'),
  body('destination').isString().withMessage('Destination is required'),
  body('status').isString().withMessage('Status is required')
];
