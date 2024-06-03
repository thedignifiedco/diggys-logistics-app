import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import orderRoutes from './routes/orderRoutes';
import eventRoutes from './routes/eventRoutes';

const app = express();

const corsOptions = {
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Diggys Logistics API',
            version: '1.0.0',
            description: 'API for tracking and tracing supply chain orders',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['src/routes/*.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api', orderRoutes);
app.use('/api', eventRoutes);

export default app;
