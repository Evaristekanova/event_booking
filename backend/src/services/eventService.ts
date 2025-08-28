import { PrismaClient, Event } from "@prisma/client";
import {
  CreateEventInput,
  UpdateEventInput,
} from "../validations/eventValidation";

const prisma = new PrismaClient();

export const createEvent = async (
  data: CreateEventInput,
  organizerId: string,
) => {
  const event = await prisma.event.create({
    data: {
      ...data,
      date: new Date(data.date),
      organizerId,
    },
    include: {
      organizer: {
        select: {
          id: true,
          fullName: true,
        },
      },
    },
  });

  return event;
};

export const getAllEvents = async () => {
  const [events, total] = await Promise.all([
    prisma.event.findMany({
      include: {
        organizer: {
          select: {
            id: true,
            fullName: true,
          },
        },
        bookings: {
          select: {
            id: true,
          },
        },
      },
      orderBy: { date: "asc" },
    }),
    prisma.event.count(),
  ]);

  return {
    events: events.map((event) => ({
      ...event,
      attendees: event.bookings.length,
    })),
  };
};

export const getEventById = async (id: string) => {
  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      organizer: {
        select: {
          id: true,
          fullName: true,
        },
      },
      bookings: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!event) {
    throw new Error("Event not found");
  }

  return {
    ...event,
    attendees: event.bookings.length,
  };
};

export const updateEvent = async (
  id: string,
  data: UpdateEventInput,
  organizerId: string,
) => {
  const event = await prisma.event.findUnique({
    where: { id },
  });

  if (!event) {
    throw new Error("Event not found");
  }

  if (event.organizerId !== organizerId) {
    throw new Error("You can only update events you created");
  }

  const updateData: any = { ...data };

  if (data.date) {
    updateData.date = new Date(data.date);
  }

  const updatedEvent = await prisma.event.update({
    where: { id },
    data: updateData,
    include: {
      organizer: {
        select: {
          id: true,
          fullName: true,
        },
      },
    },
  });

  return updatedEvent;
};

export const deleteEvent = async (id: string, organizerId: string) => {
  const event = await prisma.event.findUnique({
    where: { id },
  });

  if (!event) {
    throw new Error("Event not found");
  }

  if (event.organizerId !== organizerId) {
    throw new Error("You can only delete events you created");
  }

  await prisma.event.delete({
    where: { id },
  });

  return { message: "Event deleted successfully" };
};

export const getEventsByCategory = async (category: string) => {
  const events = await prisma.event.findMany({
    where: { category },
    include: {
      organizer: {
        select: {
          id: true,
          fullName: true,
        },
      },
      bookings: {
        select: {
          id: true,
        },
      },
    },
    orderBy: { date: "asc" },
  });

  return events.map((event) => ({
    ...event,
    attendees: event.bookings.length,
  }));
};

export const getUpcomingEvents = async (limit: number = 5) => {
  const events = await prisma.event.findMany({
    where: {
      date: {
        gte: new Date(),
      },
      // Don't filter by status to be more flexible
    },
    include: {
      organizer: {
        select: {
          id: true,
          fullName: true,
        },
      },
      bookings: {
        select: {
          id: true,
        },
      },
    },
    orderBy: { date: "asc" },
    take: limit,
  });

  return events.map((event) => ({
    ...event,
    attendees: event.bookings.length,
  }));
};
