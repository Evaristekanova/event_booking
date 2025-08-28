import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import {
  getDashboardStatsApi,
  getTopEventsApi,
  getRecentActivitiesApi,
  getUpcomingEventsApi,
  getMonthlyAnalyticsApi,
  getCategoryAnalyticsApi,
} from "../_services/dashboardServiceApi";
import {
  DashboardStats,
  TopEvent,
  RecentActivity,
  UpcomingEvent,
  MonthlyAnalytics,
  CategoryAnalytics,
} from "../../types";

// Hook to get dashboard statistics
export const useDashboardStats = () => {
  const { token } = useAuth();

  return useQuery<DashboardStats>({
    queryKey: ["dashboard", "stats"],
    queryFn: () => getDashboardStatsApi(token!),
    enabled: !!token, 
  });
};

// Hook to get top performing events
export const useTopEvents = (limit: number = 5) => {
  const { token } = useAuth();

  return useQuery<TopEvent[]>({
    queryKey: ["dashboard", "top-events", limit],
    queryFn: () => getTopEventsApi(token!, limit),
    enabled: !!token,
    
  });
};

// Hook to get recent activities
export const useRecentActivities = (limit: number = 10) => {
  const { token } = useAuth();

  return useQuery<RecentActivity[]>({
    queryKey: ["dashboard", "activities", limit],
    queryFn: () => getRecentActivitiesApi(token!, limit),
    enabled: !!token,
    
  });
};

// Hook to get upcoming events
export const useUpcomingEvents = (limit: number = 5) => {
  const { token } = useAuth();

  return useQuery<UpcomingEvent[]>({
    queryKey: ["dashboard", "upcoming-events", limit],
    queryFn: () => getUpcomingEventsApi(token!, limit),
    enabled: !!token,
    
  });
};

// Hook to get monthly analytics (admin only)
export const useMonthlyAnalytics = (
  year: number = new Date().getFullYear()
) => {
  const { token, isAdmin } = useAuth();

  return useQuery<MonthlyAnalytics[]>({
    queryKey: ["dashboard", "monthly-analytics", year],
    queryFn: () => getMonthlyAnalyticsApi(token!, year),
    enabled: !!token && isAdmin,
    
  });
};

// Hook to get category analytics (admin only)
export const useCategoryAnalytics = () => {
  const { token, isAdmin } = useAuth();

  return useQuery<CategoryAnalytics[]>({
    queryKey: ["dashboard", "category-analytics"],
    queryFn: () => getCategoryAnalyticsApi(token!),
    enabled: !!token && isAdmin,

  });
};
