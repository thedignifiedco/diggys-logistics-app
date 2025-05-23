import Consignment, { IConsignment, IEvent } from '../models/consignment';

// Create a consignment
export const createConsignment = async (
  consignmentData: IConsignment
): Promise<IConsignment> => {
  // Ensure ownerId, teamId, orgId are passed in
  if (!consignmentData.ownerId || !consignmentData.teamId || !consignmentData.orgId) {
    throw new Error('Missing required access control fields');
  }

  const consignment = new Consignment(consignmentData);
  return await consignment.save();
};

// Update a consignment
export const updateConsignment = async (id: string, consignmentData: Partial<IConsignment>): Promise<IConsignment | null> => {
  return await Consignment.findByIdAndUpdate(id, consignmentData, { new: true });
};

// Add an event to a consignment
export const addEventToConsignment = async (id: string, eventData: IEvent): Promise<IConsignment | null> => {
  const consignment = await Consignment.findById(id);
  if (!consignment) {
    return null;
  }
  consignment.events.push(eventData);
  await consignment.save();
  return consignment;
};

// Get all events of a consignment
export const getConsignmentEvents = async (id: string): Promise<IEvent[] | null> => {
  const consignment = await Consignment.findById(id);
  return consignment ? consignment.events : null;
};

// Get all consignments with ABAC filtering
export const getAllConsignments = async (
  user: any
): Promise<IConsignment[]> => {
  const userId = user.sub;
  const teamId = user.metadata?.teamId;
  const orgId = user.tenantId;

  let filter = {};

  if (user.roles.includes('SeniorManager')) {
    filter = { orgId };
  } else if (user.roles.includes('Manager')) {
    filter = { $or: [{ teamId }, { ownerId: userId }] };
  } else {
    filter = { ownerId: userId };
  }

  return await Consignment.find(filter);
};

// Delete a consignment
export const deleteConsignment = async (id: string): Promise<IConsignment | null> => {
  return await Consignment.findByIdAndDelete(id);
};

// Get a consignment by ID
export const getConsignmentById = async (id: string): Promise<IConsignment | null> => {
  return await Consignment.findById(id);
};

// Get the most recent event of a consignment
export const getMostRecentEvent = async (id: string): Promise<IEvent | null> => {
  const consignment = await Consignment.findById(id);
  if (!consignment || consignment.events.length === 0) {
    return null;
  }
  return consignment.events[consignment.events.length - 1];
};
