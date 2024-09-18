import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import consignmentRoutes from './routes/consignmentRoutes';
import csurf from 'csurf';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

// Middleware for parsing cookies (required for CSRF token)
app.use(cookieParser());

// Determine CORS origin based on the environment
const corsOrigin = process.env.NODE_ENV === 'production' ? process.env.PROD_CORS_ORIGIN : process.env.DEV_CORS_ORIGIN;

app.use(cors({
  origin: corsOrigin,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));
app.use(express.json());

// CSRF protection middleware
const csrfProtection = csurf({ cookie: true }); // CSRF token will be stored in a cookie

// CSRF Token Route
app.get('/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Swagger configuration
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Diggys Logistics API',
      version: '1.0.0',
      description: 'REST API for Diggys Logistics'
    },
    servers: [
      {
        url: 'http://localhost:8080'
      }
    ]
  },
  apis: ['./src/routes/*.ts', './src/schemas/consignmentSchema.ts']
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Consignment routes
app.use('/api', consignmentRoutes);

const PORT = process.env.PORT || 8080;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

connectToDatabase().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

module.exports = app;