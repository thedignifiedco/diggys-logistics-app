import { Schema } from 'express-validator';

export const orderCreationSchema: Schema = {
    product: {
        in: ['body'],
        isString: true,
        errorMessage: 'Product is required and should be a string',
    },
    quantity: {
        in: ['body'],
        isInt: true,
        toInt: true,
        errorMessage: 'Quantity is required and should be an integer',
    },
    source: {
        in: ['body'],
        isString: true,
        errorMessage: 'Source is required and should be a string',
    },
    destination: {
        in: ['body'],
        isString: true,
        errorMessage: 'Destination is required and should be a string',
    },
    status: {
        in: ['body'],
        isString: true,
        errorMessage: 'Status is required and should be a string',
    },
};

export const orderUpdateSchema: Schema = {
    product: {
        in: ['body'],
        optional: true,
        isString: true,
        errorMessage: 'Product should be a string',
    },
    quantity: {
        in: ['body'],
        optional: true,
        isInt: true,
        toInt: true,
        errorMessage: 'Quantity should be an integer',
    },
    source: {
        in: ['body'],
        optional: true,
        isString: true,
        errorMessage: 'Source should be a string',
    },
    destination: {
        in: ['body'],
        optional: true,
        isString: true,
        errorMessage: 'Destination should be a string',
    },
    status: {
        in: ['body'],
        optional: true,
        isString: true,
        errorMessage: 'Status should be a string',
    },
};
