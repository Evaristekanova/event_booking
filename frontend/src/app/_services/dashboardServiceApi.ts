import {
  DashboardStats,
  TopEvent,
  RecentActivity,
  UpcomingEvent,
  MonthlyAnalytics,
  CategoryAnalytics,
} from "../../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Get dashboard statistics
export const getDashboardStatsApi = async (
  token: string
): Promise<DashboardStats> => {
  try {
    const response = await fetch(`${API_URL}/api/v1/dashboard/stats`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || "Failed to fetch dashboard stats");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
};

// Get top performing events
export const getTopEventsApi = async (
  token: string,
  limit: number = 5
): Promise<TopEvent[]> => {
  try {
    const response = await fetch(
      `${API_URL}/api/v1/dashboard/top-events?limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || "Failed to fetch top events");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
};

// Get recent activities
export const getRecentActivitiesApi = async (
  token: string,
  limit: number = 10
): Promise<RecentActivity[]> => {
  try {
    const response = await fetch(
      `${API_URL}/api/v1/dashboard/activities?limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData?.message || "Failed to fetch recent activities"
      );
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
};

// Get upcoming events
export const getUpcomingEventsApi = async (
  token: string,
  limit: number = 5
): Promise<UpcomingEvent[]> => {
  try {
    const response = await fetch(
      `${API_URL}/api/v1/dashboard/upcoming-events?limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || "Failed to fetch upcoming events");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
};

// Get monthly analytics (admin only)
export const getMonthlyAnalyticsApi = async (
  token: string,
  year: number = new Date().getFullYear()
): Promise<MonthlyAnalytics[]> => {
  try {
    const response = await fetch(
      `${API_URL}/api/v1/dashboard/analytics/monthly?year=${year}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData?.message || "Failed to fetch monthly analytics"
      );
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
};

export const getCategoryAnalyticsApi = async (
  token: string
): Promise<CategoryAnalytics[]> => {
  try {
    const response = await fetch(
      `${API_URL}/api/v1/dashboard/analytics/category`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData?.message || "Failed to fetch category analytics"
      );
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
};
