import { Router } from 'express';
import {
  createConsignmentController,
  updateConsignmentController,
  addEventToConsignmentController,
  getConsignmentEventsController,
  getAllConsignmentsController,
  deleteConsignmentController,
  getConsignmentByIdController,
  getMostRecentEventController,
} from '../controllers/consignmentController';

const router = Router();

/**
 * @swagger
 * /api/consignments:
 *   post:
 *     summary: Create a new consignment
 *     tags: [Consignments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Consignment'
 *     responses:
 *       201:
 *         description: Consignment created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Consignment'
 */
router.post('/consignments', createConsignmentController);

/**
 * @swagger
 * /api/consignments/{id}:
 *   put:
 *     summary: Update an existing consignment
 *     tags: [Consignments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The consignment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Consignment'
 *     responses:
 *       200:
 *         description: Consignment updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Consignment'
 */
router.put('/consignments/:id', updateConsignmentController);

/**
 * @swagger
 * /api/consignments/{id}/events:
 *   post:
 *     summary: Add an event to a consignment
 *     tags: [Consignments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The consignment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Event added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Consignment'
 */
router.post('/consignments/:id/events', addEventToConsignmentController);

/**
 * @swagger
 * /api/consignments/{id}/events:
 *   get:
 *     summary: Get all events for a consignment
 *     tags: [Consignments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The consignment ID
 *     responses:
 *       200:
 *         description: A list of events for the consignment.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 */
router.get('/consignments/:id/events', getConsignmentEventsController);

/**
 * @swagger
 * /api/consignments:
 *   get:
 *     summary: Get all consignments
 *     tags: [Consignments]
 *     responses:
 *       200:
 *         description: A list of consignments.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Consignment'
 */
router.get('/consignments', getAllConsignmentsController);

/**
 * @swagger
 * /api/consignments/{id}:
 *   delete:
 *     summary: Delete a consignment by ID
 *     tags: [Consignments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The consignment ID
 *     responses:
 *       200:
 *         description: Consignment deleted successfully.
 */
router.delete('/consignments/:id', deleteConsignmentController);

/**
 * @swagger
 * /api/consignments/{id}:
 *   get:
 *     summary: Get a consignment by ID
 *     tags: [Consignments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The consignment ID
 *     responses:
 *       200:
 *         description: A consignment object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Consignment'
 */
router.get('/consignments/:id', getConsignmentByIdController);

/**
 * @swagger
 * /api/consignments/{id}/events/recent:
 *   get:
 *     summary: Get the most recent event for a consignment
 *     tags: [Consignments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The consignment ID
 *     responses:
 *       200:
 *         description: The most recent event for the consignment.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 */
router.get('/consignments/:id/events/recent', getMostRecentEventController);

export default router;
