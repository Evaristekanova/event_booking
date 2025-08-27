'use client'

import React, { useState } from 'react'
import { ProtectedRoute } from '../../../components/ProtectedRoute'
import { DashboardLayout } from '../../../components/DashboardLayout'
import { useAuth } from '../../../contexts/AuthContext'

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  capacity: number
  attendees: number
  price: number
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
  organizer: string
  category: string
}

export default function EventsPage() {
  const { user, isAdmin } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'upcoming' | 'ongoing' | 'completed' | 'cancelled'>('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

  // Mock data - replace with actual API call
  const events: Event[] = [
    {
      id: '1',
      title: 'Tech Conference 2024',
      description: 'Annual technology conference featuring industry leaders and innovative solutions.',
      date: '2024-12-15',
      time: '9:00 AM',
      location: 'Convention Center, Downtown',
      capacity: 500,
      attendees: 320,
      price: 150,
      status: 'upcoming',
      organizer: 'Tech Events Inc.',
      category: 'Technology'
    },
    {
      id: '2',
      title: 'Music Festival',
      description: 'Three-day music festival featuring local and international artists.',
      date: '2024-12-20',
      time: '6:00 PM',
      location: 'Central Park',
      capacity: 1000,
      attendees: 850,
      price: 75,
      status: 'upcoming',
      organizer: 'Music Productions',
      category: 'Entertainment'
    },
    {
      id: '3',
      title: 'Business Workshop',
      description: 'Interactive workshop on business strategy and growth.',
      date: '2024-12-10',
      time: '2:00 PM',
      location: 'Business Center',
      capacity: 100,
      attendees: 45,
      price: 200,
      status: 'ongoing',
      organizer: 'Business Academy',
      category: 'Business'
    },
    {
      id: '4',
      title: 'Art Exhibition',
      description: 'Contemporary art exhibition featuring local artists.',
      date: '2024-11-30',
      time: '10:00 AM',
      location: 'Art Gallery',
      capacity: 200,
      attendees: 180,
      price: 25,
      status: 'completed',
      organizer: 'Art Society',
      category: 'Arts'
    }
  ]

  const categories = ['all', ...Array.from(new Set(events.map(event => event.category)))]

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter
    
    return matchesSearch && matchesStatus && matchesCategory
  })

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      upcoming: { bg: 'bg-blue-100', text: 'text-blue-800' },
      ongoing: { bg: 'bg-green-100', text: 'text-green-800' },
      completed: { bg: 'bg-gray-100', text: 'text-gray-800' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-800' }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.upcoming
    return (
      <span className={`px-2 py-1 text-xs font-medium ${config.bg} ${config.text} rounded-full capitalize`}>
        {status}
      </span>
    )
  }

  const getAttendancePercentage = (attendees: number, capacity: number) => {
    return Math.round((attendees / capacity) * 100)
  }

  const handleEventAction = (eventId: string, action: string) => {
    // TODO: Implement event actions
    console.log(`${action} event ${eventId}`)
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Events</h1>
              <p className="mt-1 text-sm text-gray-500">
                {isAdmin ? 'Manage all events and bookings' : 'View and book events'}
              </p>
            </div>
            {isAdmin && (
              <button className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create Event
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                  Search Events
                </label>
                <input
                  type="text"
                  id="search"
                  placeholder="Search by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Status Filter */}
              <div>
                <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Status
                </label>
                <select
                  id="status-filter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Category
                </label>
                <select
                  id="category-filter"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                {/* Event Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {event.title}
                    </h3>
                    {getStatusBadge(event.status)}
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {event.description}
                  </p>
                  
                  {/* Event Details */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(event.date).toLocaleDateString()} at {event.time}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.location}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {event.attendees}/{event.capacity} attendees
                    </div>
                  </div>
                </div>

                {/* Attendance Bar */}
                <div className="px-6 py-3 bg-gray-50">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Attendance</span>
                    <span className="text-gray-900 font-medium">
                      {getAttendancePercentage(event.attendees, event.capacity)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getAttendancePercentage(event.attendees, event.capacity)}%` }}
                    />
                  </div>
                </div>

                {/* Event Footer */}
                <div className="p-6 bg-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-gray-900">
                      ${event.price}
                    </div>
                    <div className="text-sm text-gray-500">
                      {event.category}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    {isAdmin ? (
                      <>
                        <button
                          onClick={() => handleEventAction(event.id, 'edit')}
                          className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleEventAction(event.id, 'manage')}
                          className="flex-1 px-3 py-2 text-sm font-medium text-purple-600 bg-purple-100 rounded-md hover:bg-purple-200 transition-colors"
                        >
                          Manage
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleEventAction(event.id, 'book')}
                        className="w-full px-3 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors"
                      >
                        Book Event
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No events found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
