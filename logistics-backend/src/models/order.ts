import { Schema, model, Document } from 'mongoose';

interface IEvent {
  timestamp: Date;
  description: string;
  location: string;
  custodian: string;
}

interface IOrder extends Document {
  product: string;
  quantity: number;
  source: string;
  destination: string;
  status: string;
  events: IEvent[];
}

const eventSchema = new Schema<IEvent>({
  timestamp: { type: Date, default: Date.now },
  description: { type: String, required: true },
  location: { type: String, required: true },
  custodian: { type: String, required: true }
});

const orderSchema = new Schema<IOrder>({
  product: { type: String, required: true },
  quantity: { type: Number, required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  status: { type: String, required: true, enum: ['Processing', 'Packaging', 'Dispatched', 'Delivered', 'Cancelled', 'Recalled'] },
  events: [eventSchema]
});

export const Order = model<IOrder>('Order', orderSchema);
