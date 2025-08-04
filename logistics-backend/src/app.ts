import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import consignmentRoutes from './routes/consignmentRoutes';
import csurf from 'csurf';
import cookieParser from 'cookie-parser';
import { FronteggContext, withAuthentication } from '@frontegg/client';

// Load environment variables based on environment
// Check if we're in development mode (either NODE_ENV is 'development' or not set in dev environment)
const isDevelopment = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined;

if (isDevelopment) {
  // In development, load .env.local first, then .env as fallback
  dotenv.config({ path: '.env.local' });
} else {
  // In production, load .env file
  dotenv.config();
}

const app = express();

// Initialize FronteggContext
FronteggContext.init({
  FRONTEGG_CLIENT_ID: process.env.FRONTEGG_CLIENT_ID!,
  FRONTEGG_API_KEY: process.env.FRONTEGG_API_KEY!,
});

// Middleware for parsing cookies (required for CSRF token)
app.use(cookieParser());

// Determine CORS origin based on environment
const corsOrigin =
  process.env.NODE_ENV === 'production'
    ? process.env.PROD_CORS_ORIGIN
    : process.env.DEV_CORS_ORIGIN;

app.use(cors({
  origin: corsOrigin,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use(express.json());

// CSRF protection middleware
const csrfProtection = csurf({ cookie: true });

app.get('/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Swagger documentation setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Diggys Logistics API',
      version: '1.0.0',
      description: 'REST API for Diggys Logistics',
    },
    servers: [
      {
        url: 'http://localhost:8080',
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/schemas/consignmentSchema.ts'],
};

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Secure API routes with Frontegg authentication
app.use('/api',
  withAuthentication(), // authenticate first
  (req, res, next) => { // then inject user info
    if (req.frontegg?.user) {
      req.user = req.frontegg.user;
      req.userId = req.frontegg.user.sub;
      req.userTeamId = req.frontegg.user.metadata?.teamId ?? undefined;
      req.userOrgId = req.frontegg.user.tenantId;
    }
    next();
  },
  consignmentRoutes // then route to controller
);

const PORT = process.env.PORT || 8080;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

connectToDatabase().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});

export default app;
