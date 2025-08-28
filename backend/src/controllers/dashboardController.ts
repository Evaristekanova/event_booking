import { Request, Response } from "express";
import { 
  getDashboardStats, 
  getRecentActivities, 
  getUpcomingEvents,
  getMonthlyAnalytics,
  getCategoryAnalytics,
  getTopEvents
} from "../services/dashboardService";

export const getDashboardStatistics = async (req: Request, res: Response) => {
  try {
    const stats = await getDashboardStats();

    res.status(200).json({
      success: true,
      message: "Dashboard statistics retrieved successfully",
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to get dashboard statistics",
    });
  }
};

export const getRecentActivitiesHandler = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;

    const activities = await getRecentActivities(limit);

    res.status(200).json({
      success: true,
      message: "Recent activities retrieved successfully",
      data: activities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to get recent activities",
    });
  }
};

export const getUpcomingEventsHandler = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 5;

    const events = await getUpcomingEvents(limit);

    res.status(200).json({
      success: true,
      message: "Upcoming events retrieved successfully",
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to get upcoming events",
    });
  }
};

export const getMonthlyAnalyticsHandler = async (req: Request, res: Response) => {
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
      message: error instanceof Error ? error.message : "Failed to get monthly analytics",
    });
  }
};

export const getCategoryAnalyticsHandler = async (req: Request, res: Response) => {
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
      message: error instanceof Error ? error.message : "Failed to get category analytics",
    });
  }
};

export const getTopEventsHandler = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 5;

    const events = await getTopEvents(limit);

    res.status(200).json({
      success: true,
      message: "Top events retrieved successfully",
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to get top events",
    });
  }
};
