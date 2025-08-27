"use client";

import React, { useState } from "react";
import { ProtectedRoute } from "../../../components/ProtectedRoute";
import { DashboardLayout } from "../../../components/DashboardLayout";
import { useAuth } from "../../../contexts/AuthContext";

interface Booking {
  id: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  attendeeName: string;
  attendeeEmail: string;
  bookingDate: string;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  paymentStatus: "paid" | "pending" | "failed";
  amount: number;
  ticketType: string;
  quantity: number;
}

export default function BookingsPage() {
  const { user, isAdmin } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "confirmed" | "pending" | "cancelled" | "completed"
  >("all");
  const [paymentFilter, setPaymentFilter] = useState<
    "all" | "paid" | "pending" | "failed"
  >("all");

  // Mock data - replace with actual API call
  const bookings: Booking[] = [
    {
      id: "1",
      eventTitle: "Tech Conference 2024",
      eventDate: "2024-12-15",
      eventTime: "9:00 AM",
      eventLocation: "Convention Center, Downtown",
      attendeeName: "John Doe",
      attendeeEmail: "john@example.com",
      bookingDate: "2024-12-01",
      status: "confirmed",
      paymentStatus: "paid",
      amount: 150,
      ticketType: "General Admission",
      quantity: 1,
    },
    {
      id: "2",
      eventTitle: "Music Festival",
      eventDate: "2024-12-20",
      eventTime: "6:00 PM",
      eventLocation: "Central Park",
      attendeeName: "Jane Smith",
      attendeeEmail: "jane@example.com",
      bookingDate: "2024-12-05",
      status: "pending",
      paymentStatus: "pending",
      amount: 75,
      ticketType: "VIP Pass",
      quantity: 2,
    },
    {
      id: "3",
      eventTitle: "Business Workshop",
      eventDate: "2024-12-10",
      eventTime: "2:00 PM",
      eventLocation: "Business Center",
      attendeeName: "Bob Johnson",
      attendeeEmail: "bob@example.com",
      bookingDate: "2024-11-28",
      status: "completed",
      paymentStatus: "paid",
      amount: 200,
      ticketType: "Workshop Pass",
      quantity: 1,
    },
    {
      id: "4",
      eventTitle: "Art Exhibition",
      eventDate: "2024-11-30",
      eventTime: "10:00 AM",
      eventLocation: "Art Gallery",
      attendeeName: "Alice Brown",
      attendeeEmail: "alice@example.com",
      bookingDate: "2024-11-25",
      status: "cancelled",
      paymentStatus: "paid",
      amount: 25,
      ticketType: "General Admission",
      quantity: 1,
    },
  ];

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.eventTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.attendeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.attendeeEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;
    const matchesPayment =
      paymentFilter === "all" || booking.paymentStatus === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      confirmed: { bg: "bg-green-100", text: "text-green-800" },
      pending: { bg: "bg-yellow-100", text: "text-yellow-800" },
      completed: { bg: "bg-blue-100", text: "text-blue-800" },
      cancelled: { bg: "bg-red-100", text: "text-red-800" },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return (
      <span
        className={`px-2 py-1 text-xs font-medium ${config.bg} ${config.text} rounded-full capitalize`}
      >
        {status}
      </span>
    );
  };

  const getPaymentStatusBadge = (status: string) => {
    const statusConfig = {
      paid: { bg: "bg-green-100", text: "text-green-800" },
      pending: { bg: "bg-yellow-100", text: "text-yellow-800" },
      failed: { bg: "bg-red-100", text: "text-red-800" },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return (
      <span
        className={`px-2 py-1 text-xs font-medium ${config.bg} ${config.text} rounded-full capitalize`}
      >
        {status}
      </span>
    );
  };

  const handleBookingAction = (bookingId: string, action: string) => {
    // TODO: Implement booking actions
    console.log(`${action} booking ${bookingId}`);
  };

  const getTotalRevenue = () => {
    return bookings
      .filter((booking) => booking.paymentStatus === "paid")
      .reduce((total, booking) => total + booking.amount, 0);
  };

  const getTotalBookings = () => {
    return bookings.length;
  };

  const getConfirmedBookings = () => {
    return bookings.filter((booking) => booking.status === "confirmed").length;
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
              <p className="mt-1 text-sm text-gray-500">
                {isAdmin
                  ? "Manage all event bookings"
                  : "View your event bookings"}
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
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Export Report
              </button>
            )}
          </div>

          {/* Stats Cards */}
          {isAdmin && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Total Bookings
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {getTotalBookings()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Confirmed
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {getConfirmedBookings()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <svg
                      className="w-6 h-6 text-purple-600"
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
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Total Revenue
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      ${getTotalRevenue()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div>
                <label
                  htmlFor="search"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Search Bookings
                </label>
                <input
                  type="text"
                  id="search"
                  placeholder={
                    isAdmin
                      ? "Search by event, attendee name or email..."
                      : "Search by event..."
                  }
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Status Filter */}
              <div>
                <label
                  htmlFor="status-filter"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Filter by Status
                </label>
                <select
                  id="status-filter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Payment Status Filter */}
              <div>
                <label
                  htmlFor="payment-filter"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Filter by Payment
                </label>
                <select
                  id="payment-filter"
                  value={paymentFilter}
                  onChange={(e) => setPaymentFilter(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="all">All Payment Status</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bookings Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Bookings ({filteredBookings.length})
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Event Details
                    </th>
                    {isAdmin && (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Attendee
                      </th>
                    )}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Booking Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {booking.eventTitle}
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(booking.eventDate).toLocaleDateString()}{" "}
                            at {booking.eventTime}
                          </div>
                          <div className="text-sm text-gray-500">
                            {booking.eventLocation}
                          </div>
                        </div>
                      </td>

                      {isAdmin && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {booking.attendeeName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {booking.attendeeEmail}
                            </div>
                          </div>
                        </td>
                      )}

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-gray-900">
                            {booking.ticketType} x {booking.quantity}
                          </div>
                          <div className="text-sm text-gray-500">
                            Booked on{" "}
                            {new Date(booking.bookingDate).toLocaleDateString()}
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            ${booking.amount}
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(booking.status)}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {getPaymentStatusBadge(booking.paymentStatus)}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {isAdmin ? (
                            <>
                              <button
                                onClick={() =>
                                  handleBookingAction(booking.id, "confirm")
                                }
                                className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded hover:bg-green-200"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() =>
                                  handleBookingAction(booking.id, "cancel")
                                }
                                className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded hover:bg-red-200"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() =>
                                handleBookingAction(booking.id, "view")
                              }
                              className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                            >
                              View
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredBookings.length === 0 && (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No bookings found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
