"use client";

import { ProtectedRoute } from "../../../components/ProtectedRoute";
import { DashboardLayout } from "../../../components/DashboardLayout";
import { useUserBookings } from "../../../hooks/useBookings";
import Loader from "@/app/components/shared/Loader";
import Table from "@/app/components/table/table";
import { BookingColumns } from "./BookingColumns";

export default function BookingsPage() {
  const { data: bookings, isPending, error } = useUserBookings();

  if (isPending) {
    return (
      <ProtectedRoute requireAdmin={true}>
        <DashboardLayout>
          <Loader className="h-[80vh]" />
        </DashboardLayout>
      </ProtectedRoute>
    );
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
          </div>
          {bookings && (
            <Table
              columns={BookingColumns()}
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
