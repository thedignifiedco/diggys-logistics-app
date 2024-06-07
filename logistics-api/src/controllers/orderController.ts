import { Request, Response } from 'express';
import { getOrderById, createOrder, updateOrder, deleteOrder, getAllOrders } from '../services/orderService';
import dbConnect from '../utils/dbConnect';

// Connect to the database before performing any operations
dbConnect();

// Function to create a new order
export const createOrderHandler = async (req: Request, res: Response) => {
  try {
    const order = await createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to get all orders
export const getAllOrdersHandler = async (req: Request, res: Response) => {
  try {
    const orders = await getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to get order by ID
export const getOrderByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const order = await getOrderById(id);
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
    } else {
      res.status(200).json(order);
    }
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to update order by ID
export const updateOrderHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedOrder = await updateOrder(id, req.body);
    if (!updatedOrder) {
      res.status(404).json({ error: 'Order not found' });
    } else {
      res.status(200).json(updatedOrder);
    }
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to delete order by ID
export const deleteOrderHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedOrder = await deleteOrder(id);
    if (!deletedOrder) {
      res.status(404).json({ error: 'Order not found' });
    } else {
      res.status(204).end();
    }
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
