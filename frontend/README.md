# Event Booking Frontend

A modern React-based frontend for the Event Booking system, built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- **Authentication System**: Login/signup with JWT tokens
- **Role-Based Access Control**: Admin and regular user roles
- **Event Management**: View, create, edit, and delete events
- **Booking System**: Book events, manage bookings, and track status
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Real-time Data**: React Query for efficient data fetching and caching
- **Toast Notifications**: User feedback with react-toastify

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **Authentication**: JWT with custom hooks
- **Notifications**: react-toastify
- **Icons**: react-icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend API running (see backend README)

### Installation

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
cp .env.local.example .env.local
```

3. Update `.env.local` with your backend URL:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (pages)/          # Route groups
│   │   ├── dashboard/    # Protected dashboard routes
│   │   ├── login/        # Authentication pages
│   │   └── signup/       # User registration
│   ├── components/       # Reusable UI components
│   ├── contexts/         # React contexts (Auth)
│   ├── hooks/            # Custom React hooks
│   ├── _services/        # API service functions
│   └── lib/              # Utility functions
```

## API Integration

### Events API

- `GET /api/v1/events` - List all events with pagination
- `GET /api/v1/events/:id` - Get event by ID
- `POST /api/v1/events` - Create new event (admin only)
- `PUT /api/v1/events/:id` - Update event (admin/organizer only)
- `DELETE /api/v1/events/:id` - Delete event (admin/organizer only)

### Bookings API

- `GET /api/v1/bookings` - List all bookings (admin only)
- `GET /api/v1/bookings/user` - Get user's own bookings
- `GET /api/v1/bookings/:id` - Get booking by ID
- `POST /api/v1/bookings` - Create new booking
- `PUT /api/v1/bookings/:id` - Update booking status
- `DELETE /api/v1/bookings/:id` - Cancel booking

## Custom Hooks

### useEvents

- `useEvents(page, limit)` - Fetch paginated events
- `useEvent(id)` - Fetch single event
- `useCreateEvent()` - Create new event
- `useUpdateEvent()` - Update existing event
- `useDeleteEvent()` - Delete event

### useBookings

- `useAllBookings(page, limit)` - Fetch all bookings (admin)
- `useUserBookings(page, limit)` - Fetch user's bookings
- `useCreateBooking()` - Create new booking
- `useConfirmBooking()` - Confirm pending booking
- `useCancelBooking()` - Cancel booking

## Authentication

The app uses JWT tokens stored in localStorage with automatic token refresh. Protected routes are wrapped with the `ProtectedRoute` component.

### User Roles

- **ADMIN**: Full access to all features
- **USER**: Can view events, make bookings, and manage their own bookings

## Styling

Built with Tailwind CSS for consistent, responsive design. Custom components follow the design system with purple as the primary color.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- TypeScript strict mode enabled
- ESLint with Next.js recommended rules
- Prettier for code formatting
- Component-based architecture
- Custom hooks for business logic

## Testing

The app includes comprehensive error handling, loading states, and user feedback. Test with the seeded data from the backend:

### Test Accounts

- **Admin**: `admin@example.com` / `admin123`
- **User**: `john@example.com` / `password123`

## Deployment

1. Build the application:

```bash
npm run build
```

2. Start the production server:

```bash
npm run start
```

3. Set environment variables for production:

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com
NODE_ENV=production
```

## Contributing

1. Follow the existing code style
2. Use TypeScript for all new code
3. Create custom hooks for business logic
4. Add proper error handling and loading states
5. Test with different user roles

## License

ISC
