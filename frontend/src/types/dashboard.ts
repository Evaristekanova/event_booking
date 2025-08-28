export interface DashboardStats {
  totalEvents: number;
  activeBookings: number;
  totalRevenue: number;
  newUsers: number;
}

export interface TopEvent {
  title: string;
  bookings: number;
  revenue: number;
  attendance: number;
}

export interface RecentActivity {
  id: string;
  type: "event_created" | "booking_made" | "user_registered";
  description: string;
  timestamp: string;
  userId: string;
  userName: string;
}

export interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  capacity: number;
  isBooked?: boolean;
}

export interface MonthlyAnalytics {
  month: string;
  events: number;
  bookings: number;
  revenue: number;
}

export interface CategoryAnalytics {
  category: string;
  events: number;
  bookings: number;
  revenue: number;
}
