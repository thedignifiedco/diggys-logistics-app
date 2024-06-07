import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import orderRoutes from '../src/routes/orderRoutes';
import eventRoutes from '../src/routes/eventRoutes';
import dbConnect from '../src/utils/dbConnect';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

dbConnect();

app.use('/api/orders', orderRoutes);
app.use('/api/events', eventRoutes);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export default app;
