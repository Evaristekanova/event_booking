"use client";
import { ProtectedRoute } from "../../components/ProtectedRoute";
import { DashboardLayout } from "../../components/DashboardLayout";
import { useAuth } from "../../contexts/AuthContext";
import {
  useDashboardStats,
  useTopEvents,
  useRecentActivities,
  useUpcomingEvents,
} from "../../hooks/useDashboard";
import Loader from "../../components/shared/Loader";
import { FaBook, FaMoneyBill, FaUser } from "react-icons/fa";
import { MdEvent } from "react-icons/md";

// Dashboard content component
function DashboardContent() {
  const { user, isAdmin } = useAuth();

  // Fetch dashboard data using React Query hooks
  const {
    data: stats,
    isLoading: statsLoading,
    error: statsError,
  } = useDashboardStats();
  const {
    data: topEvents,
    isLoading: topEventsLoading,
    error: topEventsError,
  } = useTopEvents(5);
  const {
    data: recentActivities,
    isLoading: activitiesLoading,
    error: activitiesError,
  } = useRecentActivities(10);
  const {
    data: upcomingEvents,
    isLoading: upcomingLoading,
    error: upcomingError,
  } = useUpcomingEvents(5);

  // Error state
  if (statsError || topEventsError || activitiesError || upcomingError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 mb-2">Failed to load dashboard data</p>
          <p className="text-gray-600 text-sm">
            Please try refreshing the page
          </p>
        </div>
      </div>
    );
  }

  if (
    statsLoading ||
    topEventsLoading ||
    activitiesLoading ||
    upcomingLoading
  ) {
    return <Loader className="h-[80vh]" />;
  }

  // Default values if data is not available
  const dashboardStats = stats || {
    totalEvents: 0,
    activeBookings: 0,
    totalRevenue: 0,
    newUsers: 0,
  };

  const topEventsData = topEvents || [];
  const recentActivitiesData = recentActivities || [];
  const upcomingEventsData = upcomingEvents || [];

  // Create stats data array using actual API data
  const statsData = [
    {
      label: "Total Events",
      value: dashboardStats.totalEvents.toString(),
      change: "+12%",
      changeType: "positive" as const,
      icon: <MdEvent className="w-6 h-6" />,
    },
    {
      label: "Active Bookings",
      value: dashboardStats.activeBookings.toString(),
      change: "+8%",
      changeType: "positive" as const,
      icon: <FaBook className="w-6 h-6" />,
    },
    {
      label: "Total Revenue",
      value: `$${dashboardStats.totalRevenue.toLocaleString()}`,
      change: "+23%",
      changeType: "positive" as const,
      icon: <FaMoneyBill className="w-6 h-6" />,
    },
    {
      label: isAdmin ? "New Users" : "My Events",
      value: isAdmin
        ? dashboardStats.newUsers.toString()
        : dashboardStats.totalEvents.toString(),
      change: "+5%",
      changeType: "positive" as const,
      icon: <FaUser className="w-6 h-6" />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.fullName?.split(" ")[0]}! 👋
        </h1>
        <p className="text-purple-100">
          Here&apos;s what&apos;s happening with your{" "}
          {isAdmin ? "platform" : "events"} today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <span className="text-purple-600">{stat.icon}</span>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span
                className={`text-sm font-medium ${
                  stat.changeType === "positive"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-1">
                from last month
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Top Performing Events */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            {isAdmin ? "Top Performing Events" : "Events You Can Book"}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bookings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attendance %
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topEventsData.length > 0 ? (
                topEventsData.map((event, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {event.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {event.bookings}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ${event.revenue.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900 mr-2">
                          {event.attendance}%
                        </span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${event.attendance}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    {isAdmin
                      ? "No events found"
                      : "No events available to book"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activities */}
      {recentActivitiesData.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Recent Activities
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivitiesData.slice(0, 5).map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(activity.timestamp).toLocaleDateString()} at{" "}
                      {new Date(activity.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Upcoming Events */}
      {upcomingEventsData.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              {isAdmin ? "Upcoming Events" : "Your Upcoming Events"}
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingEventsData.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h4 className="font-medium text-gray-900">{event.title}</h4>
                    <p className="text-sm text-gray-600">
                      {event.date} at {event.time} • {event.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {event.attendees}/{event.capacity}
                    </p>
                    <p className="text-xs text-gray-500">attendees</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Main page component with Suspense
export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <DashboardContent />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
