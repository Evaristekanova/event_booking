"use client";

import React, { useMemo } from "react";
import { ProtectedRoute } from "../../../components/ProtectedRoute";
import { DashboardLayout } from "../../../components/DashboardLayout";
import { useAuth } from "../../../contexts/AuthContext";
import { useEvents } from "../../../hooks/useEvents";
import { EventCalendar } from "../../../components/EventCalendar";
import Loader from "@/app/components/shared/Loader";
import { useUserBookings } from "@/app/hooks/useBookings";
import { Event as EventType, Booking } from "@/types";

export default function CalendarPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";
  const {
    data: bookings,
    isPending: bookingsPending,
    error: bookingsError,
  } = useUserBookings();
  const {
    data: eventsData,
    isLoading: eventsLoading,
    error: eventsError,
  } = useEvents();

  const calendarData = useMemo(() => {
    if (isAdmin) {
      return (
        eventsData?.data?.events?.map((event: EventType) => ({
          id: event.id,
          title: event.title,
          date: event.date,
          time: event.time,
          location: event.location,
          capacity: event.capacity,
          price: event.price,
          description: event.description,
          status: event.status,
          imageUrl: event.imageUrl,
          category: event.category,
          type: "event" as const,
          event: event,
        })) || []
      );
    } else {
      return (
        bookings?.data?.events.map((booking: Booking) => ({
          id: booking.id,
          title: booking?.event?.title,
          date: booking?.event?.date,
          time: booking?.event?.time,
          location: booking?.event?.location,
          capacity: 0,
          price: 0,
          description: "",
          status: booking.status,
          imageUrl: undefined,
          category: "",
          type: "booking" as const,
          booking: booking,
          event: booking.event,
        })) || []
      );
    }
  }, [isAdmin, eventsData?.data, bookings?.data]);

  const isLoading = isAdmin ? eventsLoading : bookingsPending;
  const error = isAdmin ? eventsError : bookingsError;

  if (isLoading) {
    return (
      <ProtectedRoute requireAdmin={true}>
        <DashboardLayout>
          <Loader className="h-[80vh]" />
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500">Error: {error.message}</div>
      </div>
    );
  }

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
                  ? "View and manage all events in the system"
                  : "View your booked events in calendar format"}
              </p>
            </div>
          </div>

          {/* Calendar View */}
          <EventCalendar
            calendarData={calendarData}
            isLoading={isLoading}
            isAdmin={isAdmin}
            onEventSelect={() => {}}
          />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
