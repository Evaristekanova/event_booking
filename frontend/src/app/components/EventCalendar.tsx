"use client";

import React, { useState, useCallback, useMemo } from "react";
import {
  Calendar,
  dateFnsLocalizer,
  Views,
  SlotInfo,
  Event,
  View,
} from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import { Event as EventType } from "../_services/eventServiceApi";
import { Booking } from "../_services/bookingServiceApi";
import Modal from "./shared/Modal";

import "react-big-calendar/lib/css/react-big-calendar.css";
import Button from "./shared/Button";
import BookedEventCard from "./BookedEventCard";
import Loader from "./shared/Loader";

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

// Utility function to format time in AM/PM
const formatTime = (timeString: string): string => {
  if (timeString.includes(":")) {
    const [hour, minute] = timeString.split(":");
    const hourNum = parseInt(hour, 10);
    const ampm = hourNum >= 12 ? "PM" : "AM";
    const displayHour =
      hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum;
    return `${displayHour}:${minute} ${ampm}`;
  }
  return timeString;
};

export interface CalendarItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  price: number;
  description: string;
  status: string;
  imageUrl?: string;
  category: string;
  type: "event" | "booking";
  event: EventType;
  booking?: Booking;
}

interface EventCalendarProps {
  calendarData: CalendarItem[];
  isLoading: boolean;
  isAdmin: boolean;
  onEventSelect: (event: EventType) => void;
}

interface CalendarEvent extends Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  calendarItem: CalendarItem;
}

export const EventCalendar: React.FC<EventCalendarProps> = ({
  calendarData,
  isLoading,
  isAdmin,
}) => {
  const [view, setView] = useState<View>(Views.MONTH);
  const [date, setDate] = useState(new Date());
  const [selectedItem, setSelectedItem] = useState<CalendarItem | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);

  const calendarEvents: CalendarEvent[] = useMemo(() => {
    return calendarData.map((item: CalendarItem) => {
      const startDate = new Date(item.date);

      // Parse the time string (e.g., "14:30" or "2:30 PM")
      let startHour = startDate.getHours();
      let startMinute = startDate.getMinutes();

      // If time is in 24-hour format, convert it
      if (item.time.includes(":")) {
        const [hour, minute] = item.time.split(":");
        startHour = parseInt(hour, 10);
        startMinute = parseInt(minute, 10);

        // Set the time on the start date
        startDate.setHours(startHour, startMinute, 0, 0);
      }

      // Calculate end time (default 2 hours duration)
      const endDate = new Date(startDate);
      endDate.setHours(startDate.getHours() + 2);

      return {
        id: item.id,
        title: `${item.title} (${formatTime(item.time)})`,
        start: startDate,
        end: endDate,
        resource: item,
        calendarItem: item,
      };
    });
  }, [calendarData]);

  const handleEventSelect = useCallback((event: CalendarEvent) => {
    setSelectedItem(event.calendarItem);
    setShowEventModal(true);
  }, []);

  const handleSlotSelect = useCallback(
    (slotInfo: SlotInfo) => {
      if (isAdmin) {
        console.log("Create event at:", slotInfo);
      }
    },
    [isAdmin]
  );

  // Event styling based on status
  const eventStyleGetter = useCallback((event: CalendarEvent) => {
    const status = event.calendarItem.status;
    let backgroundColor = "#9810fa";
    const now = new Date();
    const eventStart = new Date(event.start);
    const eventEnd = new Date(event.end);

    let displayStatus: string;

    if (status === "CANCELLED") {
      displayStatus = "CANCELLED";
    } else if (now < eventStart) {
      displayStatus = "UPCOMING";
    } else if (now >= eventStart && now <= eventEnd) {
      displayStatus = "ONGOING";
    } else {
      displayStatus = "COMPLETED";
    }

    switch (displayStatus) {
      case "UPCOMING":
        backgroundColor = "#9810fa";
        break;
      case "ONGOING":
        backgroundColor = "#10B981";
        break;
      case "COMPLETED":
        backgroundColor = "#6B7280";
        break;
      case "CANCELLED":
        backgroundColor = "#EF4444";
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

  // Handle view change
  const handleViewChange = useCallback((newView: View) => {
    setView(newView);
  }, []);

  // Handle navigation
  const handleNavigate = useCallback((newDate: Date) => {
    setDate(newDate);
  }, []);

  if (isLoading) <Loader />;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        view={view}
        onView={handleViewChange}
        date={date}
        onNavigate={handleNavigate}
        onSelectEvent={handleEventSelect}
        onSelectSlot={handleSlotSelect}
        eventPropGetter={eventStyleGetter}
        selectable={isAdmin}
        popup
        step={60}
        timeslots={1}
        defaultView={Views.MONTH}
        className="event-calendar"
      />

      {selectedItem && (
        <Modal
          isOpen={showEventModal}
          onClose={() => setShowEventModal(false)}
          title="Event Details"
        >
          <BookedEventCard selectedItem={selectedItem} />
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <Button
              type="button"
              onClick={() => setShowEventModal(false)}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};
