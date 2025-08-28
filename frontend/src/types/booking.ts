export interface Booking {
  id: string;
  eventId: string;
  userId: string;
  ticketType: string;
  quantity: number;
  totalAmount: number;
  status: BookingStatus;
  bookingDate: string;
  createdAt: string;
  updatedAt: string;
  event?: {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    capacity: number;
    price: number;
    description: string;
    status: string;
    imageUrl?: string;
    category: string;
  };
  user?: {
    id: string;
    fullName: string;
    email: string;
  };
}

export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

export interface CreateBookingInput {
  eventId: string;
  ticketType: string;
  quantity: number;
  totalAmount: number;
}

export interface UpdateBookingInput {
  ticketType?: string;
  quantity?: number;
  totalAmount?: number;
  status?: BookingStatus;
}

export interface BookingStats {
  totalBookings: number;
  confirmedBookings: number;
  pendingBookings: number;
  cancelledBookings: number;
  totalRevenue: number;
}
