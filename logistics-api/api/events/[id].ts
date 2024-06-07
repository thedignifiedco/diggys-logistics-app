import { VercelRequest, VercelResponse } from '@vercel/node';
import dbConnect from '../../src/utils/dbConnect';
import { getEventsByOrderId, getLastEventByOrderId } from '../../src/services/eventService';
import Cors from 'cors';

// Initialize the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
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
  const { last } = req.query;

  if (req.method === 'GET') {
    if (last === 'true') {
      const event = await getLastEventByOrderId(id as string);
      res.status(200).json(event);
    } else {
      const events = await getEventsByOrderId(id as string);
      res.status(200).json(events);
    }
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
