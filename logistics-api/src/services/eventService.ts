import Event from '../models/event';
import Order from '../models/order';

export const addEvent = async (orderId: string, data: any) => {
    const order = await Order.findById(orderId);
    if (!order) {
        throw new Error('Order not found');
    }

    const event = new Event({ ...data, orderId });
    await event.save();
    return event;
};

export const getEvents = async (orderId: string, lastOnly: boolean = false) => {
    const events = await Event.find({ orderId }).sort({ timestamp: lastOnly ? -1 : 1 });
    if (!events || events.length === 0) {
        throw new Error('No events found for the specified order');
    }
    return lastOnly ? events[0] : events;
};
