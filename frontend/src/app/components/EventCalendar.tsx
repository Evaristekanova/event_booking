"use client";

import React, { useState, useCallback, useMemo } from "react";
import {
  Calendar,
  dateFnsLocalizer,
  Views,
  SlotInfo,
  Event,
} from "react-big-calendar";
import { format, parse, startOfWeek, getDay, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";
import { toast } from "react-toastify";
import { useUpdateEvent } from "../hooks/useEvents";
import { Event as EventType } from "../_services/eventServiceApi";

// Import react-big-calendar styles
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Booking } from "../_services/bookingServiceApi";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface EventCalendarProps {
  bookings: Booking[];
  isLoading: boolean;
  isAdmin: boolean;
  onEventSelect: (event: EventType) => void;
}

interface CalendarEvent extends Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  booking: Booking; // use Booking directly
}

export const EventCalendar: React.FC<EventCalendarProps> = ({
  bookings,
  isLoading,
  isAdmin,
  onEventSelect,
}) => {
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Booking | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);

  const updateEventMutation = useUpdateEvent();

  const calendarEvents: CalendarEvent[] = useMemo(() => {
    return bookings.map((booking: Booking) => {
      const startDate = new Date(booking.event.date);
      const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // 2-hour default

      return {
        id: booking.id,
        title: booking.event.title,
        start: startDate,
        end: endDate,
        resource: booking,
        booking, // pass the full Booking object
      };
    });
  }, [bookings]);

  console.log("EventCalendar: Calendar events:", calendarEvents);
  console.log("EventCalendar: Calendar events count:", calendarEvents.length);

  // Handle event selection
  const handleEventSelect = useCallback((event: CalendarEvent) => {
    setSelectedEvent(event.booking); // use booking directly
    setShowEventModal(true);
  }, []);

  // Handle slot selection (for creating new events)
  const handleSlotSelect = useCallback(
    (slotInfo: SlotInfo) => {
      if (isAdmin) {
        // TODO: Open create event modal
        console.log("Create event at:", slotInfo);
      }
    },
    [isAdmin]
  );

  // Handle event drop (drag and drop rescheduling)
  const handleEventDrop = useCallback(
    async ({
      event,
      start,
      end,
    }: {
      event: CalendarEvent;
      start: Date;
      end: Date;
    }) => {
      if (!isAdmin) return;

      try {
        const updatedEvent = {
          ...event.booking,
          date: start.toISOString(),
        };

        await updateEventMutation.mutateAsync({
          id: event.id,
          booking: updatedEvent,
        });

        toast.success("Event rescheduled successfully!");
      } catch (error) {
        toast.error("Failed to reschedule event");
        console.error("Event drop error:", error);
      }
    },
    [isAdmin, updateEventMutation]
  );

  // Handle event resize (for changing duration)
  const handleEventResize = useCallback(
    async ({
      event,
      start,
      end,
    }: {
      event: CalendarEvent;
      start: Date;
      end: Date;
    }) => {
      if (!isAdmin) return;

      try {
        const updatedEvent = {
          ...event.booking,
          date: start.toISOString(),
        };

        await updateEventMutation.mutateAsync({
          id: event.id,
          eventData: updatedEvent,
        });

        toast.success("Event duration updated successfully!");
      } catch (error) {
        toast.error("Failed to update event duration");
        console.error("Event resize error:", error);
      }
    },
    [isAdmin, updateEventMutation]
  );

  // Event styling based on status
  const eventStyleGetter = useCallback((event: CalendarEvent) => {
    const status = event.booking.status;
    let backgroundColor = "#3B82F6"; // Default blue
    const now = new Date();
    const eventStart = new Date(event.start);
    const eventEnd = new Date(event.end);

    // Add null safety check for event.booking and event.booking.status
    const bookingStatus = event.booking?.status;

    // Determine the effective display status based on dates and booking status
    let displayStatus:
      | "UPCOMING"
      | "ONGOING"
      | "COMPLETED"
      | "CANCELLED"
      | "PENDING"
      | "CONFIRMED";

    if (
      bookingStatus === "CANCELLED" ||
      bookingStatus === "PENDING" ||
      bookingStatus === "CONFIRMED"
    ) {
      displayStatus = bookingStatus;
    } else if (now < eventStart) {
      displayStatus = "UPCOMING";
    } else if (now >= eventStart && now <= eventEnd) {
      displayStatus = "ONGOING";
    } else {
      displayStatus = "COMPLETED";
    }

    switch (displayStatus) {
      case "UPCOMING":
        backgroundColor = "#3B82F6"; // Blue
        break;
      case "ONGOING":
        backgroundColor = "#10B981"; // Green
        break;
      case "COMPLETED":
        backgroundColor = "#6B7280"; // Gray
        break;
      case "CANCELLED":
        backgroundColor = "#EF4444"; // Red
        break;
    }

    return {
      style: {
        backgroundColor,
        borderRadius: "4px",
        opacity: 0.8,
        color: "white",
        border: "0px",
        display: "block",
        cursor: "pointer",
      },
    };
  }, []);

  // Custom toolbar component
  const CustomToolbar = useCallback((toolbar: any) => {
    const goToToday = () => {
      toolbar.onNavigate("TODAY");
    };

    const goToPrevious = () => {
      toolbar.onNavigate("PREV");
    };

    const goToNext = () => {
      toolbar.onNavigate("NEXT");
    };

    const viewNames = {
      [Views.MONTH]: "Month",
      [Views.WEEK]: "Week",
      [Views.DAY]: "Day",
      [Views.AGENDA]: "Agenda",
    };

    return (
      <div className="flex items-center justify-between mb-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center space-x-2">
          <button
            onClick={goToPrevious}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={goToToday}
            className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors"
          >
            Today
          </button>

          <button
            onClick={goToNext}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <h2 className="text-lg font-semibold text-gray-900 ml-4">
            {toolbar.label}
          </h2>
        </div>

        <div className="flex items-center space-x-2">
          {Object.values(Views).map((viewName) => (
            <button
              key={viewName}
              onClick={() => toolbar.onView(viewName)}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                toolbar.view === viewName
                  ? "bg-purple-600 text-white"
                  : "text-gray-600 bg-white border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {viewNames[viewName]}
            </button>
          ))}
        </div>
      </div>
    );
  }, []);

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
        <p className="mt-4 text-gray-500">Loading calendar...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        view={view}
        onView={setView}
        date={date}
        onNavigate={setDate}
        onSelectEvent={handleEventSelect}
        onSelectSlot={handleSlotSelect}
        onEventDrop={handleEventDrop}
        onEventResize={handleEventResize}
        eventPropGetter={eventStyleGetter}
        components={{
          toolbar: CustomToolbar,
        }}
        selectable={isAdmin}
        resizable={isAdmin}
        draggable={isAdmin}
        popup
        step={60}
        timeslots={1}
        defaultView={Views.MONTH}
        className="event-calendar"
      />

      {/* Event Details Modal */}
      {showEventModal && selectedEvent && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      {selectedEvent.event.title}
                    </h3>

                    <div className="space-y-3 text-sm">
                      <div className="flex items-center text-gray-600">
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
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {new Date(
                          selectedEvent.event.date
                        ).toLocaleDateString()}{" "}
                        at {selectedEvent.event.time}
                      </div>

                      <div className="flex items-center text-gray-600">
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
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {selectedEvent.event.location}
                      </div>

                      <div className="flex items-center text-gray-600">
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
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        {selectedEvent.attendees}/{selectedEvent.event.capacity}{" "}
                        attendees
                      </div>

                      <div className="flex items-center text-gray-600">
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
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                          />
                        </svg>
                        ${selectedEvent.event.price}
                      </div>

                      <p className="text-gray-600 mt-3">
                        {selectedEvent.event.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>

                {!isAdmin && (
                  <button
                    type="button"
                    onClick={() => {
                      onEventSelect(selectedEvent);
                      setShowEventModal(false);
                    }}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Book Event
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
