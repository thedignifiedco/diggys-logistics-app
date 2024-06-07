import { Request, Response } from 'express';
import { createEvent, getEventsByOrderId, getLastEventByOrderId } from '../services/eventService';
import dbConnect from '../utils/dbConnect';

// Connect to the database before performing any operations
dbConnect();

// Function to create a new event
export const createEventHandler = async (req: Request, res: Response) => {
    try {
        const event = await createEvent(req.body);
        res.status(201).json(event);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Function to get all events for a specific order
export const getEventsByOrderIdHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const events = await getEventsByOrderId(id);
        res.status(200).json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Function to get the last event for a specific order
export const getLastEventByOrderIdHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const event = await getLastEventByOrderId(id);
        res.status(200).json(event);
    } catch (error) {
        console.error('Error fetching the last event:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
