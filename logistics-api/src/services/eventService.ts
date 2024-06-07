import Event, { EventDocument } from '../models/event';

export const createEvent = async (data: any): Promise<EventDocument> => {
    const event = new Event(data);
    await event.save();
    return event;
};

export const getEventsByOrderId = async (orderId: string): Promise<EventDocument[]> => {
    return await Event.find({ orderId }).sort({ timestamp: 1 });
};

export const getLastEventByOrderId = async (orderId: string): Promise<EventDocument | null> => {
    return await Event.findOne({ orderId }).sort({ timestamp: -1 });
};
