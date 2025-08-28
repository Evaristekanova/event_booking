import { z } from "zod";

// Event creation validation
export const createEventSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must be less than 200 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9] (AM|PM)$/, "Invalid time format (HH:MM AM/PM)"),
  location: z
    .string()
    .min(5, "Location must be at least 5 characters")
    .max(200, "Location must be less than 200 characters"),
  capacity: z.number().int().min(1, "Capacity must be at least 1"),
  price: z.number().min(0, "Price cannot be negative"),
  category: z
    .string()
    .min(2, "Category must be at least 2 characters")
    .max(50, "Category must be less than 50 characters"),
  imageUrl: z.string().url("Invalid image URL").optional(),
});

// Event update validation
export const updateEventSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must be less than 200 characters")
    .optional(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters")
    .optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)").optional(),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9] (AM|PM)$/, "Invalid time format (HH:MM AM/PM)").optional(),
  location: z
    .string()
    .min(5, "Location must be at least 5 characters")
    .max(200, "Location must be less than 200 characters")
    .optional(),
  capacity: z.number().int().min(1, "Capacity must be at least 1").optional(),
  price: z.number().min(0, "Price cannot be negative").optional(),
  status: z.enum(["UPCOMING", "ONGOING", "COMPLETED", "CANCELLED"]).optional(),
  category: z
    .string()
    .min(2, "Category must be at least 2 characters")
    .max(50, "Category must be less than 50 characters")
    .optional(),
  imageUrl: z.string().url("Invalid image URL").optional(),
});

// Event filters validation
export const eventFiltersSchema = z.object({
  search: z.string().optional(),
  status: z.enum(["all", "UPCOMING", "ONGOING", "COMPLETED", "CANCELLED"]).optional(),
  category: z.string().optional(),
  dateFrom: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format").optional(),
  dateTo: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format").optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  ...paginationSchema.shape,
});

// Event ID validation
export const eventIdSchema = z.object({
  id: z.string().min(1, "Event ID is required"),
});

// Import pagination schema
import { paginationSchema } from "./userValidation";

// Export types
export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;
export type EventFiltersInput = z.infer<typeof eventFiltersSchema>;
export type EventIdInput = z.infer<typeof eventIdSchema>;
