import { Request, Response, NextFunction } from 'express';
import { validationResult, Schema, checkSchema } from 'express-validator';

export const validateSchema = (schema: Schema): Array<(req: Request, res: Response, next: NextFunction) => void> => {
    return [
        ...checkSchema(schema),
        (req: Request, res: Response, next: NextFunction) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        },
    ];
};
