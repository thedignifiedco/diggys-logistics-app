import { Schema } from 'express-validator';

export const eventSchema: Schema = {
    location: {
        in: ['body'],
        isString: true,
        errorMessage: 'Location is required and should be a string',
    },
    custodian: {
        in: ['body'],
        isString: true,
        errorMessage: 'Custodian is required and should be a string',
    },
    timestamp: {
        in: ['body'],
        isISO8601: true,
        toDate: true,
        errorMessage: 'Timestamp is required and should be a valid date',
    },
};
