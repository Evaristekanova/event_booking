"use client";

import React from "react";
import Link from "next/link";
import LazyImage from "./components/shared/LazyImage";
import {
  CalendarDays,
  MapPin,
  Users,
  ArrowRight,
  CheckCircle,
  Clock,
  Globe,
  Shield,
  Zap,
} from "lucide-react";
import { BsArrowRight, BsStarFill } from "react-icons/bs";

export default function HomePage() {
  // THis was done for the case of creating a good looking home page
  const upcomingEvents = [
    {
      id: "1",
      title: "Tech Conference 2024",
      date: "2024-02-15",
      time: "09:00",
      location: "San Francisco, CA",
      image:
        "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg",
      price: 299,
      category: "Conference",
    },
    {
      id: "2",
      title: "Jazz Night Under the Stars",
      date: "2024-02-20",
      time: "19:00",
      location: "Central Park, NY",
      image:
        "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg",
      price: 89,
      category: "Concert",
    },
    {
      id: "3",
      title: "Startup Networking Mixer",
      date: "2024-02-25",
      time: "18:00",
      location: "Austin, TX",
      image:
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
      price: 49,
      category: "Networking",
    },
  ];

  const features = [
    {
      icon: <CalendarDays className="w-8 h-8" />,
      title: "Easy Event Discovery",
      description:
        "Find and book events that match your interests with our intelligent search and filtering system.",
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Location-Based Search",
      description:
        "Discover events happening near you or in your favorite destinations around the world.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Social Networking",
      description:
        "Connect with like-minded people and build your professional network at events.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Booking",
      description:
        "Book with confidence using our secure payment system and instant confirmation.",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Real-time Updates",
      description:
        "Get instant notifications about event changes, cancellations, and updates.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Quick Check-in",
      description:
        "Streamlined check-in process with QR codes and digital tickets.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Manager",
      company: "TechCorp",
      content:
        "This platform has revolutionized how we discover and attend industry events. The booking process is seamless!",
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Event Organizer",
      company: "EventPro",
      content:
        "As an event organizer, I love how easy it is to manage bookings and communicate with attendees.",
      avatar:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Freelance Designer",
      company: "Creative Studio",
      content:
        "I've discovered so many amazing networking events and workshops through this platform. Highly recommended!",
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
      rating: 5,
    },
  ];

  const stats = [
    { number: "10K+", label: "Events Created" },
    { number: "50K+", label: "Happy Attendees" },
    { number: "100+", label: "Cities Covered" },
    { number: "99%", label: "Satisfaction Rate" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-purple-600">
                  EventBook
                </h1>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href="#features"
                  className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Features
                </a>
                <a
                  href="#events"
                  className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Events
                </a>
                <a
                  href="#testimonials"
                  className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Testimonials
                </a>
                <a
                  href="#contact"
                  className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-white to-blue-50 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Discover Amazing
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                    {" "}
                    Events
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Find, book, and attend the best events in your area. From
                  conferences to concerts, workshops to networking events -
                  discover your next unforgettable experience.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg text-lg transition-colors shadow-lg hover:shadow-xl"
                >
                  Start Exploring
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-semibold rounded-lg text-lg transition-colors"
                >
                  Browse Events
                </Link>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">Free to join</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">Instant booking</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">Secure payments</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <LazyImage
                  src="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg"
                  alt="Event celebration"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl"
                  priority={true}
                />
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-48 h-48 bg-blue-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose EventBook?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We&apos;ve built the most comprehensive event discovery and
              booking platform to make your event experience seamless and
              enjoyable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section id="events" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Upcoming Events
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don&apos;t miss out on these amazing events happening soon. Book
              your spot before they sell out!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <LazyImage
                    src={event.image}
                    alt={event.title}
                    width={400}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {event.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {event.title}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <CalendarDays className="w-4 h-4 mr-2" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-purple-600">
                      ${event.price}
                    </div>
                    <Link
                      href="/"
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg text-lg transition-colors"
            >
              View All Events
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied users who have transformed their event
              experience with our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <BsStarFill
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {testimonial.content}
                </p>

                <div className="flex items-center">
                  <LazyImage
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Start Your Event Journey?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
            Join thousands of event enthusiasts and discover amazing experiences
            happening around you. Sign up today and never miss out on the best
            events!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-600 hover:bg-gray-100 font-semibold rounded-lg text-lg transition-colors shadow-lg"
            >
              Get Started Free
              <BsArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-purple-600 font-semibold rounded-lg text-lg transition-colors"
            >
              Browse Events
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold text-purple-400 mb-4">
                EventBook
              </h3>
              <p className="text-gray-400 mb-6 max-w-md">
                The ultimate platform for discovering, booking, and attending
                amazing events. Connect with people who share your interests and
                create unforgettable memories.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Globe className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Shield className="w-6 h-6" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#features"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#events"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Events
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Testimonials
                  </a>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 EventBook. All rights reserved. Made with ❤️ for event
              enthusiasts.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
