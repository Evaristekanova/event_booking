import React from "react";
import { CalendarItem } from "./EventCalendar";

export default function BookedEventCard({
  selectedItem,
}: {
  selectedItem: CalendarItem;
}) {
  return (
    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div className="sm:flex sm:items-start">
        <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            {selectedItem.title}
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
              {new Date(selectedItem.date).toLocaleDateString()} at{" "}
              {(() => {
                const time = selectedItem.time;
                if (time.includes(":")) {
                  const [hour, minute] = time.split(":");
                  const hourNum = parseInt(hour, 10);
                  const ampm = hourNum >= 12 ? "PM" : "AM";
                  const displayHour =
                    hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum;
                  return `${displayHour}:${minute} ${ampm}`;
                }
                return time;
              })()}
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
              {selectedItem.location}
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
              {selectedItem.type === "event"
                ? `${selectedItem.capacity} attendees`
                : `${selectedItem.booking?.quantity || 1} ticket(s)`}
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
              {selectedItem.type === "event"
                ? `$${selectedItem.price}`
                : `$${selectedItem.booking?.totalAmount || 0} total`}
            </div>

            <p className="text-gray-600 mt-3">{selectedItem.description}</p>

            {selectedItem.type === "booking" && (
              <div className="mt-3 p-3 bg-gray-50 rounded-md">
                <h4 className="font-medium text-gray-900 mb-2">
                  Booking Details
                </h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <div>
                    Status:{" "}
                    <span className="font-medium">
                      {selectedItem.booking?.status}
                    </span>
                  </div>
                  <div>
                    Ticket Type:{" "}
                    <span className="font-medium">
                      {selectedItem.booking?.ticketType}
                    </span>
                  </div>
                  <div>
                    Quantity:{" "}
                    <span className="font-medium">
                      {selectedItem.booking?.quantity}
                    </span>
                  </div>
                  <div>
                    Booked on:{" "}
                    <span className="font-medium">
                      {new Date(
                        selectedItem.booking?.bookingDate || ""
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
