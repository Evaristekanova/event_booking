import Loader from "@/app/components/shared/Loader";
import dynamic from "next/dynamic";

// Lazy load the dashboard page
export const DashboardPage = dynamic(() => import("./page"), {
  loading: () => <Loader />,
  ssr: false,
});

export const EventsPage = dynamic(() => import("./events/page"), {
  loading: () => <Loader />,
});

export const BookingsPage = dynamic(() => import("./bookings/page"), {
  loading: () => <Loader />,
});

export const UsersPage = dynamic(() => import("./users/page"), {
  loading: () => <Loader />,
});

export const CalendarPage = dynamic(() => import("./calendar/page"), {
  loading: () => <Loader />,
});
