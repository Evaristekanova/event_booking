// Components
export { ProtectedRoute } from "./ProtectedRoute";
export { default as EventForm } from "./shared/EventForm";
export {
  useLocalStorage,
  useLocalStorageString,
  useLocalStorageNumber,
  useLocalStorageBoolean,
  useLocalStorageObject,
  useLocalStorageArray,
} from "../hooks/useLocalStorage";

export {
  useLogin,
  useRegister,
  useLogout,
  useProfile,
  useUpdateProfile,
  useUsers,
  useUserById,
  useActivateUser,
  useDeactivateUser,
} from "../hooks/useUsers";
export { useEvents, useCreateEvent, useUpdateEvent } from "../hooks/useEvents";
export {
  useAllBookings,
  useUserBookings,
  useBooking,
  useCreateBooking,
  useUpdateBooking,
  useCancelBooking,
  useBookingStats,
} from "../hooks/useBookings";
export { useOutsideClick } from "../hooks/useClickOutside";
export {
  useDashboardStats,
  useTopEvents,
  useRecentActivities,
  useUpcomingEvents,
  useMonthlyAnalytics,
  useCategoryAnalytics,
} from "../hooks/useDashboard";
