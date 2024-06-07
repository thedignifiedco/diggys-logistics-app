import mongoose, { Document, Schema } from 'mongoose';

export interface EventDocument extends Document {
    orderId: mongoose.Types.ObjectId;
    location: string;
    custodian: string;
    timestamp: Date;
}

const eventSchema = new Schema({
    orderId: { type: mongoose.Types.ObjectId, required: true, ref: 'Order' },
    location: { type: String, required: true },
    custodian: { type: String, required: true },
    timestamp: { type: Date, required: true }
});

const Event = mongoose.model<EventDocument>('Event', eventSchema);

export default Event;
