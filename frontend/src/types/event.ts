export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  price: number;
  status: EventStatus;
  category: string;
  imageUrl?: string;
  organizerId: string;
  createdAt: string;
  updatedAt: string;
  attendees?: number;
  organizer?: {
    id: string;
    fullName: string;
  };
}

export type EventStatus = "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED";

export interface CreateEventInput {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  price: number;
  status?: EventStatus;
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
  status?: EventStatus;
  category?: string;
  imageUrl?: string;
}

export interface EventFormData {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  price: number;
  status: EventStatus;
  category: string;
  imageUrl?: string;
}
