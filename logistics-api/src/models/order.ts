import mongoose, { Document, Schema } from 'mongoose';

export interface OrderDocument extends Document {
  product: string;
  quantity: number;
  source: string;
  destination: string;
  status: string;
}

const orderSchema = new Schema({
  product: { type: String, required: true },
  quantity: { type: Number, required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  status: { type: String, required: true }
});

const Order = mongoose.model<OrderDocument>('Order', orderSchema);

export default Order;
