import { PrismaClient } from "@prisma/client";
import {
  CreateBookingInput,
  UpdateBookingInput,
} from "../validations/bookingValidation";

const prisma = new PrismaClient();

export const createBooking = async (
  data: CreateBookingInput,
  userId: string,
) => {
  // Check if event exists and has capacity
  const event = await prisma.event.findUnique({
    where: { id: data.eventId },
  });

  if (!event) {
    throw new Error("Event not found");
  }

  // Check if event is full
  const currentBookings = await prisma.booking.count({
    where: { eventId: data.eventId },
  });

  if (currentBookings + data.quantity > event.capacity) {
    throw new Error("Event is at full capacity");
  }

  // Check if user already has a booking for this event
  const existingBooking = await prisma.booking.findFirst({
    where: {
      eventId: data.eventId,
      userId,
    },
  });

  if (existingBooking) {
    throw new Error("You already have a booking for this event");
  }

  const booking = await prisma.booking.create({
    data: {
      eventId: data.eventId,
      userId,
      ticketType: data.ticketType,
      quantity: data.quantity,
      totalAmount: data.totalAmount,
    },
    include: {
      event: {
        select: {
          id: true,
          title: true,
          date: true,
          time: true,
          location: true,
        },
      },
      user: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },
    },
  });

  return booking;
};

export const getBookingById = async (id: string) => {
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: {
      event: {
        select: {
          id: true,
          title: true,
          date: true,
          time: true,
          location: true,
        },
      },
      user: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  return booking;
};

export const getUserBookings = async (userId: string) => {
  const [bookings, total] = await Promise.all([
    prisma.booking.findMany({
      where: { userId },
      include: {
        event: {
          select: {
            id: true,
            title: true,
            date: true,
            time: true,
            location: true,
          },
        },
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.booking.count({ where: { userId } }),
  ]);

  return {
    bookings,
  };
};

export const getAllBookings = async (page: number = 1, limit: number = 10) => {
  const skip = (page - 1) * limit;

  const [bookings, total] = await Promise.all([
    prisma.booking.findMany({
      skip,
      take: limit,
      include: {
        event: {
          select: {
            id: true,
            title: true,
            date: true,
            time: true,
            location: true,
          },
        },
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.booking.count(),
  ]);

  return {
    bookings,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const updateBooking = async (
  id: string,
  data: UpdateBookingInput,
  userId: string,
) => {
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: {
      event: {
        select: {
          organizerId: true,
        },
      },
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  // Users can only update their own bookings, organizers can update any booking for their events
  if (booking.userId !== userId && booking.event.organizerId !== userId) {
    throw new Error(
      "You can only update your own bookings or bookings for events you organize",
    );
  }

  const updatedBooking = await prisma.booking.update({
    where: { id },
    data,
    include: {
      event: {
        select: {
          id: true,
          title: true,
          date: true,
          time: true,
          location: true,
        },
      },
      user: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },
    },
  });

  return updatedBooking;
};

export const cancelBooking = async (id: string, userId: string) => {
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: {
      event: {
        select: {
          organizerId: true,
        },
      },
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  // Users can only cancel their own bookings, organizers can cancel any booking for their events
  if (booking.userId !== userId && booking.event.organizerId !== userId) {
    throw new Error(
      "You can only cancel your own bookings or bookings for events you organize",
    );
  }

  const updatedBooking = await prisma.booking.update({
    where: { id },
    data: { status: "CANCELLED" },
    include: {
      event: {
        select: {
          id: true,
          title: true,
          date: true,
          time: true,
          location: true,
        },
      },
      user: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },
    },
  });

  return updatedBooking;
};

export const getBookingStats = async () => {
  const [totalBookings, confirmedBookings, cancelledBookings, totalRevenue] =
    await Promise.all([
      prisma.booking.count(),
      prisma.booking.count({ where: { status: "CONFIRMED" } }),
      prisma.booking.count({ where: { status: "CANCELLED" } }),
      prisma.booking.aggregate({
        where: { status: "CONFIRMED" },
        _sum: { totalAmount: true },
      }),
    ]);

  return {
    totalBookings,
    confirmedBookings,
    cancelledBookings,
    totalRevenue: totalRevenue._sum.totalAmount || 0,
  };
};
