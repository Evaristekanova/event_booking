import { useState, useEffect, useCallback } from "react";
import {
  useDashboardStats,
  useTopEvents,
  useRecentActivities,
  useUpcomingEvents,
} from "./useDashboard";
import {
  DashboardStats,
  RecentActivity,
  TopEvent,
  UpcomingEvent,
} from "@/types";

interface LazyDashboardData {
  stats: DashboardStats | null;
  topEvents: TopEvent[];
  recentActivities: RecentActivity[];
  upcomingEvents: UpcomingEvent[];
  isLoading: {
    stats: boolean;
    topEvents: boolean;
    recentActivities: boolean;
    upcomingEvents: boolean;
  };
  error: {
    stats: string | null;
    topEvents: string | null;
    recentActivities: string | null;
    upcomingEvents: string | null;
  };
  loadStats: () => void;
  loadTopEvents: () => void;
  loadRecentActivities: () => void;
  loadUpcomingEvents: () => void;
  refreshAll: () => void;
}

export const useLazyDashboard = (): LazyDashboardData => {
  const [loadedSections, setLoadedSections] = useState<Set<string>>(new Set());

  // Dashboard stats
  const {
    data: stats,
    isLoading: statsLoading,
    error: statsError,
    refetch: refetchStats,
  } = useDashboardStats();

  // Top events
  const {
    data: topEvents,
    isLoading: topEventsLoading,
    error: topEventsError,
    refetch: refetchTopEvents,
  } = useTopEvents();

  // Recent activities
  const {
    data: recentActivities,
    isLoading: recentActivitiesLoading,
    error: recentActivitiesError,
    refetch: refetchRecentActivities,
  } = useRecentActivities();

  // Upcoming events
  const {
    data: upcomingEvents,
    isLoading: upcomingEventsLoading,
    error: upcomingEventsError,
    refetch: refetchUpcomingEvents,
  } = useUpcomingEvents();

  const loadStats = useCallback(() => {
    if (!loadedSections.has("stats")) {
      refetchStats();
      setLoadedSections((prev) => new Set(prev).add("stats"));
    }
  }, [loadedSections, refetchStats]);

  const loadTopEvents = useCallback(() => {
    if (!loadedSections.has("topEvents")) {
      refetchTopEvents();
      setLoadedSections((prev) => new Set(prev).add("topEvents"));
    }
  }, [loadedSections, refetchTopEvents]);

  const loadRecentActivities = useCallback(() => {
    if (!loadedSections.has("recentActivities")) {
      refetchRecentActivities();
      setLoadedSections((prev) => new Set(prev).add("recentActivities"));
    }
  }, [loadedSections, refetchRecentActivities]);

  const loadUpcomingEvents = useCallback(() => {
    if (!loadedSections.has("upcomingEvents")) {
      refetchUpcomingEvents();
      setLoadedSections((prev) => new Set(prev).add("upcomingEvents"));
    }
  }, [loadedSections, refetchUpcomingEvents]);

  const refreshAll = useCallback(() => {
    setLoadedSections(new Set());
    refetchStats();
    refetchTopEvents();
    refetchRecentActivities();
    refetchUpcomingEvents();
  }, [
    refetchStats,
    refetchTopEvents,
    refetchRecentActivities,
    refetchUpcomingEvents,
  ]);

  // Auto-load stats when component mounts (essential data)
  useEffect(() => {
    loadStats();
  }, [loadStats]);

  return {
    stats: stats ?? null,
    topEvents: topEvents ?? [],
    recentActivities: recentActivities ?? [],
    upcomingEvents: upcomingEvents ?? [],
    isLoading: {
      stats: statsLoading,
      topEvents: topEventsLoading,
      recentActivities: recentActivitiesLoading,
      upcomingEvents: upcomingEventsLoading,
    },
    error: {
      stats: statsError?.message || null,
      topEvents: topEventsError?.message || null,
      recentActivities: recentActivitiesError?.message || null,
      upcomingEvents: upcomingEventsError?.message || null,
    },
    loadStats,
    loadTopEvents,
    loadRecentActivities,
    loadUpcomingEvents,
    refreshAll,
  };
};
