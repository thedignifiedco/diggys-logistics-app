import { Request, Response } from 'express';
import { addEvent, getEvents } from '../services/eventService';

export const createNewEvent = async (req: Request, res: Response) => {
    try {
        const { orderId } = req.params;
        const event = await addEvent(orderId, req.body);
        res.status(201).json(event);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
};

export const getOrderEvents = async (req: Request, res: Response) => {
    try {
        const { orderId } = req.params;
        const { last } = req.query;
        const events = await getEvents(orderId, last === 'true');
        res.status(200).json(events);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
};
