import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  getEventsApi,
  getEventByIdApi,
  createEventApi,
  updateEventApi,
  deleteEventApi,
  getEventsByCategoryApi,
  getUpcomingEventsApi,
  type Event,
  type CreateEventInput,
  type UpdateEventInput,
} from "../_services/eventServiceApi";
import { useAuth } from "../contexts/AuthContext";

// Query keys


// Hook for getting all events with pagination
export const useEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: () => getEventsApi(),
  });
};

// Hook for getting a single event by ID
export const useEvent = (id: string) => {
  return useQuery({
    queryKey: ["event", id],
    queryFn: () => getEventByIdApi(id),
    enabled: !!id,
  });
};

// Hook for getting events by category
export const useEventsByCategory = (category: string) => {
  return useQuery({
    queryKey: ["events", category],
    queryFn: () => getEventsByCategoryApi(category),
    enabled: !!category && category !== "all",
  });
};

// Hook for getting upcoming events
export const useUpcomingEvents = () => {
  return useQuery({
    queryKey: ["upcoming-events"],
    queryFn: () => getUpcomingEventsApi(),

  });
};

// Hook for creating a new event
export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: (eventData: CreateEventInput) =>
      createEventApi(eventData, token!),
    onSuccess: () => {
      toast.success("Event created successfully!");
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create event");
    },
  });
};

// Hook for updating an event
export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: ({
      id,
      eventData,
    }: {
      id: string;
      eventData: UpdateEventInput;
    }) => updateEventApi(id, eventData, token!),
    onSuccess: (updatedEvent) => {
      toast.success("Event updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({
        queryKey: ["event", updatedEvent.id],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update event");
    },
  });
};

// Hook for deleting an event
export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: (id: string) => deleteEventApi(id, token!),
    onSuccess: () => {
      toast.success("Event deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete event");
    },
  });
};

// Hook for managing event status
export const useUpdateEventStatus = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Event["status"] }) =>
      updateEventApi(id, { status }, token!),
    onSuccess: (updatedEvent) => {
      toast.success(
        `Event status updated to ${updatedEvent.status.toLowerCase()}`
      );
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({
        queryKey: ["event", updatedEvent.id],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update event status");
    },
  });
};
