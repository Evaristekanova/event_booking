import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDashboardStats = async () => {
  const [totalEvents, totalBookings, totalUsers, totalRevenue] = await Promise.all([
    prisma.event.count(),
    prisma.booking.count({ where: { status: "CONFIRMED" } }),
    prisma.user.count(),
    prisma.booking.aggregate({
      where: { status: "CONFIRMED" },
      _sum: { totalAmount: true },
    }),
  ]);

  return {
    totalEvents,
    activeBookings: totalBookings,
    totalRevenue: totalRevenue._sum.totalAmount || 0,
    newUsers: totalUsers, // For now, just total users
  };
};

export const getRecentActivities = async (limit: number = 10) => {
  // Get recent events
  const recentEvents = await prisma.event.findMany({
    take: limit,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      createdAt: true,
      organizer: {
        select: {
          fullName: true,
        },
      },
    },
  });

  // Get recent bookings
  const recentBookings = await prisma.booking.findMany({
    take: limit,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      createdAt: true,
      user: {
        select: {
          fullName: true,
        },
      },
      event: {
        select: {
          title: true,
        },
      },
    },
  });

  // Get recent user registrations
  const recentUsers = await prisma.user.findMany({
    take: limit,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      fullName: true,
      createdAt: true,
    },
  });

  // Combine and sort all activities
  const activities = [
    ...recentEvents.map(event => ({
      id: event.id,
      type: "event_created" as const,
      description: `New event "${event.title}" created`,
      timestamp: event.createdAt.toISOString(),
      userId: event.organizer.fullName,
      userName: event.organizer.fullName,
    })),
    ...recentBookings.map(booking => ({
      id: booking.id,
      type: "booking_made" as const,
      description: `Booking made for "${booking.event.title}"`,
      timestamp: booking.createdAt.toISOString(),
      userId: booking.user.fullName,
      userName: booking.user.fullName,
    })),
    ...recentUsers.map(user => ({
      id: user.id,
      type: "user_registered" as const,
      description: `New user "${user.fullName}" registered`,
      timestamp: user.createdAt.toISOString(),
      userId: user.fullName,
      userName: user.fullName,
    })),
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return activities.slice(0, limit);
};

export const getUpcomingEvents = async (limit: number = 5) => {
  const events = await prisma.event.findMany({
    where: {
      date: {
        gte: new Date(),
      },
    },
    include: {
      bookings: {
        select: {
          id: true,
        },
      },
    },
    orderBy: { date: "asc" },
    take: limit,
  });

  return events.map(event => ({
    id: event.id,
    title: event.title,
    date: event.date.toISOString().split('T')[0],
    time: event.time,
    location: event.location,
    attendees: event.bookings.length,
    capacity: event.capacity,
  }));
};

export const getMonthlyAnalytics = async (year: number = new Date().getFullYear()) => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const monthlyData = [];

  for (let month = 0; month < 12; month++) {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);

    const [events, bookings, revenue] = await Promise.all([
      prisma.event.count({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      }),
      prisma.booking.count({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      }),
      prisma.booking.aggregate({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
          status: "CONFIRMED",
        },
        _sum: { totalAmount: true },
      }),
    ]);

    monthlyData.push({
      month: months[month],
      events,
      bookings,
      revenue: revenue._sum.totalAmount || 0,
    });
  }

  return monthlyData;
};

export const getCategoryAnalytics = async () => {
  const categories = await prisma.event.groupBy({
    by: ['category'],
    _count: {
      id: true,
    },
    _sum: {
      price: true,
    },
  });

  const categoryData = [];

  for (const category of categories) {
    const bookings = await prisma.booking.count({
      where: {
        event: {
          category: category.category,
        },
      },
    });

    const revenue = await prisma.booking.aggregate({
      where: {
        event: {
          category: category.category,
        },
        status: "CONFIRMED",
      },
      _sum: { totalAmount: true },
    });

    categoryData.push({
      category: category.category,
      events: category._count.id,
      bookings,
      revenue: revenue._sum.totalAmount || 0,
    });
  }

  return categoryData;
};

export const getTopEvents = async (limit: number = 5) => {
  const events = await prisma.event.findMany({
    include: {
      bookings: {
        where: { status: "CONFIRMED" },
        select: { id: true, totalAmount: true },
      },
    },
    orderBy: {
      bookings: {
        _count: "desc",
      },
    },
    take: limit,
  });

  return events.map(event => ({
    title: event.title,
    bookings: event.bookings.length,
    revenue: event.bookings.reduce((sum, booking) => sum + Number(booking.totalAmount), 0),
    attendance: Math.round((event.bookings.length / event.capacity) * 100),
  }));
};
