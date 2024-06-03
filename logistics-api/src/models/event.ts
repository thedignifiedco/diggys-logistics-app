import { Schema, model, Document } from 'mongoose';

interface EventDocument extends Document {
    orderId: Schema.Types.ObjectId;
    location: string;
    custodian: string;
    timestamp: Date;
}

const eventSchema = new Schema<EventDocument>({
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    location: { type: String, required: true },
    custodian: { type: String, required: true },
    timestamp: { type: Date, required: true, default: Date.now },
});

export default model<EventDocument>('Event', eventSchema);
