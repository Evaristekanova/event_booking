import {
  Booking,
  CreateBookingInput,
  UpdateBookingInput,
  BookingStats,
} from "../../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface BookingsResponse {
  bookings: Booking[];
}

// Get all bookings (admin only)
export const getAllBookingsApi = async (token: string) => {
  try {
    const response = await fetch(`${API_URL}/api/v1/bookings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || "Failed to fetch bookings");
    }

    return await response.json();
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
};

// Get user's own bookings
export const getUserBookingsApi = async (token: string) => {
  try {
    const response = await fetch(`${API_URL}/api/v1/bookings/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || "Failed to fetch user bookings");
    }
    return await response.json();
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
};

// Get booking by ID
export const getBookingByIdApi = async (
  id: string,
  token: string
): Promise<Booking> => {
  try {
    const response = await fetch(`${API_URL}/api/v1/bookings/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || "Failed to fetch booking");
    }

    const result = await response.json();

    // Extract data from backend response structure
    if (result.success && result.data) {
      return result.data;
    } else {
      throw new Error("Invalid response structure from server");
    }
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
};

// Create new booking
export const createBookingApi = async (
  bookingData: CreateBookingInput,
  token: string
): Promise<Booking> => {
  try {
    const response = await fetch(`${API_URL}/api/v1/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || "Failed to create booking");
    }

    const result = await response.json();

    // Extract data from backend response structure
    if (result.success && result.data) {
      return result.data;
    } else {
      throw new Error("Invalid response structure from server");
    }
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
};

// Update booking
export const updateBookingApi = async (
  id: string,
  bookingData: UpdateBookingInput,
  token: string
): Promise<Booking> => {
  try {
    const response = await fetch(`${API_URL}/api/v1/bookings/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || "Failed to update booking");
    }

    const result = await response.json();

    // Extract data from backend response structure
    if (result.success && result.data) {
      return result.data;
    } else {
      throw new Error("Invalid response structure from server");
    }
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
};

// Cancel booking
export const cancelBookingApi = async (
  id: string,
  token: string
): Promise<Booking> => {
  try {
    const response = await fetch(`${API_URL}/api/v1/bookings/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || "Failed to cancel booking");
    }

    const result = await response.json();

    // Extract data from backend response structure
    if (result.success && result.data) {
      return result.data;
    } else {
      throw new Error("Invalid response structure from server");
    }
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
};

// Get booking statistics (admin only)
export const getBookingStatsApi = async (
  token: string
): Promise<BookingStats> => {
  try {
    const response = await fetch(`${API_URL}/api/v1/bookings/stats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData?.message || "Failed to fetch booking statistics"
      );
    }

    const result = await response.json();

    // Extract data from backend response structure
    if (result.success && result.data) {
      return result.data;
    } else {
      throw new Error("Invalid response structure from server");
    }
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
};
