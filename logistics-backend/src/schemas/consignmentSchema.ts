export const consignmentSchema = {
  type: 'object',
  properties: {
    consignmentId: { type: 'string' },
    product: { type: 'string' },
    quantity: { type: 'number' },
    source: { type: 'string' },
    destination: { type: 'string' },
    status: { type: 'string', enum: ['Processing', 'Packaging', 'Dispatched', 'Delivered', 'Cancelled', 'Recalled'] },
    events: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          timestamp: { type: 'string', format: 'date-time' },
          description: { type: 'string' },
          location: { type: 'string' },
          custodian: { type: 'string' }
        },
        required: ['description', 'location', 'custodian']
      }
    }
  },
  required: ['consignmentId', 'product', 'quantity', 'source', 'destination', 'status']
};
