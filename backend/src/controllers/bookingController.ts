import { Request, Response } from "express";
import { 
  createBooking, 
  getBookingById, 
  getUserBookings, 
  getAllBookings, 
  updateBooking, 
  cancelBooking,
  getBookingStats 
} from "../services/bookingService";
import { CreateBookingInput, UpdateBookingInput } from "../validations/bookingValidation";

export const createNewBooking = async (req: Request, res: Response) => {
  try {
    const bookingData: CreateBookingInput = req.body;
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const booking = await createBooking(bookingData, userId);

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to create booking",
    });
  }
};

export const getBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const booking = await getBookingById(id);

    res.status(200).json({
      success: true,
      message: "Booking retrieved successfully",
      data: booking,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error instanceof Error ? error.message : "Booking not found",
    });
  }
};

export const getUserBookingsHandler = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const result = await getUserBookings(userId);

    res.status(200).json({
      success: true,
      message: "User bookings retrieved successfully",
      data: result.bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to get user bookings",
    });
  }
};

export const getBookings = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await getAllBookings(page, limit);

    res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: result.bookings,
      pagination: result.pagination,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to get bookings",
    });
  }
};

export const updateBookingById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData: UpdateBookingInput = req.body;
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const booking = await updateBooking(id, updateData, userId);

    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: booking,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to update booking",
    });
  }
};

export const cancelBookingById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const booking = await cancelBooking(id, userId);

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      data: booking,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to cancel booking",
    });
  }
};

export const getBookingsStats = async (req: Request, res: Response) => {
  try {
    const stats = await getBookingStats();

    res.status(200).json({
      success: true,
      message: "Booking statistics retrieved successfully",
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to get booking statistics",
    });
  }
};
