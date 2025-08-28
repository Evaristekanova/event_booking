# Frontend Setup Guide

## Quick Setup

1. **Create Environment File**
   Create a `.env.local` file in the frontend root directory:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start Development Server**

   ```bash
   npm run dev
   ```

4. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Backend Requirements

Make sure your backend is running and accessible at `http://localhost:3001` before starting the frontend.

## Test Accounts

Use these accounts to test the system:

- **Admin**: `admin@example.com` / `admin123`
- **User**: `john@example.com` / `password123`

## Features Available

- ✅ **Events Page**: View all events with filtering and pagination
- ✅ **Bookings Page**: Manage bookings (admin) or view your own (user)
- ✅ **Real-time Data**: Live data from backend API
- ✅ **Role-based Access**: Different views for admin vs regular users
- ✅ **Responsive Design**: Works on all device sizes
- ✅ **Error Handling**: Proper error states and loading indicators
- ✅ **Toast Notifications**: User feedback for all actions

## Troubleshooting

### API Connection Issues

- Verify backend is running on port 3001
- Check `.env.local` file exists and has correct URL
- Ensure backend has CORS enabled

### Build Errors

- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### Data Not Loading

- Check browser console for errors
- Verify backend database is seeded with data
- Ensure JWT token is valid (try logging out and back in)

