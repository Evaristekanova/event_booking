# Event Booking Application

A full-stack event booking and management system built with Next.js, TypeScript, Tailwind CSS, and Express.js. This application provides a comprehensive solution for event organizers and attendees with role-based access control.

## 🚀 Features

### 🔐 Authentication & User Management

- **User Registration & Login**: Secure authentication system with JWT tokens
- **Role-Based Access Control**: Two user roles - Admin and Regular User
- **Protected Routes**: Secure access to dashboard and admin features

### 📅 Event Management

- **Event Creation**: Admins can create new events with detailed information
- **Event Editing**: Update event details including title, description, date, time, location, capacity, and price
- **Event Categories**: Organize events by categories for better discovery
- **Event Status Tracking**: Monitor event status (UPCOMING, ONGOING, COMPLETED, CANCELLED)
- **Image Support**: Upload and display event images
- **Date Validation**: Prevents scheduling events in the past

### 🎯 Event Booking System

- **Event Discovery**: Browse available events with filtering and search
- **Booking Management**: Users can book events and view their booking history
- **Capacity Management**: Automatic capacity tracking and attendance monitoring
- **Revenue Tracking**: Monitor event revenue and attendance percentages

### 📊 Dashboard & Analytics

- **Admin Dashboard**: Comprehensive overview of platform statistics
  - Total events count
  - Active bookings
  - Total revenue
  - New user registrations
- **User Dashboard**: Personalized view of user's events and bookings
- **Event Performance Metrics**: Top-performing events with booking counts and revenue
- **Recent Activities**: Timeline of recent platform activities
- **Upcoming Events**: Display of upcoming events with attendee counts

### 📅 Interactive Calendar

- **Calendar View**: Monthly calendar display of all events
- **Event Visualization**: Color-coded events based on status
- **Event Details**: Click on events to view comprehensive information
- **Admin Controls**: Admins can view all events, users can see their bookings
- **Responsive Design**: Mobile-friendly calendar interface

### 👥 User Management (Admin Only)

- **User List**: View all registered users in the system
- **User Activation/Deactivation**: Control user access to the platform
- **User Statistics**: Monitor user growth and activity

### 🎨 Modern UI/UX

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Component Library**: Reusable UI components (Button, Modal, Input, Table)
- **Loading States**: Smooth loading experiences with skeleton loaders
- **Toast Notifications**: User feedback for actions and errors
- **Form Validation**: Real-time form validation with error messages
- **Accessibility**: ARIA labels and keyboard navigation support

### 🔧 Technical Features

- **TypeScript**: Full type safety throughout the application
- **React Query**: Efficient data fetching and caching
- **Custom Hooks**: Reusable logic for common operations
- **Error Boundaries**: Graceful error handling
- **Performance Optimization**: Lazy loading and code splitting
- **API Integration**: RESTful API with proper error handling

## 🛠️ Tech Stack

### Frontend

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React Query**: Data fetching and state management
- **React Big Calendar**: Calendar component library
- **React Icons**: Icon library
- **React Toastify**: Toast notifications

### Backend

- **Express.js**: Node.js web framework
- **Prisma**: Database ORM
- **PostgreSQL**: Primary database
- **JWT**: JSON Web Token authentication
- **bcrypt**: Password hashing
- **CORS**: Cross-origin resource sharing
- **Helmet**: Security middleware
- **Morgan**: HTTP request logger

### Development Tools

- **ESLint**: Code linting
- **Prettier**: Code formatting
- **TypeScript**: Type checking
- **Nodemon**: Development server with auto-reload

## 📁 Project Structure

```
event-booking/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   │   ├── (pages)/     # Route groups
│   │   │   │   ├── dashboard/   # Dashboard pages
│   │   │   │   ├── events/      # Events pages
│   │   │   │   ├── login/       # Authentication pages
│   │   │   │   └── signup/      # Registration page
│   │   │   ├── components/      # Reusable components
│   │   │   │   ├── shared/      # Common components
│   │   │   │   ├── table/       # Table components
│   │   │   │   └── forms/       # Form components
│   │   │   ├── contexts/        # React contexts
│   │   │   ├── hooks/           # Custom hooks
│   │   │   ├── services/        # API service functions
│   │   │   └── types/           # TypeScript type definitions
│   │   └── public/              # Static assets
├── backend/                  # Express.js backend API
│   ├── src/
│   │   ├── routes/            # API route definitions
│   │   ├── controllers/        # Request handlers
│   │   ├── services/           # Business logic
│   │   ├── middleware/         # Custom middleware
│   │   ├── config/             # Configuration files
│   │   └── utils/              # Utility functions
│   ├── prisma/                 # Database schema and migrations
│   └── dist/                   # Compiled JavaScript output
└── README.md                  # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn package manager

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Environment Variables

Create `.env` files in both frontend and backend directories:

**Frontend (.env.local)**

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

**Backend (.env)**

```env
DATABASE_URL="postgresql://username:password@localhost:5432/event_booking"
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"
PORT=4000
NODE_ENV=development
```

### Database Setup

```bash
cd backend
npx prisma migrate dev
npx prisma generate
npx prisma db seed
```

## 📱 Screenshots

### Dashboard

- Admin dashboard with comprehensive statistics
- User dashboard with personalized information
- Responsive grid layout with metric cards

### Event Management

- Event creation form with validation
- Event listing with search and filters
- Event details modal with booking options

### Calendar View

- Monthly calendar with event visualization
- Color-coded events by status
- Interactive event selection

### User Management

- User list with activation controls
- Role-based access management
- User profile management

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt encryption for user passwords
- **Role-Based Access**: Granular permission system
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Controlled cross-origin access
- **Rate Limiting**: API request throttling
- **Helmet Security**: Security headers and protection

## 📊 API Endpoints

### Authentication

- `POST /api/v1/users/register` - User registration
- `POST /api/v1/users/login` - User login

### Events

- `GET /api/v1/events` - Get all events
- `POST /api/v1/events` - Create new event (Admin)
- `PUT /api/v1/events/:id` - Update event (Admin)
- `DELETE /api/v1/events/:id` - Delete event (Admin)

### Bookings

- `GET /api/v1/bookings` - Get user bookings
- `POST /api/v1/bookings` - Create new booking
- `PUT /api/v1/bookings/:id` - Update booking
- `DELETE /api/v1/bookings/:id` - Cancel booking

### Dashboard

- `GET /api/v1/dashboard/stats` - Get dashboard statistics
- `GET /api/v1/dashboard/top-events` - Get top performing events
- `GET /api/v1/dashboard/activities` - Get recent activities
- `GET /api/v1/dashboard/upcoming-events` - Get upcoming events

### Users (Admin Only)

- `GET /api/v1/users` - Get all users
- `PUT /api/v1/users/:id/activate` - Activate user
- `PUT /api/v1/users/:id/deactivate` - Deactivate user

## 🎯 Key Features for Admins

- **Event Management**: Full CRUD operations on events
- **User Management**: Control user access and roles
- **Analytics Dashboard**: Comprehensive platform insights
- **Calendar Management**: Visual event scheduling and management
- **Revenue Tracking**: Monitor event performance and earnings

## 🎯 Key Features for Users

- **Event Discovery**: Browse and search available events
- **Easy Booking**: Simple one-click event booking
- **Personal Dashboard**: Track bookings and event history
- **Profile Management**: Update personal information
- **Calendar View**: Visual representation of booked events

## 🚀 Deployment

### Frontend (Vercel)

- Optimized for Next.js deployment
- Automatic builds on git push
- Environment variable configuration
- CDN distribution

### Backend (Render)

- Node.js runtime support
- PostgreSQL database integration
- Environment variable management
- Health check endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request


## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS approach
- Prisma team for the excellent ORM
- React Query for efficient data management

---

**Built using modern web technologies**
