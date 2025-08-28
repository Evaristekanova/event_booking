"use client";

import React, { useState } from "react";
import { ProtectedRoute } from "../../../components/ProtectedRoute";
import { DashboardLayout } from "../../../components/DashboardLayout";
import { useAuth } from "../../../contexts/AuthContext";
import { useEvents } from "../../../hooks/useEvents";
import { EventCalendar } from "../../../components/EventCalendar";
import Loader from "@/app/components/shared/Loader";
import { useUserBookings } from "@/app/hooks/useBookings";

export default function CalendarPage() {
  const { data: bookings, isPending, error: bookingsError } = useUserBookings();

  const { user, isAdmin } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED"
  >("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Fetch all events for calendar view
  const { data: eventsData, isLoading, error } = useEvents();

  if (isPending) {
    return <Loader />;
  }

  if (bookingsError) {
    return <div>Error: {bookingsError.message}</div>;
  }

  const events = eventsData?.events || [];

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Event Calendar
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                {isAdmin
                  ? "Manage and schedule events with drag-and-drop"
                  : "View all events in calendar format"}
              </p>
            </div>

            {isAdmin && (
              <button className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Create Event
              </button>
            )}
          </div>

          {/* Calendar View */}
          <EventCalendar
            bookings={bookings?.data || []}
            isLoading={isLoading}
            isAdmin={isAdmin}
            onEventSelect={() => {}}
          />

          {/* Calendar Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-blue-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Calendar Features
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Click on events to view details and book</li>
                    <li>Use Month, Week, Day, or Agenda views</li>
                    {isAdmin && (
                      <>
                        <li>Drag and drop events to reschedule</li>
                        <li>Resize events to change duration</li>
                        <li>Click on empty time slots to create new events</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
