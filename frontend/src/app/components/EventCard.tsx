"use client";

import React from "react";

import { CiLocationOn, CiCalendarDate } from "react-icons/ci";
import { IoIosPeople } from "react-icons/io";

import { Event as EventType } from "../_services/eventServiceApi";

interface EventCardProps {
  event: EventType;
  isAdmin: boolean;
  isLoading: boolean;
  onEventAction: (eventId: string, action: string) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  isAdmin,
  onEventAction,
  isLoading,
}) => {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      UPCOMING: { bg: "bg-blue-100", text: "text-blue-800" },
      ONGOING: { bg: "bg-green-100", text: "text-green-800" },
      COMPLETED: { bg: "bg-gray-100", text: "text-gray-800" },
      CANCELLED: { bg: "bg-red-100", text: "text-red-800" },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] ||
      statusConfig.UPCOMING;
    return (
      <span
        className={`px-2 py-1 text-xs font-medium ${config.bg} ${config.text} rounded-full capitalize`}
      >
        {status.toLowerCase()}
      </span>
    );
  };

  const getAttendancePercentage = (attendees: number, capacity: number) => {
    return Math.round((attendees / capacity) * 100);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Event Image */}
      {/* {event.imageUrl && (
        <div className="h-48 bg-gray-200 overflow-hidden">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
      )} */}

      {/* Event Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {event.title}
          </h3>
          {getStatusBadge(event.status)}
        </div>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-gray-600">
            <CiCalendarDate className="w-5 h-5 mr-2" />
            {new Date(event.date).toLocaleDateString()} at {event.time}
          </div>
          <div className="flex items-center text-gray-600">
            <CiLocationOn className="w-5 h-5 mr-2" />
            {event.location}
          </div>
          <div className="flex items-center text-gray-600">
            <IoIosPeople className="w-5 h-5 mr-2" />
            {event.attendees}/{event.capacity} attendees
          </div>
        </div>
      </div>

      {/* Attendance Bar */}
      <div className="px-6 py-3 bg-gray-50">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-gray-600">Attendance</span>
          <span className="text-gray-900 font-medium">
            {getAttendancePercentage(event.attendees, event.capacity)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${getAttendancePercentage(
                event.attendees,
                event.capacity
              )}%`,
            }}
          />
        </div>
      </div>

      {/* Event Footer */}
      <div className="p-6 bg-white">
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-gray-900">${event.price}</div>
          <div className="text-sm text-gray-500">{event.category}</div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          {isAdmin ? (
            <>
              <button
                onClick={() => onEventAction(event.id, "edit")}
                className=" cursor-pointer flex-1 px-3 py-2 text-sm font-medium text-purple-600 bg-purple-100 rounded-md hover:bg-purple-200 transition-colors"
              >
                Edit Event
              </button>
            </>
          ) : (
            <button
              onClick={() => onEventAction(event.id, "book")}
              disabled={isLoading}
              className="disabled:cursor-not-allowed w-full cursor-pointer px-3 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors"
            >
              {isLoading ? "Booking..." : "Book Event"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
