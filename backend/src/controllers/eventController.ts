import { Request, Response } from "express";
import {
  createEvent,
  getEventById,
  getAllEvents,
  updateEvent,
  deleteEvent,
  getEventsByCategory,
  getUpcomingEvents,
} from "../services/eventService";
import {
  CreateEventInput,
  UpdateEventInput,
} from "../validations/eventValidation";

export const createNewEvent = async (req: Request, res: Response) => {
  try {
    const eventData: CreateEventInput = req.body;
    const organizerId = (req as any).user?.id;

    if (!organizerId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const event = await createEvent(eventData, organizerId);

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: event,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to create event",
    });
  }
};

export const getEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const event = await getEventById(id);

    res.status(200).json({
      success: true,
      message: "Event retrieved successfully",
      data: event,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error instanceof Error ? error.message : "Event not found",
    });
  }
};

export const getEvents = async (req: Request, res: Response) => {
  try {
    const result = await getAllEvents();

    res.status(200).json({
      success: true,
      message: "Events retrieved successfully",
      data: result, 
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to get events",
    });
  }
};

export const updateEventById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData: UpdateEventInput = req.body;
    const organizerId = (req as any).user?.id;

    if (!organizerId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const event = await updateEvent(id, updateData, organizerId);

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: event,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to update event",
    });
  }
};

export const removeEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const organizerId = (req as any).user?.id;

    if (!organizerId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const result = await deleteEvent(id, organizerId);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to delete event",
    });
  }
};

export const getEventsByCategoryHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const { category } = req.params;

    const events = await getEventsByCategory(category);

    res.status(200).json({
      success: true,
      message: "Events retrieved successfully",
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to get events by category",
    });
  }
};

export const getUpcomingEventsHandler = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 5;

    const events = await getUpcomingEvents(limit);

    res.status(200).json({
      success: true,
      message: "Upcoming events retrieved successfully",
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to get upcoming events",
    });
  }
};
