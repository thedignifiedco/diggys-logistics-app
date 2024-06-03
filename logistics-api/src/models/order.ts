import { Schema, model, Document } from 'mongoose';

interface OrderDocument extends Document {
    product: string;
    quantity: number;
    source: string;
    destination: string;
    status: string;
}

const orderSchema = new Schema<OrderDocument>({
    product: { type: String, required: true },
    quantity: { type: Number, required: true },
    source: { type: String, required: true },
    destination: { type: String, required: true },
    status: { type: String, required: true },
});

export default model<OrderDocument>('Order', orderSchema);
