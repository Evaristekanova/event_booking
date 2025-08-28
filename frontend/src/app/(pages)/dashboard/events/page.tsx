"use client";

import { ProtectedRoute } from "../../../components/ProtectedRoute";
import { DashboardLayout } from "../../../components/DashboardLayout";
import { useAuth } from "../../../contexts/AuthContext";
import { useEvents } from "../../../hooks/useEvents";
import { Event as EventType } from "../../../_services/eventServiceApi";
import Table from "@/app/components/table/table";
import { EventColumns } from "./EventColumn";
import Loader from "@/app/components/shared/Loader";
import Button from "@/app/components/shared/Button";
import { useState } from "react";
import Modal from "@/app/components/shared/Modal";
import { EventCard } from "@/app/components/EventCard";
import {
  createBookingApi,
  CreateBookingInput,
} from "@/app/_services/bookingServiceApi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function EventsPage() {
  const { user, token } = useAuth();
  const isAdmin = user?.role === "ADMIN";
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: eventsData, isPending, error } = useEvents();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [event, setEvent] = useState<EventType | null>(null);

  const { mutate: createBooking, isPending: isLoadingBooking } = useMutation({
    mutationFn: (bookingData: CreateBookingInput) =>
      createBookingApi(bookingData, token!),
    onSuccess: () => {
      toast.success("Booking created successfully");

      closeModal();
      queryClient.invalidateQueries({ queryKey: ["user-bookings"] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (error) => {
      toast.error(error.message);
      closeModal();
    },
  });

  const closeModal = () => {
    setIsModalOpen(false);
    setEvent(null);
  };

  const onView = (event: EventType) => {
    setIsModalOpen(true);
    setEvent(event);
  };

  const bookEvent = (event: EventType) => {
    const bookingData: CreateBookingInput = {
      eventId: event.id,
      ticketType: "Standard",
      quantity: 1,
      totalAmount: 100,
    };
    createBooking(bookingData);
  };

  if (isPending) {
    return <Loader />;
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="px-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Check out our Events</h1>
            <Button className="hover:bg-purple-700 cursor-pointer rounded-md">
              Add Event
            </Button>
          </div>
          {eventsData?.data && (
            <Table
              columns={EventColumns(onView)}
              data={eventsData?.data}
              searchKey="title"
              searchPlaceholder="Search by title"
            />
          )}
          {error && (
            <div className="text-red-500 grid place-items-center">
              Error: {error.message}
            </div>
          )}
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEvent(null);
          }}
          title="Check out the event details"
        >
          {event && (
            <EventCard
              event={event}
              isAdmin={isAdmin}
              onEventAction={(eventId: string, action: string) => {
                if (action === "book") {
                  bookEvent(event);
                }
                if (action === "edit") {
                  router.push(`/events/${event.id}`);
                }
              }}
              isLoading={isLoadingBooking}
            />
          )}
        </Modal>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
