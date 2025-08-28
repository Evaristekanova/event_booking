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

// Lazy Loading Components
export { default as LazyLoader } from "./shared/LazyLoader";
export { default as LazyImage } from "./shared/LazyImage";
export { default as LazyTable } from "./shared/LazyTable";

// Lazy Loading Hooks
export { useInfiniteScroll, useInfiniteData } from "../hooks/useInfiniteScroll";
export { useLazyDashboard } from "../hooks/useLazyDashboard";
