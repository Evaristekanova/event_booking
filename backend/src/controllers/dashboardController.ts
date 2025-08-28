import { Request, Response } from "express";
import {
  getDashboardStats,
  getRecentActivities,
  getUpcomingEvents,
  getMonthlyAnalytics,
  getCategoryAnalytics,
  getTopEvents,
} from "../services/dashboardService";

export const getDashboardStatistics = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const isAdmin = req.user?.role === "ADMIN";

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const stats = await getDashboardStats(userId, isAdmin);

    res.status(200).json({
      success: true,
      message: "Dashboard statistics retrieved successfully",
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to get dashboard statistics",
    });
  }
};

export const getRecentActivitiesHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = req.user?.id;
    const isAdmin = req.user?.role === "ADMIN";
    const limit = parseInt(req.query.limit as string) || 10;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const activities = await getRecentActivities(userId, isAdmin, limit);

    res.status(200).json({
      success: true,
      message: "Recent activities retrieved successfully",
      data: activities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to get recent activities",
    });
  }
};

export const getUpcomingEventsHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const isAdmin = req.user?.role === "ADMIN";
    const limit = parseInt(req.query.limit as string) || 5;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const events = await getUpcomingEvents(userId, isAdmin, limit);

    res.status(200).json({
      success: true,
      message: "Upcoming events retrieved successfully",
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to get upcoming events",
    });
  }
};

export const getMonthlyAnalyticsHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const year = parseInt(req.query.year as string) || new Date().getFullYear();

    const analytics = await getMonthlyAnalytics(year);

    res.status(200).json({
      success: true,
      message: "Monthly analytics retrieved successfully",
      data: analytics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to get monthly analytics",
    });
  }
};

export const getCategoryAnalyticsHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const analytics = await getCategoryAnalytics();

    res.status(200).json({
      success: true,
      message: "Category analytics retrieved successfully",
      data: analytics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to get category analytics",
    });
  }
};

export const getTopEventsHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const isAdmin = req.user?.role === "ADMIN";
    const limit = parseInt(req.query.limit as string) || 5;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const events = await getTopEvents(userId, isAdmin, limit);

    res.status(200).json({
      success: true,
      message: "Top events retrieved successfully",
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to get top events",
    });
  }
};
