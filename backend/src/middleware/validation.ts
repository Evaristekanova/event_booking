import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodError, z } from "zod";

// Create a wrapper schema for request validation
const createRequestSchema = (
  bodySchema?: z.ZodTypeAny,
  querySchema?: z.ZodTypeAny,
  paramsSchema?: z.ZodTypeAny,
) => {
  return z.object({
    body: bodySchema || z.any(),
    query: querySchema || z.any(),
    params: paramsSchema || z.any(),
  });
};

// Validation middleware factory
export const validate = (schema: z.ZodObject<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Create a request schema that wraps the provided schema
      const requestSchema = createRequestSchema(schema);

      // Validate request data based on the schema
      const validatedData = await requestSchema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      // Only update req.body (query and params are read-only in Express)
      req.body = validatedData.body;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Format Zod validation errors
        const errors = error.issues.map((err) => ({
          field: err.path.join("."),
          message: err.message,
          code: err.code,
        }));

        return res.status(400).json({
          message: "Validation failed",
          errors,
        });
      }

      // Handle unexpected errors with actual error details
      console.error("Validation middleware error:", error);
      return res.status(500).json({
        message: "Validation error occurred",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };
};

// Partial validation for optional fields
export const validatePartial = (schema: z.ZodObject<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Use partial() to make all fields optional
      const partialSchema = schema.partial();
      const requestSchema = createRequestSchema(partialSchema);

      const validatedData = await requestSchema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      // Only update req.body (query and params are read-only in Express)
      req.body = validatedData.body;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues.map((err) => ({
          field: err.path.join("."),
          message: err.message,
          code: err.code,
        }));

        return res.status(400).json({
          message: "Validation failed",
          errors,
        });
      }

      // Handle unexpected errors with actual error details
      console.error("Validation middleware error:", error);
      return res.status(500).json({
        message: "Validation error occurred",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };
};

// Custom error handler for validation errors
export const handleValidationError = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof ZodError) {
    const errors = error.issues.map((err) => ({
      field: err.path.join("."),
      message: err.message,
      code: err.code,
    }));

    return res.status(400).json({
      message: "Validation failed",
      errors,
    });
  }

  next(error);
};
