/**
 * @swagger
 * components:
 *   schemas:
 *     Consignment:
 *       type: object
 *       required:
 *         - consignmentId
 *         - product
 *         - quantity
 *         - source
 *         - destination
 *         - status
 *       properties:
 *         consignmentId:
 *           type: string
 *           description: Unique identifier for the consignment.
 *         product:
 *           type: string
 *           description: Name of the product being shipped.
 *         quantity:
 *           type: number
 *           description: The quantity of the product being shipped.
 *         source:
 *           type: string
 *           description: The source location of the consignment.
 *         destination:
 *           type: string
 *           description: The destination location of the consignment.
 *         status:
 *           type: string
 *           description: The current status of the consignment.
 *           enum: [Processing, Packaging, Dispatched, Delivered, Cancelled, Recalled]
 *         events:
 *           type: array
 *           description: A list of events associated with the consignment.
 *           items:
 *             $ref: '#/components/schemas/Event'
 *
 *     Event:
 *       type: object
 *       required:
 *         - description
 *         - location
 *         - custodian
 *       properties:
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: The time the event occurred.
 *         description:
 *           type: string
 *           description: A description of the event.
 *         location:
 *           type: string
 *           description: The location where the event took place.
 *         custodian:
 *           type: string
 *           description: The person responsible for the consignment at the event's location.
 */
