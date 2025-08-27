import express from "express";
import {
  authenticateToken,
  requireRole,
  optionalAuth,
} from "../middleware/auth";

const router = express.Router();

// Public routes (no authentication required)
router.get("/", optionalAuth, (req, res) => {
  // Can show public events, with optional user context if authenticated
  res.json({ message: "Public events list" });
});

router.get("/:id", optionalAuth, (req, res) => {
  // Can show event details, with optional user context if authenticated
  res.json({ message: "Event details" });
});

// Protected routes (authentication required)
router.post(
  "/",
  authenticateToken,
  requireRole(["ADMIN", "ORGANIZER"]),
  (req, res) => {
    // Only admins and organizers can create events
    res.json({ message: "Create event" });
  },
);

router.put(
  "/:id",
  authenticateToken,
  requireRole(["ADMIN", "ORGANIZER"]),
  (req, res) => {
    // Only admins and organizers can update events
    res.json({ message: "Update event" });
  },
);

router.delete("/:id", authenticateToken, requireRole(["ADMIN"]), (req, res) => {
  // Only admins can delete events
  res.json({ message: "Delete event" });
});

// User-specific routes
router.post("/:id/book", authenticateToken, (req, res) => {
  // Any authenticated user can book events
  res.json({ message: "Book event" });
});

router.get("/user/bookings", authenticateToken, (req, res) => {
  // Get user's own bookings
  res.json({ message: "User bookings" });
});

export default router;

