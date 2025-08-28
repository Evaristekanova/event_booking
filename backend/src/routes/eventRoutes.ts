import { Router } from "express";
import {
  createNewEvent,
  getEvent,
  getEvents,
  updateEventById,
  removeEvent,
  getEventsByCategoryHandler,
  getUpcomingEventsHandler,
} from "../controllers/eventController";
import { authenticateToken } from "../middleware/auth";

const router = Router();

// Public routes
router.get("/", getEvents);
router.get("/upcoming", getUpcomingEventsHandler);
router.get("/category/:category", getEventsByCategoryHandler);
router.get("/:id", getEvent);

// Protected routes
router.post("/", authenticateToken, createNewEvent);
router.put("/:id", authenticateToken, updateEventById);
router.delete("/:id", authenticateToken, removeEvent);

export default router;

