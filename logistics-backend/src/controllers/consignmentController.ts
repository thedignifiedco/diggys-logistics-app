import { Request, Response } from 'express';
import Consignment, { IConsignment } from '../models/consignment';

// Create a consignment
export const createConsignmentController = async (req: Request, res: Response) => {
  try {
    const consignment: IConsignment = new Consignment(req.body);
    const savedConsignment = await consignment.save();
    res.status(201).json(savedConsignment);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create consignment', error });
  }
};

// Update a consignment
export const updateConsignmentController = async (req: Request, res: Response) => {
  try {
    const updatedConsignment = await Consignment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedConsignment) {
      return res.status(404).json({ message: 'Consignment not found' });
    }
    res.json(updatedConsignment);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update consignment', error });
  }
};

// Add an event to a consignment
export const addEventToConsignmentController = async (req: Request, res: Response) => {
  try {
    const consignment = await Consignment.findById(req.params.id);
    if (!consignment) {
      return res.status(404).json({ message: 'Consignment not found' });
    }
    consignment.events.push(req.body);
    await consignment.save();
    res.json(consignment);
  } catch (error) {
    res.status(400).json({ message: 'Failed to add event', error });
  }
};

// Get all events of a consignment
export const getConsignmentEventsController = async (req: Request, res: Response) => {
  try {
    const consignment = await Consignment.findById(req.params.id);
    if (!consignment) {
      return res.status(404).json({ message: 'Consignment not found' });
    }
    res.json(consignment.events);
  } catch (error) {
    res.status(400).json({ message: 'Failed to get consignment events', error });
  }
};

// Get all consignments
export const getAllConsignmentsController = async (_req: Request, res: Response) => {
  try {
    const consignments = await Consignment.find();
    res.json(consignments);
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch consignments', error });
  }
};

// Delete a consignment
export const deleteConsignmentController = async (req: Request, res: Response) => {
  try {
    const deletedConsignment = await Consignment.findByIdAndDelete(req.params.id);
    if (!deletedConsignment) {
      return res.status(404).json({ message: 'Consignment not found' });
    }
    res.json({ message: 'Consignment deleted successfully', _id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete consignment', error });
  }
};

// Get a consignment by ID
export const getConsignmentByIdController = async (req: Request, res: Response) => {
  try {
    const consignment = await Consignment.findById(req.params.id);
    if (!consignment) {
      return res.status(404).json({ message: 'Consignment not found' });
    }
    res.json(consignment);
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch consignment', error });
  }
};

// Get the most recent event of a consignment
export const getMostRecentEventController = async (req: Request, res: Response) => {
  try {
    const consignment = await Consignment.findById(req.params.id);
    if (!consignment) {
      return res.status(404).json({ message: 'Consignment not found' });
    }
    const recentEvent = consignment.events[consignment.events.length - 1];
    res.json(recentEvent);
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch recent event', error });
  }
};
