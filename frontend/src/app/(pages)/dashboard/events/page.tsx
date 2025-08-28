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
import { CreateBookingInput } from "@/app/_services/bookingServiceApi";
import { useRouter } from "next/navigation";
import { EventForm } from "@/app/components";
import { EventFormData } from "@/app/components/shared/EventForm";
import { useUpdateEvent, useCreateEvent } from "@/app/hooks/useEvents";
import { useCreateBooking } from "@/app/hooks/useBookings";

export default function EventsPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";
  const router = useRouter();

  const { data: eventsData, isPending, error } = useEvents();
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [event, setEvent] = useState<EventType | null>(null);

  const { mutate: createBooking, isPending: isLoadingBooking } =
    useCreateBooking();

  const { mutate: createEvent, isPending: isCreatingEventLoading } =
    useCreateEvent();
  const { mutate: updateEvent, isPending: isUpdatingEventLoading } =
    useUpdateEvent();

  const closeModal = () => {
    setIsViewModalOpen(false);
    setIsEditModalOpen(false);
    setIsAddModalOpen(false);
    setEvent(null);
  };

  const onView = (event: EventType) => {
    setIsViewModalOpen(true);
    setEvent(event);
  };

  const onEdit = (event: EventType) => {
    setIsEditModalOpen(true);
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

  const handleUpdateEvent = (formData: EventFormData) => {
    if (event) {
      updateEvent({ id: event.id, eventData: formData });
    }
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
            {isAdmin && (
              <Button
                className="hover:bg-purple-700 cursor-pointer rounded-md"
                onClick={() => setIsAddModalOpen(true)}
              >
                Add Event
              </Button>
            )}
          </div>
          {eventsData?.data && (
            <Table
              columns={EventColumns(onView, onEdit, isAdmin)}
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
          isOpen={isViewModalOpen}
          onClose={() => {
            setIsViewModalOpen(false);
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
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEvent(null);
          }}
        >
          {event && (
            <EventForm
              mode="edit"
              event={event}
              onSubmit={handleUpdateEvent}
              onCancel={() => closeModal()}
              isLoading={isUpdatingEventLoading}
            />
          )}
        </Modal>
        <Modal
          title="Add Event"
          isOpen={isAddModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            setEvent(null);
          }}
        >
          <EventForm
            mode="create"
            onSubmit={createEvent}
            onCancel={() => closeModal()}
            isLoading={isCreatingEventLoading}
          />
        </Modal>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
