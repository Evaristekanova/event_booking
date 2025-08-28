import {  CreateEventInput, UpdateEventInput, Event } from "../../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface EventsResponse {
  events: Event[];
}

// Get all events with pagination
export const getEventsApi = async () => {
  try {
    const response = await fetch(`${API_URL}/api/v1/events`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || "Failed to fetch events");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("API: Error fetching events:", error);
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
};

export const getEventByIdApi = async (id: string): Promise<Event> => {
  try {
    const response = await fetch(`${API_URL}/api/v1/events/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || "Failed to fetch event");
    }

    return await response.json();
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
};

// Create new event
export const createEventApi = async (
  eventData: CreateEventInput,
  token: string
): Promise<Event> => {
  try {
    const response = await fetch(`${API_URL}/api/v1/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || "Failed to create event");
    }

    return await response.json();
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
};

// Update event
export const updateEventApi = async (
  id: string,
  eventData: UpdateEventInput,
  token: string
): Promise<Event> => {
  try {
    const response = await fetch(`${API_URL}/api/v1/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || "Failed to update event");
    }

    return await response.json();
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
};

// Delete event
export const deleteEventApi = async (
  id: string,
  token: string
): Promise<{ message: string }> => {
  try {
    const response = await fetch(`${API_URL}/api/v1/events/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || "Failed to delete event");
    }

    return await response.json();
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
};

// Get events by category
export const getEventsByCategoryApi = async (
  category: string
): Promise<Event[]> => {
  try {
    const response = await fetch(
      `${API_URL}/api/v1/events/category/${category}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData?.message || "Failed to fetch events by category"
      );
    }

    return await response.json();
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
};

// Get upcoming events
export const getUpcomingEventsApi = async (
  limit: number = 5
): Promise<Event[]> => {
  try {
    const response = await fetch(
      `${API_URL}/api/v1/events/upcoming?limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || "Failed to fetch upcoming events");
    }

    return await response.json();
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
};
