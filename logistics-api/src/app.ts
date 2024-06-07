import express from 'express';
import cors from 'cors';
import orderRoutes from './routes/orderRoutes';
import eventRoutes from './routes/eventRoutes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', orderRoutes);
app.use('/api', eventRoutes);

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app;
