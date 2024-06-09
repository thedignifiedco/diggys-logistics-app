import { Order } from '../models/order';

export const createOrder = async (orderData: any) => {
  const order = new Order(orderData);
  return await order.save();
};

export const updateOrder = async (id: string, updateData: any) => {
  return await Order.findByIdAndUpdate(id, updateData, { new: true });
};

export const addEventToOrder = async (id: string, event: any) => {
  const order = await Order.findById(id);
  if (order) {
    order.events.push(event);
    return await order.save();
  }
  throw new Error('Order not found');
};

export const getOrderEvents = async (id: string) => {
  const order = await Order.findById(id);
  if (order) {
    return order.events;
  }
  throw new Error('Order not found');
};

export const getAllOrders = async () => {
  return await Order.find({}, '_id status');
};

export const deleteOrder = async (id: string) => {
  return await Order.findByIdAndDelete(id);
};

export const getOrderById = async (id: string) => {
  return await Order.findById(id);
};

export const getMostRecentEvent = async (id: string) => {
  const order = await Order.findById(id);
  if (order && order.events.length > 0) {
    return order.events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0];
  }
  throw new Error('Order not found or no events available');
};
