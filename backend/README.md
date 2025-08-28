# Event Booking Backend API

A comprehensive backend API for an event booking system built with Node.js, Express, TypeScript, and Prisma.

## 🚀 Features

- **User Management**: Registration, authentication, profile management
- **Event Management**: Create, read, update, delete events
- **Booking System**: Book events, manage bookings, track status
- **Dashboard Analytics**: Statistics, recent activities, upcoming events
- **Role-Based Access Control**: User and Admin roles
- **Comprehensive Validation**: Input validation using Zod
- **Database Integration**: PostgreSQL with Prisma ORM

## 🛠️ Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT
- **Validation**: Zod
- **Security**: Helmet, CORS
- **Logging**: Morgan

## 📁 Project Structure

```
src/
├── config/           # Configuration files
├── controllers/      # Request handlers
├── helpers/          # Utility functions
├── middleware/       # Custom middleware
├── routes/           # API route definitions
├── services/         # Business logic
├── types/            # TypeScript type definitions
├── validations/      # Zod validation schemas
├── index.ts          # Main application entry point
└── prismaClient.ts   # Prisma client configuration
```

## 🗄️ Database Schema

### Models

- **User**: Authentication, profile, role management
- **Event**: Event details, capacity, pricing, categories
- **Booking**: User bookings, status tracking, payment status
- **Payment**: Payment processing and tracking

### Key Features

- UUID-based primary keys
- Proper relationships between models
- Enum types for status fields
- Timestamp tracking

## 🔐 Authentication & Authorization

### JWT Authentication

- Secure token-based authentication
- Configurable expiration times
- User role verification

### Role-Based Access Control

- **USER**: Can book events, view own bookings
- **ADMIN**: Full system access, user management, analytics

## 📡 API Endpoints

### Base URL

```
http://localhost:3001/api/v1
```

### Authentication Endpoints

#### User Registration

```http
POST /api/v1/users/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "password": "SecurePass123"
}
```

#### User Login

```http
POST /api/v1/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

#### Get Profile

```http
GET /api/v1/users/profile
Authorization: Bearer <JWT_TOKEN>
```

#### Update Profile

```http
PUT /api/v1/users/profile
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "fullName": "John Smith",
  "phone": "+1987654321"
}
```

### Event Endpoints

#### Get All Events

```http
GET /api/v1/events?page=1&limit=10
```

#### Get Event by ID

```http
GET /api/v1/events/:id
```

#### Create Event

```http
POST /api/v1/events
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "title": "Tech Conference 2024",
  "description": "Annual technology conference",
  "date": "2024-12-15",
  "time": "9:00 AM",
  "location": "Convention Center",
  "capacity": 500,
  "price": 150.00,
  "category": "Technology"
}
```

#### Update Event

```http
PUT /api/v1/events/:id
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "title": "Updated Tech Conference 2024",
  "price": 175.00
}
```

#### Delete Event

```http
DELETE /api/v1/events/:id
Authorization: Bearer <JWT_TOKEN>
```

### Booking Endpoints

#### Create Booking

```http
POST /api/v1/bookings
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "eventId": "123",
  "ticketType": "General Admission",
  "quantity": 2,
  "totalAmount": 300.00
}
```

#### Get User Bookings

```http
GET /api/v1/bookings/user?page=1&limit=10
Authorization: Bearer <JWT_TOKEN>
```

#### Get All Bookings (Admin)

```http
GET /api/v1/bookings?page=1&limit=10
Authorization: Bearer <JWT_TOKEN>
```

#### Update Booking

```http
PUT /api/v1/bookings/:id
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "status": "CONFIRMED",
  "paymentStatus": "PAID"
}
```

### Dashboard Endpoints

#### Get Dashboard Stats

```http
GET /api/v1/dashboard/stats
Authorization: Bearer <JWT_TOKEN>
```

#### Get Recent Activities

```http
GET /api/v1/dashboard/activities?limit=10
Authorization: Bearer <JWT_TOKEN>
```

#### Get Upcoming Events

```http
GET /api/v1/dashboard/upcoming-events?limit=5
Authorization: Bearer <JWT_TOKEN>
```

### Analytics Endpoints (Admin Only)

#### Monthly Analytics

```http
GET /api/v1/dashboard/analytics/monthly?year=2024
Authorization: Bearer <JWT_TOKEN>
```

#### Category Analytics

```http
GET /api/v1/dashboard/analytics/category
Authorization: Bearer <JWT_TOKEN>
```

#### Top Events

```http
GET /api/v1/dashboard/analytics/top-events?limit=5
Authorization: Bearer <JWT_TOKEN>
```

## 🔧 Setup & Installation

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd event-booking/backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the backend directory:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/event_booking"
   JWT_SECRET="your-super-secret-jwt-key"
   PORT=3001
   NODE_ENV=development
   ```

4. **Database Setup**

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run database migrations
   npx prisma migrate dev

   # Seed database (optional)
   npx prisma db seed
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

## 🚀 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm start` - Start production server
- `npm run type-check` - TypeScript type checking
- `npm run lint` - ESLint code linting
- `npm run lint:fix` - Auto-fix linting issues
- `npm run format` - Prettier code formatting

## 🔒 Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing configuration
- **Input Validation**: Zod schema validation
- **JWT**: Secure authentication tokens
- **Role-Based Access**: Granular permission control
- **SQL Injection Protection**: Prisma ORM protection

## 📊 Response Format

All API responses follow a consistent format:

### Success Response

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... },
  "pagination": { ... } // Optional, for paginated responses
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information" // Only in development
}
```

## 🔍 Validation Rules

### User Registration

- **fullName**: 2-100 characters, letters and spaces only
- **email**: Valid email format, unique
- **phone**: Optional, valid phone format
- **password**: Minimum 8 characters, must contain lowercase, uppercase, and number

### Event Creation

- **title**: 3-200 characters
- **description**: 10-1000 characters
- **date**: YYYY-MM-DD format
- **time**: HH:MM AM/PM format
- **capacity**: Positive integer
- **price**: Non-negative number

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📝 API Documentation

For detailed API documentation, visit:

- **Swagger UI**: `http://localhost:3001/api-docs` (when implemented)
- **Health Check**: `http://localhost:3001/health`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Happy Coding! 🎉**
