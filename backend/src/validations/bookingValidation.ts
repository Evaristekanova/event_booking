import { z } from "zod";

// Booking creation validation
export const createBookingSchema = z.object({
  eventId: z.string().min(1, "Event ID is required"),
  ticketType: z
    .string()
    .min(2, "Ticket type must be at least 2 characters")
    .max(50, "Ticket type must be less than 50 characters"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
  totalAmount: z.number().min(0, "Total amount cannot be negative"),
});

// Booking update validation
export const updateBookingSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"]).optional(),
});

// Booking filters validation
export const bookingFiltersSchema = z.object({
  search: z.string().optional(),
  status: z
    .enum(["all", "PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"])
    .optional(),
  dateFrom: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")
    .optional(),
  dateTo: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")
    .optional(),
  minAmount: z.number().min(0).optional(),
  maxAmount: z.number().min(0).optional(),
  ...paginationSchema.shape,
});

// Booking ID validation
export const bookingIdSchema = z.object({
  id: z.string().min(1, "Booking ID is required"),
});

// Import pagination schema
import { paginationSchema } from "./userValidation";

// Export types
export type CreateBookingInput = z.infer<typeof createBookingSchema>;
export type UpdateBookingInput = z.infer<typeof updateBookingSchema>;
export type BookingFiltersInput = z.infer<typeof bookingFiltersSchema>;
export type BookingIdInput = z.infer<typeof bookingIdSchema>;
