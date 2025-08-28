import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  getAllBookingsApi,
  getUserBookingsApi,
  getBookingByIdApi,
  createBookingApi,
  updateBookingApi,
  cancelBookingApi,
  getBookingStatsApi,
  type Booking,
  type CreateBookingInput,
  type UpdateBookingInput,
} from "../_services/bookingServiceApi";
import { useAuth } from "../contexts/AuthContext";

// Query keys
export const bookingKeys = {
  all: ["bookings"] as const,
  lists: () => [...bookingKeys.all, "list"] as const,
  list: (filters: { page: number; limit: number }) =>
    [...bookingKeys.lists(), filters] as const,
  userList: (filters: { page: number; limit: number }) =>
    [...bookingKeys.all, "user", filters] as const,
  details: () => [...bookingKeys.all, "detail"] as const,
  detail: (id: string) => [...bookingKeys.details(), id] as const,
  stats: () => [...bookingKeys.all, "stats"] as const,
};

// Hook for getting all bookings (admin only)
export const useAllBookings = (page: number = 1, limit: number = 10) => {
  const { token, isAdmin } = useAuth();
  return useQuery({
    queryKey: bookingKeys.list({ page, limit }),
    queryFn: () => getAllBookingsApi(token!),
    enabled: !!token && isAdmin,
  });
};

// Hook for getting user's own bookings
export const useUserBookings = () => {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["user-bookings"],
    queryFn: () => getUserBookingsApi(token!),
    enabled: !!token,
  });
};

// Hook for getting a single booking by ID
export const useBooking = (id: string) => {
  const { token } = useAuth();

  return useQuery({
    queryKey: bookingKeys.detail(id),
    queryFn: () => getBookingByIdApi(id, token!),
    enabled: !!id && !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook for getting booking statistics (admin only)
export const useBookingStats = () => {
  const { token, isAdmin } = useAuth();

  return useQuery({
    queryKey: bookingKeys.stats(),
    queryFn: () => getBookingStatsApi(token!),
    enabled: !!token && isAdmin,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook for creating a new booking
export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: (bookingData: CreateBookingInput) =>
      createBookingApi(bookingData, token!),
    onSuccess: () => {
      toast.success("Booking created successfully!");
      queryClient.invalidateQueries({ queryKey: bookingKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: bookingKeys.userList({ page: 1, limit: 10 }),
      });
      queryClient.invalidateQueries({ queryKey: bookingKeys.stats() });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create booking");
    },
  });
};

// Hook for updating a booking
export const useUpdateBooking = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: ({
      id,
      bookingData,
    }: {
      id: string;
      bookingData: UpdateBookingInput;
    }) => updateBookingApi(id, bookingData, token!),
    onSuccess: (updatedBooking) => {
      toast.success("Booking updated successfully!");
      queryClient.invalidateQueries({ queryKey: bookingKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: bookingKeys.userList({ page: 1, limit: 10 }),
      });
      queryClient.invalidateQueries({
        queryKey: bookingKeys.detail(updatedBooking.id),
      });
      queryClient.invalidateQueries({ queryKey: bookingKeys.stats() });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update booking");
    },
  });
};

// Hook for cancelling a booking
export const useCancelBooking = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: (id: string) => cancelBookingApi(id, token!),
    onSuccess: () => {
      toast.success("Booking cancelled successfully!");
      queryClient.invalidateQueries({ queryKey: bookingKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: bookingKeys.userList({ page: 1, limit: 10 }),
      });
      queryClient.invalidateQueries({ queryKey: bookingKeys.stats() });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to cancel booking");
    },
  });
};

// Hook for confirming a booking (admin only)
export const useConfirmBooking = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: (id: string) =>
      updateBookingApi(id, { status: "CONFIRMED" }, token!),
    onSuccess: (updatedBooking) => {
      toast.success("Booking confirmed successfully!");
      queryClient.invalidateQueries({ queryKey: bookingKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: bookingKeys.userList({ page: 1, limit: 10 }),
      });
      queryClient.invalidateQueries({
        queryKey: bookingKeys.detail(updatedBooking.id),
      });
      queryClient.invalidateQueries({ queryKey: bookingKeys.stats() });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to confirm booking");
    },
  });
};

// Hook for completing a booking (admin only)
export const useCompleteBooking = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: (id: string) =>
      updateBookingApi(id, { status: "COMPLETED" }, token!),
    onSuccess: (updatedBooking) => {
      toast.success("Booking marked as completed!");
      queryClient.invalidateQueries({ queryKey: bookingKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: bookingKeys.userList({ page: 1, limit: 10 }),
      });
      queryClient.invalidateQueries({
        queryKey: bookingKeys.detail(updatedBooking.id),
      });
      queryClient.invalidateQueries({ queryKey: bookingKeys.stats() });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to complete booking");
    },
  });
};
