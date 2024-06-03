import { Request, Response } from 'express';
import { createOrder, updateOrder, getOrderEvents, getOrderById } from '../services/orderService';

export const createNewOrder = async (req: Request, res: Response) => {
    try {
        const order = await createOrder(req.body);
        res.status(201).json(order);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
};

export const updateOrderDetails = async (req: Request, res: Response) => {
    try {
        const { orderId } = req.params;
        const updatedOrder = await updateOrder(orderId, req.body);
        res.status(200).json(updatedOrder);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
};

export const getOrderEventsDetails = async (req: Request, res: Response) => {
    try {
        const { orderId } = req.params;
        const { last } = req.query;
        const order = await getOrderById(orderId);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        const events = await getOrderEvents(orderId, last === 'true');
        res.status(200).json({ order, events });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
};
