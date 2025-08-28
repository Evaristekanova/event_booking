import { Router } from "express";
import userRoutes from "./userRoutes";
import eventRoutes from "./eventRoutes";
import bookingRoutes from "./bookingRoutes";
import dashboardRoutes from "./dashboardRoutes";

const router = Router();

// API version prefix
const API_PREFIX = "/api/v1";

// User routes
router.use(`${API_PREFIX}/users`, userRoutes);

// Event routes
router.use(`${API_PREFIX}/events`, eventRoutes);

// Booking routes
router.use(`${API_PREFIX}/bookings`, bookingRoutes);

// Dashboard routes
router.use(`${API_PREFIX}/dashboard`, dashboardRoutes);

// Health check
router.get("/health", (req, res) => {
  res.json({ 
    success: true, 
    message: "Event Booking API is running",
    timestamp: new Date().toISOString()
  });
});

export default router;
