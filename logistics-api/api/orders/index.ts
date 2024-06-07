import { VercelRequest, VercelResponse } from '@vercel/node';
import dbConnect from '../../src/utils/dbConnect';
import { createOrder, getAllOrders } from '../../src/services/orderService';
import Cors from 'cors';

// Initialize the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD', 'POST'],
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

  if (req.method === 'POST') {
    const order = await createOrder(req.body);
    res.status(201).json(order);
  } else if (req.method === 'GET') {
    const orders = await getAllOrders();
    res.status(200).json(orders);
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
