import { Router } from "express";
import {
  getDashboardStatistics,
  getRecentActivitiesHandler,
  getUpcomingEventsHandler,
  getMonthlyAnalyticsHandler,
  getCategoryAnalyticsHandler,
  getTopEventsHandler,
} from "../controllers/dashboardController";
import { authenticateToken } from "../middleware/auth";
import { validateRole } from "../middleware/roleCheck";

const router = Router();

// Protected routes (all users can access basic dashboard)
router.get("/stats", authenticateToken, getDashboardStatistics);
router.get("/activities", authenticateToken, getRecentActivitiesHandler);
router.get("/upcoming-events", authenticateToken, getUpcomingEventsHandler);

// Admin only routes
router.get("/analytics/monthly", authenticateToken, validateRole(["ADMIN"]), getMonthlyAnalyticsHandler);
router.get("/analytics/category", authenticateToken, validateRole(["ADMIN"]), getCategoryAnalyticsHandler);
router.get("/analytics/top-events", authenticateToken, validateRole(["ADMIN"]), getTopEventsHandler);

export default router;
