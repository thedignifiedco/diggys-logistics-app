import { Request, Response } from 'express';
import { createOrder, updateOrder, addEventToOrder, getOrderEvents, getAllOrders, deleteOrder, getOrderById, getMostRecentEvent } from '../services/orderService';

export const createOrderController = async (req: Request, res: Response) => {
  try {
    const order = await createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const updateOrderController = async (req: Request, res: Response) => {
  try {
    const order = await updateOrder(req.params.id, req.body);
    res.status(200).json(order);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const addEventToOrderController = async (req: Request, res: Response) => {
  try {
    const order = await addEventToOrder(req.params.id, req.body);
    res.status(200).json(order);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const getOrderEventsController = async (req: Request, res: Response) => {
  try {
    const events = await getOrderEvents(req.params.id);
    res.status(200).json(events);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const getAllOrdersController = async (req: Request, res: Response) => {
  try {
    const orders = await getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const deleteOrderController = async (req: Request, res: Response) => {
  try {
    const order = await deleteOrder(req.params.id);
    if (order) {
      res.status(200).json({ message: 'Order deleted successfully' });
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const getOrderByIdController = async (req: Request, res: Response) => {
  try {
    const order = await getOrderById(req.params.id);
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const getMostRecentEventController = async (req: Request, res: Response) => {
  try {
    const event = await getMostRecentEvent(req.params.id);
    res.status(200).json(event);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};
