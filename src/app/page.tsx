/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, Tag, X,  ChevronLeft, ChevronRight } from "lucide-react"
import './globals.css'
import LoginButton from "./login"

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
    price:100,
    tickets: [
      { type: "General", price: "€100" },
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
    price:100,
    tickets: [
      { type: "General Admission", price: "€100" },
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
    price:100,
    tickets: [
      { type: "Standard", price: "€100" },
    ],
  },
  {
    id: 4,
    title: "Jazz Festival",
    description:
      "Immerse yourself in the world of jazz with internationally renowned artists in an intimate and cozy atmosphere.",
    image: "/festival-jazz.jpg",
    date: "August 5, 2025",
    location: "Main Theater, Valencia",
    category: "Jazz",
    price: 100,
    tickets: [
      { type: "Standard", price: "€100" },
    ],
  },
  {
    id: 5,
    title: "Jazz Festival",
    description:
      "Immerse yourself in the world of jazz with internationally renowned artists in an intimate and cozy atmosphere.",
    image: "/festival-jazz.jpg",
    date: "August 5, 2025",
    location: "Main Theater, Valencia",
    category: "Jazz",
    price: 100,
    tickets: [
      { type: "Standard", price: "€100" },
    ],
  },
]



export default function EventsPage() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  
  const [selectedTicketType, setSelectedTicketType] = useState("")
  const [selectedEvent, setSelectedEvent] = useState<typeof events[number] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [account, setAccount] = useState(null);
  
  // Define interface for user tickets
  interface UserTicket {
    id: string;
    eventName: string;
    ticketType: string;
    // Add other properties as needed
  }
  
  const [userTickets, setUserTickets] = useState<UserTicket[]>([]);


  
  
  // Calculate items per view based on screen size
  const [itemsPerView, setItemsPerView] = useState(3)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1)
      } else if (window.innerWidth < 1200) {
        setItemsPerView(2)
      } else {
        setItemsPerView(3)
      }
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  const totalSlides = Math.ceil(events.length / itemsPerView)
  
  // Carousel navigation functions
  const scrollToSlide = (index: number) => {
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.clientWidth
      carouselRef.current.scrollTo({
        left: index * slideWidth,
        behavior: 'smooth'
      })
      setCurrentSlide(index)
    }
  }

  const generateUniqueTicketId = () => {
    // Get current timestamp in milliseconds
    const timestamp = Date.now().toString(36);
    
    // Generate a random component
    const randomPart = Math.random().toString(36).substring(2, 10);
    
    // Create a prefix for better identification
    const prefix = 'TKT';
    
    // Combine all parts to create a unique ID
    return `${prefix}-${timestamp}-${randomPart}`;
  }
  
  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      scrollToSlide(currentSlide + 1)
    }
  }
  
  const prevSlide = () => {
    if (currentSlide > 0) {
      scrollToSlide(currentSlide - 1)
    }
  }
  
  // Handle mouse interactions for dragging the carousel
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0))
    setScrollLeft(carouselRef.current?.scrollLeft || 0)
  }
  
  const handleMouseUp = () => {
    setIsDragging(false)
  }
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 2
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk
    }
  }
  
  const handleScroll = () => {
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.clientWidth
      const newSlide = Math.round(carouselRef.current.scrollLeft / slideWidth)
      if (newSlide !== currentSlide) {
        setCurrentSlide(newSlide)
      }
    }
  }

  const handleSelectTicket = (event: typeof events[number], ticketType: string) => {
    setSelectedEvent(event)
    setSelectedTicketType(ticketType)
  }

  const handleAccountChange = (newAccount?: any) => {
    console.log("account with handlee change" + newAccount);
    setAccount(newAccount);
  };

  const fetchUserTickets = async (account?: any) => {
    try {
      console.log("account with fetch" + account);
      const response = await fetch(`http://127.0.0.1:8000/api/user-tickets/${account}`);
      const data = await response.json();
      setUserTickets(data);
    } catch (error) {
      console.error('Error fetching user tickets:', error);
    }
  };

  const handlePurchase = async (account?:any) => {
    if (selectedEvent && account) {
      try {
        console.log("account with purchase" + account);
        const ticketId = generateUniqueTicketId(); // Implementa esta función
        const response  = await fetch('http://127.0.0.1:8000/api/purchase-ticket', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ticket_id: ticketId,
            user_id: account, 
            description: selectedEvent.title,
            price: selectedEvent.price,
          }),
        });
        const data = await response.json();
      console.log("Respuesta del servidor:", data);

      if (!response.ok) {
        throw new Error(`Error en la compra: ${data.detail || "Desconocido"}`);
      }
        fetchUserTickets(account); // Actualiza la lista de tickets
        alert(`Purchase completed: ${selectedTicketType} for ${selectedEvent.title}`);
        setSelectedTicketType("");
        setSelectedEvent(null);
        setIsModalOpen(false);
      } catch (error) {
        console.error('Error purchasing ticket:', error);
      }
    }
  };

  useEffect(() => {
    if (account) {
      fetchUserTickets(account);
    }
  }, [account]);

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
    price: number;
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
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-2 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-purple-950 flex items-center justify-center mr-3">
                <span className="text-white font-bold">ST</span>
              </div>
              <span className="text-xl font-bold text-purple-950">SecureTicket</span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-10 pr-16">
            
            <Link href="/" className="text-purple-950 font-bold text-xl">
              Home
            </Link>

            
<Link
  href={{
    pathname: '/tickets',
    query: { tickets: JSON.stringify(userTickets) }, // Serializas los tickets en una cadena
  }}
  className="text-purple-950 font-bold text-xl"
>
  My Tickets
</Link>
           
            
          </nav>
          <LoginButton onAccountChange={handleAccountChange} />
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-purple-950 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Amazing Events</h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Find and purchase tickets for the best events on the most secure platform in the market.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        

        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-purple-950">Available Events</h2>
          <p className="text-gray-600 mt-2">Explore our selection of events and secure your tickets today.</p>
        </div>

       
        
          <div className="relative">
            {/* Carousel container */}
            <div className="relative overflow-hidden" aria-roledescription="carousel" aria-label="Events carousel">
              {/* Carousel track */}
              <div
                ref={carouselRef}
                className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                onScroll={handleScroll}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseUp}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                role="region"
                aria-live="polite"
              >
                {events.map((event, index) => (
                  <div
                    key={event.id}
                    className="flex-none w-full md:w-1/2 lg:w-1/3 px-2 snap-start"
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${index + 1} of ${events.length}`}
                  >
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col m-2">
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
                          <h3 className="text-xl font-bold text-purple-950">{event.title}</h3>
                          <span className="inline-block px-2 py-1 text-xs font-medium bg-purple-200 text-purple-900 rounded-full">
                            {event.category}
                          </span>
                        </div>
                        <div className="flex flex-col space-y-2 mt-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-purple-600" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-purple-600" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 mt-3 line-clamp-3">{event.description}</p>
                        <div className="mt-4">
                          <h4 className="font-semibold text-purple-950 flex items-center mb-2">
                            <Tag className="h-4 w-4 mr-2" />
                            Available tickets:
                          </h4>
                          <ul className="space-y-1">
                            {event.tickets.map((ticket) => (
                              <li key={ticket.type} className="text-gray-700 flex justify-between text-sm">
                                <span>{ticket.type}</span>
                                <span className="font-semibold">{ticket.price}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="p-4 mt-auto">
                        <button
                          className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-900 transition-colors"
                          onClick={() => openModal(event)}
                        >
                          Buy Tickets
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation arrows */}
              {events.length > itemsPerView && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md z-10 text-blue-600 hover:text-blue-800 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={currentSlide === 0}
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md z-10 text-blue-600 hover:text-blue-800 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={currentSlide >= totalSlides - 1}
                    aria-label="Next slide"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>

            {/* Pagination indicators */}
            {totalSlides > 1 && (
              <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToSlide(index)}
                    className={`h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      currentSlide === index ? "w-8 bg-blue-600" : "w-2 bg-blue-300 hover:bg-blue-400"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={currentSlide === index ? "true" : "false"}
                  />
                ))}
              </div>
            )}

            {/* Keyboard navigation instructions */}
            <div className="sr-only">
              Use arrow keys to navigate between slides. Press left arrow for previous slide and right arrow for next
              slide.
            </div>
          </div>


        
      </main>

      {/* Footer */}
      <footer className="bg-purple-950 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SecureTicket</h3>
              <p className="text-purple-200">The most secure platform to buy tickets for your favorite events.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-purple-200 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="text-purple-200 hover:text-white transition-colors">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-purple-200 hover:text-white transition-colors">
                    Artists
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-purple-200 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-purple-200 hover:text-white transition-colors">
                    Help
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-purple-200 hover:text-white transition-colors">
                    Refunds
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-purple-200 hover:text-white transition-colors">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-purple-200 hover:text-white transition-colors">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <address className="not-italic text-purple-200">
                <p>Email: info@secureticket.com</p>
                <p>Phone: +34 91 123 45 67</p>
                <p>Address: Main Street 123, Madrid</p>
              </address>
            </div>
          </div>
          <div className="border-t border-purple-900 mt-8 pt-8 text-center text-purple-200">
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
                <h3 className="text-xl font-bold text-purple-900">{selectedEvent.title}</h3>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-700" aria-label="Close">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <p className="text-gray-600 mb-6">{selectedEvent.description}</p>

              <div className="mb-6">
                <h4 className="font-medium text-purple-800 mb-3">Select your ticket type:</h4>
                <div className="space-y-2">
                  {selectedEvent.tickets.map((ticket) => (
                    <div
                      key={ticket.type}
                      className={`flex justify-between items-center p-3 border rounded-md cursor-pointer transition-colors ${
                        selectedTicketType === ticket.type
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-purple-300"
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
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={!selectedTicketType}
                  onClick={() => handlePurchase(account)}
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


