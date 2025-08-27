import { z } from "zod";

// Common validation patterns
const emailStringSchema = z.string().email("Invalid email format");
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    "Password must contain at least one lowercase letter, one uppercase letter, and one number",
  );

const phoneSchema = z
  .string()
  .regex(/^\+?[\d\s\-\(\)]+$/, "Invalid phone number format")
  .optional();

// User registration validation
export const createUserSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be less than 100 characters")
    .regex(/^[a-zA-Z\s]+$/, "Full name can only contain letters and spaces"),
  email: emailStringSchema,
  phone: phoneSchema,
  password: passwordSchema,
});

// User login validation
export const loginSchema = z.object({
  email: emailStringSchema,
  password: z.string().min(1, "Password is required"),
});

// User profile update validation
export const updateUserSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be less than 100 characters")
    .regex(/^[a-zA-Z\s]+$/, "Full name can only contain letters and spaces")
    .optional(),
  email: emailStringSchema.optional(),
  phone: phoneSchema,
  password: passwordSchema.optional(),
});

// User ID validation
export const userIdSchema = z.object({
  id: z.number().int().positive("User ID must be a positive integer"),
});

// Email validation
export const emailSchema = z.object({
  email: emailStringSchema,
});

// Pagination validation
export const paginationSchema = z.object({
  page: z.number().int().min(1, "Page must be at least 1").default(1),
  limit: z
    .number()
    .int()
    .min(1, "Limit must be at least 1")
    .max(100, "Limit cannot exceed 100")
    .default(10),
});

// Search validation
export const searchSchema = z.object({
  query: z
    .string()
    .min(1, "Search query is required")
    .max(100, "Search query too long"),
  ...paginationSchema.shape,
});

// Export types for use in services
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type UserIdInput = z.infer<typeof userIdSchema>;
export type EmailInput = z.infer<typeof emailSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
export type SearchInput = z.infer<typeof searchSchema>;
