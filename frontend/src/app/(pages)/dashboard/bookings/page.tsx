"use client";

import React, { useEffect } from "react";
import { ProtectedRoute } from "../../../components/ProtectedRoute";
import { DashboardLayout } from "../../../components/DashboardLayout";
import { useAuth } from "../../../contexts/AuthContext";
import { useUserBookings } from "../../../hooks/useBookings";
import Loader from "@/app/components/shared/Loader";
import Table from "@/app/components/table/table";
import { Booking } from "@/app/_services/bookingServiceApi";
import { BookingColumns } from "./BookingColumns";
import Button from "@/app/components/shared/Button";

export default function BookingsPage() {
  const { user, isAdmin } = useAuth();
  const { data: bookings, isPending, error } = useUserBookings();

  const onView = (booking: Booking) => {
    console.log("Viewing booking:", booking);
  };

  if (isPending) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="px-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Check out your bookings</h1>
            <Button className="hover:bg-purple-700 cursor-pointer rounded-md">
              View All Bookings
            </Button>
          </div>
          {bookings && (
            <Table
              columns={BookingColumns(onView)}
              data={bookings.data}
              searchKey="eventTitle"
              searchPlaceholder="Search by event title"
            />
          )}
          {error && (
            <div className="text-red-500 grid place-items-center">
              Error: {error}
            </div>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
