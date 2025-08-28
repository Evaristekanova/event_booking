'use client'

import React from 'react'
import { ProtectedRoute } from '../../../components/ProtectedRoute'
import { DashboardLayout } from '../../../components/DashboardLayout'

export default function AnalyticsPage() {
  // Mock data - replace with actual API calls
  const monthlyData = [
    { month: 'Jan', events: 12, bookings: 89, revenue: 12500 },
    { month: 'Feb', events: 15, bookings: 120, revenue: 15800 },
    { month: 'Mar', events: 18, bookings: 145, revenue: 18200 },
    { month: 'Apr', events: 22, bookings: 178, revenue: 22100 },
    { month: 'May', events: 25, bookings: 210, revenue: 26500 },
    { month: 'Jun', events: 28, bookings: 245, revenue: 29800 },
    { month: 'Jul', events: 30, bookings: 278, revenue: 32500 },
    { month: 'Aug', events: 32, bookings: 295, revenue: 35200 },
    { month: 'Sep', events: 35, bookings: 320, revenue: 38500 },
    { month: 'Oct', events: 38, bookings: 345, revenue: 41800 },
    { month: 'Nov', events: 40, bookings: 368, revenue: 44500 },
    { month: 'Dec', events: 42, bookings: 390, revenue: 47200 }
  ]

  const categoryData = [
    { category: 'Technology', events: 15, bookings: 320, revenue: 45000 },
    { category: 'Entertainment', events: 12, bookings: 280, revenue: 38000 },
    { category: 'Business', events: 8, bookings: 150, revenue: 25000 },
    { category: 'Arts', events: 6, bookings: 120, revenue: 18000 },
    { category: 'Education', events: 4, bookings: 80, revenue: 12000 }
  ]

  const topEvents = [
    { title: 'Tech Conference 2024', bookings: 320, revenue: 48000, attendance: 95 },
    { title: 'Music Festival', bookings: 280, revenue: 21000, attendance: 85 },
    { title: 'Business Workshop', bookings: 150, revenue: 30000, attendance: 90 },
    { title: 'Art Exhibition', bookings: 120, revenue: 3000, attendance: 60 },
    { title: 'Educational Seminar', bookings: 80, revenue: 16000, attendance: 75 }
  ]

  const getTotalRevenue = () => {
    return monthlyData.reduce((total, month) => total + month.revenue, 0)
  }

  const getTotalEvents = () => {
    return monthlyData.reduce((total, month) => total + month.events, 0)
  }

  const getTotalBookings = () => {
    return monthlyData.reduce((total, month) => total + month.bookings, 0)
  }

  const getAverageRevenuePerEvent = () => {
    return Math.round(getTotalRevenue() / getTotalEvents())
  }

  return (
    <ProtectedRoute requireAdmin={true}>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Comprehensive insights into your event booking platform performance
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Events</p>
                  <p className="text-2xl font-bold text-gray-900">{getTotalEvents()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{getTotalBookings()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">${getTotalRevenue().toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg Revenue/Event</p>
                  <p className="text-2xl font-bold text-gray-900">${getAverageRevenuePerEvent()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Trends */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Trends</h3>
              <div className="space-y-4">
                {monthlyData.slice(-6).map((month) => (
                  <div key={month.month} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 w-12">{month.month}</span>
                    <div className="flex-1 mx-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                            <span>Events: {month.events}</span>
                            <span>Bookings: {month.bookings}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${(month.revenue / 50000) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-20 text-right">
                      ${month.revenue.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Performance */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Category Performance</h3>
              <div className="space-y-4">
                {categoryData.map((category, index) => (
                  <div key={category.category} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 w-24">{category.category}</span>
                    <div className="flex-1 mx-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                            <span>{category.events} events</span>
                            <span>{category.bookings} bookings</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${(category.revenue / 50000) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-20 text-right">
                      ${category.revenue.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Performing Events */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Top Performing Events</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Event
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bookings
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Revenue
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Attendance %
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {topEvents.map((event, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{event.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{event.bookings}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">${event.revenue.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-900 mr-2">{event.attendance}%</span>
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${event.attendance}%` }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Key Insights</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Revenue Growth</p>
                    <p className="text-sm text-gray-500">Monthly revenue has increased by 15% on average</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Event Popularity</p>
                    <p className="text-sm text-gray-500">Technology events generate the highest revenue</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Booking Trends</p>
                    <p className="text-sm text-gray-500">Peak booking season is Q3 and Q4</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recommendations</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Increase Tech Events</p>
                    <p className="text-sm text-gray-500">Focus on technology category for higher revenue</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Marketing Strategy</p>
                    <p className="text-sm text-gray-500">Target Q3-Q4 for promotional campaigns</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 mr-3"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Capacity Optimization</p>
                    <p className="text-sm text-gray-500">Increase capacity for high-demand events</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
