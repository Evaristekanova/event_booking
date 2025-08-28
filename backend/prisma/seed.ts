import {
  PrismaClient,
  Role,
  Status,
  EventStatus,
  BookingStatus,
} from "@prisma/client";
import { hashPassword } from "../src/helpers/bycrpt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // Clear existing data
  await prisma.booking.deleteMany();
  await prisma.event.deleteMany();
  await prisma.user.deleteMany();

  console.log("🧹 Cleared existing data");

  // Create users
  const users = await Promise.all([
    // Admin users
    prisma.user.create({
      data: {
        fullName: "Admin User",
        email: "admin@example.com",
        phone: "+1234567890",
        password: await hashPassword("admin123"),
        role: Role.ADMIN,
        status: Status.ACTIVE,
      },
    }),
    prisma.user.create({
      data: {
        fullName: "Sarah Johnson",
        email: "sarah@example.com",
        phone: "+1234567891",
        password: await hashPassword("password123"),
        role: Role.ADMIN,
        status: Status.ACTIVE,
      },
    }),

    // Regular users
    prisma.user.create({
      data: {
        fullName: "John Doe",
        email: "john@example.com",
        phone: "+1234567892",
        password: await hashPassword("password123"),
        role: Role.USER,
        status: Status.ACTIVE,
      },
    }),
    prisma.user.create({
      data: {
        fullName: "Jane Smith",
        email: "jane@example.com",
        phone: "+1234567893",
        password: await hashPassword("password123"),
        role: Role.USER,
        status: Status.ACTIVE,
      },
    }),
    prisma.user.create({
      data: {
        fullName: "Mike Wilson",
        email: "mike@example.com",
        phone: "+1234567894",
        password: await hashPassword("password123"),
        role: Role.USER,
        status: Status.ACTIVE,
      },
    }),
    prisma.user.create({
      data: {
        fullName: "Emily Davis",
        email: "emily@example.com",
        phone: "+1234567895",
        password: await hashPassword("password123"),
        role: Role.USER,
        status: Status.ACTIVE,
      },
    }),
    prisma.user.create({
      data: {
        fullName: "David Brown",
        email: "david@example.com",
        phone: "+1234567896",
        password: await hashPassword("password123"),
        role: Role.USER,
        status: Status.ACTIVE,
      },
    }),
    prisma.user.create({
      data: {
        fullName: "Lisa Anderson",
        email: "lisa@example.com",
        phone: "+1234567897",
        password: await hashPassword("password123"),
        role: Role.USER,
        status: Status.ACTIVE,
      },
    }),
    prisma.user.create({
      data: {
        fullName: "Tom Martinez",
        email: "tom@example.com",
        phone: "+1234567898",
        password: await hashPassword("password123"),
        role: Role.USER,
        status: Status.ACTIVE,
      },
    }),
    prisma.user.create({
      data: {
        fullName: "Anna Taylor",
        email: "anna@example.com",
        phone: "+1234567899",
        password: await hashPassword("password123"),
        role: Role.USER,
        status: Status.ACTIVE,
      },
    }),
  ]);

  console.log(`👥 Created ${users.length} users`);

  // Create events
  const events = await Promise.all([
    // Tech events
    prisma.event.create({
      data: {
        title: "Tech Conference 2024",
        description:
          "Join us for the biggest tech conference of the year featuring keynote speakers, workshops, and networking opportunities.",
        date: new Date("2025-09-15"),
        time: "09:00",
        location: "Convention Center, Downtown",
        capacity: 500,
        price: 299.99,
        status: EventStatus.UPCOMING,
        category: "Technology",
        imageUrl:
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
        organizerId: users[0].id, // Admin user
      },
    }),
    prisma.event.create({
      data: {
        title: "Web Development Workshop",
        description:
          "Learn modern web development techniques including React, Node.js, and database design.",
        date: new Date("2025-08-27"),
        time: "14:00",
        location: "Tech Hub, Innovation District",
        capacity: 50,
        price: 149.99,
        status: EventStatus.UPCOMING,
        category: "Technology",
        imageUrl:
          "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800",
        organizerId: users[1].id, // Sarah Johnson
      },
    }),
    prisma.event.create({
      data: {
        title: "AI & Machine Learning Summit",
        description:
          "Explore the latest developments in artificial intelligence and machine learning with industry experts.",
        date: new Date("2025-08-27"),
        time: "10:00",
        location: "University Auditorium",
        capacity: 300,
        price: 199.99,
        status: EventStatus.UPCOMING,
        category: "Technology",
        imageUrl:
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
        organizerId: users[0].id, // Admin user
      },
    }),

    // Business events
    prisma.event.create({
      data: {
        title: "Startup Networking Mixer",
        description:
          "Connect with fellow entrepreneurs, investors, and industry professionals in a relaxed networking environment.",
        date: new Date("2025-08-26"),
        time: "18:00",
        location: "Rooftop Lounge, Business District",
        capacity: 100,
        price: 49.99,
        status: EventStatus.UPCOMING,
        category: "Business",
        imageUrl:
          "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800",
        organizerId: users[2].id, // John Doe
      },
    }),
    prisma.event.create({
      data: {
        title: "Business Strategy Workshop",
        description:
          "Develop your business strategy with proven frameworks and real-world case studies.",
        date: new Date("2025-12-10"),
        time: "13:00",
        location: "Business School, Main Campus",
        capacity: 75,
        price: 179.99,
        status: EventStatus.UPCOMING,
        category: "Business",
        imageUrl:
          "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
        organizerId: users[1].id, // Sarah Johnson
      },
    }),

    // Arts & Culture events
    prisma.event.create({
      data: {
        title: "Art Gallery Opening",
        description:
          "Experience contemporary art from local and international artists in this exclusive gallery opening.",
        date: new Date("2025-08-31"),
        time: "19:00",
        location: "Modern Art Gallery, Arts District",
        capacity: 150,
        price: 79.99,
        status: EventStatus.UPCOMING,
        category: "Arts & Culture",
        imageUrl:
          "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800",
        organizerId: users[3].id, // Jane Smith
      },
    }),
    prisma.event.create({
      data: {
        title: "Classical Music Concert",
        description:
          "Enjoy an evening of classical music performed by the city symphony orchestra.",
        date: new Date("2025-08-29"),
        time: "20:00",
        location: "City Concert Hall",
        capacity: 800,
        price: 89.99,
        status: EventStatus.UPCOMING,
        category: "Arts & Culture",
        imageUrl:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
        organizerId: users[4].id, // Mike Wilson
      },
    }),

    // Sports events
    prisma.event.create({
      data: {
        title: "Marathon 2025",
        description:
          "Join thousands of runners in the annual city marathon through scenic routes and historic landmarks.",
        date: new Date("2024-08-30"),
        time: "07:00",
        location: "City Park, Starting Line",
        capacity: 2000,
        price: 89.99,
        status: EventStatus.UPCOMING,
        category: "Sports",
        imageUrl:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
        organizerId: users[0].id, // Admin user
      },
    }),
    prisma.event.create({
      data: {
        title: "Yoga Retreat",
        description:
          "A weekend of relaxation, meditation, and yoga practice in a peaceful natural setting.",
        date: new Date("2024-12-08"),
        time: "08:00",
        location: "Mountain Retreat Center",
        capacity: 60,
        price: 299.99,
        status: EventStatus.UPCOMING,
        category: "Sports",
        imageUrl:
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
        organizerId: users[5].id, // Emily Davis
      },
    }),

    // Food & Drink events
    prisma.event.create({
      data: {
        title: "Food & Wine Festival",
        description:
          "Sample gourmet dishes and fine wines from the region's best restaurants and wineries.",
        date: new Date("2024-12-12"),
        time: "16:00",
        location: "Riverside Park",
        capacity: 400,
        price: 129.99,
        status: EventStatus.UPCOMING,
        category: "Food & Drink",
        imageUrl:
          "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
        organizerId: users[6].id, // David Brown
      },
    }),
    prisma.event.create({
      data: {
        title: "Cooking Masterclass",
        description:
          "Learn to cook authentic Italian cuisine from a master chef in this hands-on cooking class.",
        date: new Date("2024-11-22"),
        time: "15:00",
        location: "Culinary Institute",
        capacity: 25,
        price: 199.99,
        status: EventStatus.UPCOMING,
        category: "Food & Drink",
        imageUrl:
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
        organizerId: users[7].id, // Lisa Anderson
      },
    }),

    // Education events
    prisma.event.create({
      data: {
        title: "Language Learning Workshop",
        description:
          "Master a new language in just one day with our intensive language learning workshop.",
        date: new Date("2024-12-03"),
        time: "09:00",
        location: "Language Center, University",
        capacity: 40,
        price: 99.99,
        status: EventStatus.UPCOMING,
        category: "Education",
        imageUrl:
          "https://images.unsplash.com/photo-1523050854058-8df90110c9e1?w=800",
        organizerId: users[8].id, // Tom Martinez
      },
    }),
    prisma.event.create({
      data: {
        title: "Public Speaking Seminar",
        description:
          "Build confidence and improve your public speaking skills with professional guidance.",
        date: new Date("2024-11-27"),
        time: "10:00",
        location: "Conference Room A, Business Center",
        capacity: 60,
        price: 149.99,
        status: EventStatus.UPCOMING,
        category: "Education",
        imageUrl:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
        organizerId: users[9].id, // Anna Taylor
      },
    }),

    // Completed events
    prisma.event.create({
      data: {
        title: "Summer Music Festival",
        description:
          "A celebration of music featuring local bands and international artists.",
        date: new Date("2024-08-15"),
        time: "14:00",
        location: "Central Park",
        capacity: 1000,
        price: 149.99,
        status: EventStatus.COMPLETED,
        category: "Arts & Culture",
        imageUrl:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
        organizerId: users[0].id, // Admin user
      },
    }),
    prisma.event.create({
      data: {
        title: "Tech Startup Pitch Competition",
        description:
          "Watch innovative startups pitch their ideas to a panel of investors and industry experts.",
        date: new Date("2024-09-20"),
        time: "13:00",
        location: "Innovation Hub",
        capacity: 200,
        price: 79.99,
        status: EventStatus.COMPLETED,
        category: "Business",
        imageUrl:
          "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800",
        organizerId: users[1].id, // Sarah Johnson
      },
    }),
  ]);

  console.log(`🎉 Created ${events.length} events`);

  // Create bookings
  const bookings = await Promise.all([
    // Tech Conference bookings
    prisma.booking.create({
      data: {
        eventId: events[0].id, // Tech Conference
        userId: users[2].id, // John Doe
        ticketType: "General Admission",
        quantity: 2,
        totalAmount: 599.98,
        status: BookingStatus.CONFIRMED,
      },
    }),
    prisma.booking.create({
      data: {
        eventId: events[0].id, // Tech Conference
        userId: users[3].id, // Jane Smith
        ticketType: "VIP Pass",
        quantity: 1,
        totalAmount: 399.99,
        status: BookingStatus.CONFIRMED,
      },
    }),
    prisma.booking.create({
      data: {
        eventId: events[0].id, // Tech Conference
        userId: users[4].id, // Mike Wilson
        ticketType: "General Admission",
        quantity: 1,
        totalAmount: 299.99,
        status: BookingStatus.PENDING,
      },
    }),

    // Web Development Workshop bookings
    prisma.booking.create({
      data: {
        eventId: events[1].id, // Web Development Workshop
        userId: users[2].id, // John Doe
        ticketType: "Student",
        quantity: 1,
        totalAmount: 149.99,
        status: BookingStatus.CONFIRMED,
      },
    }),
    prisma.booking.create({
      data: {
        eventId: events[1].id, // Web Development Workshop
        userId: users[5].id, // Emily Davis
        ticketType: "Professional",
        quantity: 1,
        totalAmount: 149.99,
        status: BookingStatus.CONFIRMED,
      },
    }),

    // AI Summit bookings
    prisma.booking.create({
      data: {
        eventId: events[2].id, // AI Summit
        userId: users[3].id, // Jane Smith
        ticketType: "Early Bird",
        quantity: 1,
        totalAmount: 199.99,
        status: BookingStatus.CONFIRMED,
      },
    }),
    prisma.booking.create({
      data: {
        eventId: events[2].id, // AI Summit
        userId: users[6].id, // David Brown
        ticketType: "General Admission",
        quantity: 1,
        totalAmount: 199.99,
        status: BookingStatus.PENDING,
      },
    }),

    // Startup Networking bookings
    prisma.booking.create({
      data: {
        eventId: events[3].id, // Startup Networking
        userId: users[4].id, // Mike Wilson
        ticketType: "Entrepreneur",
        quantity: 1,
        totalAmount: 49.99,
        status: BookingStatus.CONFIRMED,
      },
    }),
    prisma.booking.create({
      data: {
        eventId: events[3].id, // Startup Networking
        userId: users[7].id, // Lisa Anderson
        ticketType: "Investor",
        quantity: 1,
        totalAmount: 49.99,
        status: BookingStatus.CONFIRMED,
      },
    }),

    // Business Strategy Workshop bookings
    prisma.booking.create({
      data: {
        eventId: events[4].id, // Business Strategy
        userId: users[2].id, // John Doe
        ticketType: "Corporate",
        quantity: 1,
        totalAmount: 179.99,
        status: BookingStatus.CONFIRMED,
      },
    }),
    prisma.booking.create({
      data: {
        eventId: events[4].id, // Business Strategy
        userId: users[8].id, // Tom Martinez
        ticketType: "Individual",
        quantity: 1,
        totalAmount: 179.99,
        status: BookingStatus.PENDING,
      },
    }),

    // Art Gallery bookings
    prisma.booking.create({
      data: {
        eventId: events[5].id, // Art Gallery
        userId: users[5].id, // Emily Davis
        ticketType: "VIP",
        quantity: 2,
        totalAmount: 159.98,
        status: BookingStatus.CONFIRMED,
      },
    }),
    prisma.booking.create({
      data: {
        eventId: events[5].id, // Art Gallery
        userId: users[9].id, // Anna Taylor
        ticketType: "General",
        quantity: 1,
        totalAmount: 79.99,
        status: BookingStatus.CONFIRMED,
      },
    }),

    // Classical Music Concert bookings
    prisma.booking.create({
      data: {
        eventId: events[6].id, // Classical Music
        userId: users[3].id, // Jane Smith
        ticketType: "Orchestra",
        quantity: 2,
        totalAmount: 179.98,
        status: BookingStatus.CONFIRMED,
      },
    }),
    prisma.booking.create({
      data: {
        eventId: events[6].id, // Classical Music
        userId: users[6].id, // David Brown
        ticketType: "Balcony",
        quantity: 1,
        totalAmount: 89.99,
        status: BookingStatus.CONFIRMED,
      },
    }),

    // Marathon bookings
    prisma.booking.create({
      data: {
        eventId: events[7].id, // Marathon
        userId: users[4].id, // Mike Wilson
        ticketType: "Full Marathon",
        quantity: 1,
        totalAmount: 89.99,
        status: BookingStatus.CONFIRMED,
      },
    }),
    prisma.booking.create({
      data: {
        eventId: events[7].id, // Marathon
        userId: users[5].id, // Emily Davis
        ticketType: "Half Marathon",
        quantity: 1,
        totalAmount: 69.99,
        status: BookingStatus.CONFIRMED,
      },
    }),

    // Yoga Retreat bookings
    prisma.booking.create({
      data: {
        eventId: events[8].id, // Yoga Retreat
        userId: users[7].id, // Lisa Anderson
        ticketType: "Single Room",
        quantity: 1,
        totalAmount: 299.99,
        status: BookingStatus.CONFIRMED,
      },
    }),
    prisma.booking.create({
      data: {
        eventId: events[8].id, // Yoga Retreat
        userId: users[9].id, // Anna Taylor
        ticketType: "Shared Room",
        quantity: 1,
        totalAmount: 249.99,
        status: BookingStatus.PENDING,
      },
    }),

    // Food & Wine Festival bookings
    prisma.booking.create({
      data: {
        eventId: events[9].id, // Food & Wine
        userId: users[2].id, // John Doe
        ticketType: "Premium",
        quantity: 2,
        totalAmount: 259.98,
        status: BookingStatus.CONFIRMED,
      },
    }),
    prisma.booking.create({
      data: {
        eventId: events[9].id, // Food & Wine
        userId: users[8].id, // Tom Martinez
        ticketType: "Standard",
        quantity: 1,
        totalAmount: 129.99,
        status: BookingStatus.CONFIRMED,
      },
    }),

    // Cooking Masterclass bookings
    prisma.booking.create({
      data: {
        eventId: events[10].id, // Cooking
        userId: users[3].id, // Jane Smith
        ticketType: "Beginner",
        quantity: 1,
        totalAmount: 199.99,
        status: BookingStatus.CONFIRMED,
      },
    }),
    prisma.booking.create({
      data: {
        eventId: events[10].id, // Cooking
        userId: users[6].id, // David Brown
        ticketType: "Advanced",
        quantity: 1,
        totalAmount: 199.99,
        status: BookingStatus.CONFIRMED,
      },
    }),

    // Language Learning Workshop bookings
    prisma.booking.create({
      data: {
        eventId: events[11].id, // Language
        userId: users[4].id, // Mike Wilson
        ticketType: "Spanish",
        quantity: 1,
        totalAmount: 99.99,
        status: BookingStatus.CONFIRMED,
      },
    }),
    prisma.booking.create({
      data: {
        eventId: events[11].id, // Language
        userId: users[7].id, // Lisa Anderson
        ticketType: "French",
        quantity: 1,
        totalAmount: 99.99,
        status: BookingStatus.PENDING,
      },
    }),

    // Public Speaking Seminar bookings
    prisma.booking.create({
      data: {
        eventId: events[12].id, // Public Speaking
        userId: users[2].id, // John Doe
        ticketType: "Professional",
        quantity: 1,
        totalAmount: 149.99,
        status: BookingStatus.CONFIRMED,
      },
    }),
    prisma.booking.create({
      data: {
        eventId: events[12].id, // Public Speaking
        userId: users[5].id, // Emily Davis
        ticketType: "Student",
        quantity: 1,
        totalAmount: 149.99,
        status: BookingStatus.CONFIRMED,
      },
    }),
  ]);

  console.log(`🎫 Created ${bookings.length} bookings`);

  // Create some cancelled bookings
  const cancelledBookings = await Promise.all([
    prisma.booking.create({
      data: {
        eventId: events[0].id, // Tech Conference
        userId: users[8].id, // Tom Martinez
        ticketType: "General Admission",
        quantity: 1,
        totalAmount: 299.99,
        status: BookingStatus.CANCELLED,
      },
    }),
    prisma.booking.create({
      data: {
        eventId: events[3].id, // Startup Networking
        userId: users[9].id, // Anna Taylor
        ticketType: "Entrepreneur",
        quantity: 1,
        totalAmount: 49.99,
        status: BookingStatus.CANCELLED,
      },
    }),
  ]);

  console.log(`❌ Created ${cancelledBookings.length} cancelled bookings`);

  console.log("✅ Database seeding completed successfully!");
  console.log("\n📊 Summary:");
  console.log(`   👥 Users: ${users.length}`);
  console.log(`   🎉 Events: ${events.length}`);
  console.log(`   🎫 Bookings: ${bookings.length + cancelledBookings.length}`);
  console.log("\n🔑 Test Accounts:");
  console.log("   Admin: admin@example.com / admin123");
  console.log("   User: john@example.com / password123");
  console.log("   User: jane@example.com / password123");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
