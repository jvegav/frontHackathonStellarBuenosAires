"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, Tag, X, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import './globals.css'

// Event data
const events = [
  {
    id: 1,
    title: "Electronic Music Festival",
    description: "Enjoy the best international DJs in an incredible atmosphere with spectacular visual effects.",
    image: "/festival-electronica.jpeg",
    date: "June 15, 2025",
    location: "Exhibition Center, Madrid",
    category: "Electronic Music",
    tickets: [
      { type: "General", price: "€50" },
      { type: "VIP", price: "€120" },
      { type: "Platinum", price: "€200" },
    ],
  },
  {
    id: 2,
    title: "Alternative Rock Concert",
    description: "A night full of energy with the best alternative rock bands of the moment.",
    image: "/rock-concert.jpg",
    date: "July 22, 2025",
    location: "Sports Palace, Barcelona",
    category: "Rock",
    tickets: [
      { type: "General Admission", price: "€45" },
      { type: "Premium Access", price: "€90" },
    ],
  },
  {
    id: 3,
    title: "Jazz Festival",
    description:
      "Immerse yourself in the world of jazz with internationally renowned artists in an intimate and cozy atmosphere.",
    image: "/festival-jazz.jpg",
    date: "August 5, 2025",
    location: "Main Theater, Valencia",
    category: "Jazz",
    tickets: [
      { type: "Standard", price: "€60" },
      { type: "Premium", price: "€110" },
      { type: "Full Experience", price: "€180" },
    ],
  },
]




export default function EventsPage() {
  const router = useRouter()

  const [selectedTicketType, setSelectedTicketType] = useState("")
  const [selectedEvent, setSelectedEvent] = useState<typeof events[number] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  

  const handleSelectTicket = (event: typeof events[number], ticketType: string) => {
    setSelectedEvent(event)
    setSelectedTicketType(ticketType)
  }

  const handlePurchase = () => {
    if (selectedEvent) {
      alert(`Purchase completed: ${selectedTicketType} for ${selectedEvent.title}`)
      setSelectedTicketType("")
      setSelectedEvent(null)
      setIsModalOpen(false)
    }
  }

  // Define interfaces for better type safety
  interface Ticket {
    type: string;
    price: string;
  }

  interface Event {
    id: number;
    title: string;
    description: string;
    image: string;
    date: string;
    location: string;
    category: string;
    tickets: Ticket[];
  }

  const openModal = (event: Event): void => {
    setSelectedEvent(event)
    setSelectedTicketType("")
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedTicketType("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-2 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-3">
                <span className="text-white font-bold">ST</span>
              </div>
              <span className="text-xl font-bold text-blue-900">SecureTicket</span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-10 pr-16">
            
            <Link href="/" className="text-purple-600 font-bold text-xl">
              Home
            </Link>

            <Link href="/" className="text-purple-600 font-bold text-xl">
              My Tickets
            </Link>
           
            
          </nav>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
            Log In
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Amazing Events</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Find and purchase tickets for the best events on the most secure platform in the market.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Back button */}
        <button
          onClick={() => router.push("/")}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </button>

        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-blue-900">Available Events</h2>
          <p className="text-gray-600 mt-2">Explore our selection of events and secure your tickets today.</p>
        </div>

        
        
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col"
              >
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={event.image || `/placeholder.svg?height=300&width=500`}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = `/placeholder.svg?height=300&width=500`
                    }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={event.id === 1} // Prioritize loading the first image
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-blue-900">{event.title}</h3>
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {event.category}
                    </span>
                  </div>
                  <div className="flex flex-col space-y-2 mt-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-3 line-clamp-3">{event.description}</p>
                  <div className="mt-4">
                    <h4 className="font-semibold text-blue-800 flex items-center mb-2">
                      <Tag className="h-4 w-4 mr-2" />
                      Available tickets:
                    </h4>
                    <ul className="space-y-1">
                      {event.tickets.map((ticket) => (
                        <li key={ticket.type} className="flex justify-between text-sm">
                          <span>{ticket.type}</span>
                          <span className="font-semibold">{ticket.price}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="p-4 mt-auto">
                  <button
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    onClick={() => openModal(event)}
                  >
                    Buy Tickets
                  </button>
                </div>
              </div>
            ))}
          </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SecureTicket</h3>
              <p className="text-blue-200">The most secure platform to buy tickets for your favorite events.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-blue-200 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="text-blue-200 hover:text-white transition-colors">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-blue-200 hover:text-white transition-colors">
                    Artists
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-blue-200 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-blue-200 hover:text-white transition-colors">
                    Help
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-blue-200 hover:text-white transition-colors">
                    Refunds
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-blue-200 hover:text-white transition-colors">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-blue-200 hover:text-white transition-colors">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <address className="not-italic text-blue-200">
                <p>Email: info@secureticket.com</p>
                <p>Phone: +34 91 123 45 67</p>
                <p>Address: Main Street 123, Madrid</p>
              </address>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
            <p>&copy; {new Date().getFullYear()} SecureTicket. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Purchase modal */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-blue-900">{selectedEvent.title}</h3>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-700" aria-label="Close">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <p className="text-gray-600 mb-6">{selectedEvent.description}</p>

              <div className="mb-6">
                <h4 className="font-medium text-blue-800 mb-3">Select your ticket type:</h4>
                <div className="space-y-2">
                  {selectedEvent.tickets.map((ticket) => (
                    <div
                      key={ticket.type}
                      className={`flex justify-between items-center p-3 border rounded-md cursor-pointer transition-colors ${
                        selectedTicketType === ticket.type
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                      onClick={() => handleSelectTicket(selectedEvent, ticket.type)}
                    >
                      <span>{ticket.type}</span>
                      <span className="font-bold">{ticket.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={!selectedTicketType}
                  onClick={handlePurchase}
                >
                  Confirm Purchase
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

