"use client";

import { ProtectedRoute } from "../../../components/ProtectedRoute";
import { DashboardLayout } from "../../../components/DashboardLayout";
import { useAuth } from "../../../contexts/AuthContext";
import { useEvents } from "../../../hooks/useEvents";
import { EventFormData, Event as EventType } from "@/types";
import Table from "@/app/components/table/table";
import { EventColumns } from "./EventColumn";
import Loader from "@/app/components/shared/Loader";
import Button from "@/app/components/shared/Button";
import { useEffect, useState } from "react";
import Modal from "@/app/components/shared/Modal";
import { EventCard } from "@/app/components/EventCard";
import { EventForm } from "@/app/components";
import { useUpdateEvent, useCreateEvent } from "@/app/hooks/useEvents";
import { useCreateBooking } from "@/app/hooks/useBookings";
import { toast } from "react-toastify";
import { CreateBookingInput } from "@/types";
export default function EventsPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  const { data: eventsData, isPending, error } = useEvents();
  const [events, setEvents] = useState<EventType[]>([]);
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
    const today = new Date();
    const eventDate = new Date(event.date);
    if (eventDate < today) {
      toast.error("You cannot book an event that has already happened");
      return;
    }
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
      updateEvent(
        { id: event.id, eventData: formData },
        {
          onSuccess: () => {
            closeModal();
          },
        }
      );
    }
  };

  useEffect(() => {
    if (isAdmin) {
      const adminEvents = eventsData?.data?.events?.filter((event: EventType) =>
        event.organizer?.id === user?.id ? event : null
      );
      setEvents(adminEvents || []);
    } else {
      setEvents(eventsData?.data.events || []);
    }
  }, [eventsData, isAdmin, user]);

  if (isPending) {
    return <Loader className="h-[80vh]" />;
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="px-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">
              {isAdmin
                ? "Check out the events you have created"
                : "Check out our Events"}
            </h1>
            {isAdmin && (
              <Button
                className="hover:bg-purple-700 cursor-pointer rounded-md"
                onClick={() => setIsAddModalOpen(true)}
              >
                Add Event
              </Button>
            )}
          </div>
          {eventsData && (
            <Table
              columns={EventColumns(onView, onEdit, isAdmin)}
              data={events}
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
                  setIsViewModalOpen(false);
                  onEdit(event);
                }
              }}
              isLoading={isLoadingBooking}
            />
          )}
        </Modal>
        <Modal
          title="Edit Event"
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
