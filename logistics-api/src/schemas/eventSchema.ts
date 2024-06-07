import { body } from 'express-validator';

export const eventSchema = [
  body('orderId').isMongoId().withMessage('Order ID is required and must be a valid MongoDB ID'),
  body('location').isString().withMessage('Location is required'),
  body('custodian').isString().withMessage('Custodian is required'),
  body('timestamp').isISO8601().toDate().withMessage('Timestamp is required and must be a valid date')
];
