import { Router } from "express";
import {
  createNewBooking,
  getBooking,
  getUserBookingsHandler,
  getBookings,
  updateBookingById,
  cancelBookingById,
  getBookingsStats,
} from "../controllers/bookingController";
import { authenticateToken } from "../middleware/auth";
import { validateRole } from "../middleware/roleCheck";

const router = Router();

// Protected routes
router.post("/", authenticateToken, createNewBooking);
router.get("/user", authenticateToken, getUserBookingsHandler);
router.get("/stats", authenticateToken, validateRole(["ADMIN"]), getBookingsStats);

// Admin only routes
router.get("/", authenticateToken, validateRole(["ADMIN"]), getBookings);

// Parameterized routes (must come after specific routes)
router.get("/:id", authenticateToken, getBooking);
router.put("/:id", authenticateToken, updateBookingById);
router.delete("/:id", authenticateToken, cancelBookingById);

export default router;
