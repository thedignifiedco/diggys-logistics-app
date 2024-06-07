import { VercelRequest, VercelResponse } from '@vercel/node';
import dbConnect from '../../src/utils/dbConnect';
import { getOrderById, updateOrder, deleteOrder } from '../../src/services/orderService';
import Cors from 'cors';

// Initialize the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD', 'PUT', 'DELETE'],
  origin: '*', // Adjust this to specify allowed origins
});

// Helper method to wait for a middleware to execute before continuing
function runMiddleware(req: VercelRequest, res: VercelResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await runMiddleware(req, res, cors);
  await dbConnect();
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const order = await getOrderById(id as string);
      if (!order) {
        res.status(404).json({ error: 'Order not found' });
      } else {
        res.status(200).json(order);
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'PUT') {
    try {
      const updatedOrder = await updateOrder(id as string, req.body);
      if (!updatedOrder) {
        res.status(404).json({ error: 'Order not found' });
      } else {
        res.status(200).json(updatedOrder);
      }
    } catch (error) {
      console.error('Error updating order:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const deletedOrder = await deleteOrder(id as string);
    } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
