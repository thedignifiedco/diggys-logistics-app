import Order, { OrderDocument } from '../models/order';

export const createOrder = async (data: any): Promise<OrderDocument> => {
  const order = new Order(data);
  await order.save();
  return order;
};

export const updateOrder = async (orderId: string, data: any): Promise<OrderDocument | null> => {
  const updatedOrder = await Order.findByIdAndUpdate(orderId, data, { new: true });
  if (!updatedOrder) {
    throw new Error('Order not found');
  }
  return updatedOrder;
};

export const getOrderById = async (orderId: string): Promise<OrderDocument | null> => {
  return await Order.findById(orderId);
};

export const getAllOrders = async (): Promise<OrderDocument[]> => {
  return await Order.find();
};

export const deleteOrder = async (orderId: string): Promise<OrderDocument | null> => {
  return await Order.findByIdAndDelete(orderId);
};
