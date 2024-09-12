import mongoose, { Schema, Document } from 'mongoose';

interface IEvent extends Document {
  description: string;
  location: string;
  custodian: string;
  timestamp: Date;
}

interface IConsignment extends Document {
  product: string;
  quantity: number;
  source: string;
  destination: string;
  status: 'Processing' | 'Packaging' | 'Dispatched' | 'Delivered' | 'Cancelled' | 'Recalled';
  events: IEvent[];
}

const EventSchema: Schema = new Schema({
  description: { type: String, required: true },
  location: { type: String, required: true },
  custodian: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const ConsignmentSchema: Schema = new Schema({
  product: { type: String, required: true },
  quantity: { type: Number, required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  status: { type: String, enum: ['Processing', 'Packaging', 'Dispatched', 'Delivered', 'Cancelled', 'Recalled'], required: true },
  events: { type: [EventSchema], default: [] }
});

const Consignment = mongoose.model<IConsignment>('Consignment', ConsignmentSchema);

export default Consignment;
export { IConsignment, IEvent };
