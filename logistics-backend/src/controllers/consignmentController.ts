import { Request, Response } from 'express';
import {
  createConsignment,
  updateConsignment,
  addEventToConsignment,
  getConsignmentEvents,
  getAllConsignments,
  deleteConsignment,
  getConsignmentById,
  getMostRecentEvent
} from '../services/consignmentService';
import { IConsignment } from '../models/consignment';

// ABAC helper
function authorizeConsignment(user: any, consignment: IConsignment) {
  const userId = user.sub;
  const userTeamId = user.metadata?.teamId;
  const userOrgId = user.tenantId;

  if (user.roles.includes('SeniorManager')) {
    return consignment.orgId === userOrgId;
  } else if (user.roles.includes('Manager')) {
    return consignment.teamId === userTeamId || consignment.ownerId === userId;
  } else if (user.roles.includes('IC')) {
    return consignment.ownerId === userId;
  }
  return false;
}

// Create a consignment
export const createConsignmentController = async (req: Request, res: Response) => {
  try {
    const user = req.user!;
    const consignmentData = {
      ...req.body,
      ownerId: user.sub,
      teamId: user.metadata?.teamId,
      orgId: user.tenantId
    };

    console.log('Creating consignment with:', consignmentData);

    const consignment = await createConsignment(consignmentData as IConsignment);
    res.status(201).json(consignment);
  } catch (error: any) {
    console.error('❌ Consignment creation error:', error?.message);
    console.error(error?.stack);
    res.status(400).json({
      message: 'Failed to create consignment',
      error: error?.message || 'Unknown error'
    });
  }
};

// Update a consignment
export const updateConsignmentController = async (req: Request, res: Response) => {
  try {
    const existing = await getConsignmentById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Consignment not found' });

    if (!authorizeConsignment(req.user!, existing)) return res.status(403).json({ message: 'Forbidden' });

    const updated = await updateConsignment(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update consignment', error });
  }
};

// Add an event to a consignment
export const addEventToConsignmentController = async (req: Request, res: Response) => {
  try {
    const existing = await getConsignmentById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Consignment not found' });

    if (!authorizeConsignment(req.user!, existing)) return res.status(403).json({ message: 'Forbidden' });

    const updated = await addEventToConsignment(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Failed to add event', error });
  }
};

// Get all events of a consignment
export const getConsignmentEventsController = async (req: Request, res: Response) => {
  try {
    const consignment = await getConsignmentById(req.params.id);
    if (!consignment) return res.status(404).json({ message: 'Consignment not found' });

    if (!authorizeConsignment(req.user!, consignment)) return res.status(403).json({ message: 'Forbidden' });

    const events = await getConsignmentEvents(req.params.id);
    res.json(events);
  } catch (error) {
    res.status(400).json({ message: 'Failed to get consignment events', error });
  }
};

// Get all consignments (with ABAC filtering inside the service)
export const getAllConsignmentsController = async (req: Request, res: Response) => {
  try {
    const consignments = await getAllConsignments(req.user!);
    res.json(consignments);
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch consignments', error });
  }
};

// Delete a consignment
export const deleteConsignmentController = async (req: Request, res: Response) => {
  try {
    const consignment = await getConsignmentById(req.params.id);
    if (!consignment) return res.status(404).json({ message: 'Consignment not found' });

    if (!authorizeConsignment(req.user!, consignment)) return res.status(403).json({ message: 'Forbidden' });

    await deleteConsignment(req.params.id);
    res.json({ message: 'Consignment deleted successfully', _id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete consignment', error });
  }
};

// Get a consignment by ID
export const getConsignmentByIdController = async (req: Request, res: Response) => {
  try {
    const consignment = await getConsignmentById(req.params.id);
    if (!consignment) return res.status(404).json({ message: 'Consignment not found' });

    if (!authorizeConsignment(req.user!, consignment)) return res.status(403).json({ message: 'Forbidden' });

    res.json(consignment);
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch consignment', error });
  }
};

// Get the most recent event of a consignment
export const getMostRecentEventController = async (req: Request, res: Response) => {
  try {
    const consignment = await getConsignmentById(req.params.id);
    if (!consignment) return res.status(404).json({ message: 'Consignment not found' });

    if (!authorizeConsignment(req.user!, consignment)) return res.status(403).json({ message: 'Forbidden' });

    const event = await getMostRecentEvent(req.params.id);
    res.json(event);
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch recent event', error });
  }
};
