import Order from '../models/order';
import Event from '../models/event';

export const createOrder = async (data: any) => {
    const order = new Order(data);
    await order.save();
    return order;
};

export const updateOrder = async (orderId: string, data: any) => {
    const updatedOrder = await Order.findByIdAndUpdate(orderId, data, { new: true });
    if (!updatedOrder) {
        throw new Error('Order not found');
    }
    return updatedOrder;
};

export const getOrderById = async (orderId: string) => {
    return await Order.findById(orderId);
};

export const getOrderEvents = async (orderId: string, lastOnly: boolean = false) => {
    const events = await Event.find({ orderId }).sort({ timestamp: lastOnly ? -1 : 1 });
    if (!events || events.length === 0) {
        throw new Error('No events found for the specified order');
    }
    return lastOnly ? events[0] : events;
};
