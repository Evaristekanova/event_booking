// User Types
export interface CreateUserInput {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface UpdateUserInput {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  role?: 'USER' | 'ADMIN';
  status?: 'ACTIVE' | 'INACTIVE';
}

export interface UserResponse {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: 'USER' | 'ADMIN';
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  lastLogin?: string;
}

// Event Types
export interface CreateEventInput {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  price: number;
  category: string;
  imageUrl?: string;
}

export interface UpdateEventInput {
  title?: string;
  description?: string;
  date?: string;
  time?: string;
  location?: string;
  capacity?: number;
  price?: number;
  status?: 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
  category?: string;
  imageUrl?: string;
}

export interface EventResponse {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  attendees: number;
  price: number;
  status: 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
  category: string;
  imageUrl?: string;
  organizer: {
    id: string;
    fullName: string;
  };
  createdAt: string;
  updatedAt: string;
}

// Booking Types
export interface CreateBookingInput {
  eventId: string;
  ticketType: string;
  quantity: number;
  totalAmount: number;
}

export interface UpdateBookingInput {
  status?: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
}

export interface BookingResponse {
  id: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  attendeeName: string;
  attendeeEmail: string;
  bookingDate: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  amount: number;
  ticketType: string;
  quantity: number;
  event: {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
  };
  user: {
    id: string;
    fullName: string;
    email: string;
  };
}

// Dashboard Types
export interface DashboardStats {
  totalEvents: number;
  activeBookings: number;
  totalRevenue: number;
  newUsers: number;
}

export interface RecentActivity {
  id: string;
  type: 'event_created' | 'booking_made' | 'user_registered';
  description: string;
  timestamp: string;
  userId?: string;
  userName?: string;
}

export interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  capacity: number;
}

// Analytics Types
export interface MonthlyData {
  month: string;
  events: number;
  bookings: number;
  revenue: number;
}

export interface CategoryData {
  category: string;
  events: number;
  bookings: number;
  revenue: number;
}

export interface TopEvent {
  title: string;
  bookings: number;
  revenue: number;
  attendance: number;
}

// Common Types
export interface PaginationInput {
  page: number;
  limit: number;
}

export interface SearchInput {
  query: string;
  page?: number;
  limit?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
