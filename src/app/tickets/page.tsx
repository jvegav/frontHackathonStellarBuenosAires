/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import '../globals.css'
import Link from 'next/link';

interface Ticket {
    id: string
    description: string
  }
  

const UserTickets = () => {

    const searchParams = useSearchParams();
    const tickets1 = searchParams.get('tickets');
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
    const [showQrModal, setShowQrModal] = useState(false)

  
    const openQrModal = (ticket: Ticket) => {
        setSelectedTicket(ticket)
        setShowQrModal(true)
  }

  const closeQrModal = () => {
    setShowQrModal(false)
  }
    

  const tickets = tickets1 ? JSON.parse(tickets1 as string) : [];
  return (
    <div className="w-full  bg-white shadow-md rounded-lg overflow-hidden">
      
      <div className="border-b border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-purple-800">Your Tickets</h2>
        <Link href='/' className="text-2xl font-bold text-purple-800">Home</Link>
        
      </div>

      {/* Content */}
      <div className="p-6">
        {tickets.length > 0 ? (
          <ul className="space-y-3">
            {tickets.map((ticket?: any) => (
              <li
                key={ticket.id}
                className="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:border-purple-300 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{ticket.description}</h3>
                    <p className="text-sm text-gray-500">Ticket ID: {ticket.id}</p>
                  </div>
                  <button
                    className="px-3 py-1.5 text-sm bg-white border border-purple-200 text-purple-700 rounded-md hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors"
                    onClick={() => openQrModal(ticket)}
                  >
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-1.5"
                      >
                        <rect width="6" height="6" x="3" y="3" rx="1" />
                        <rect width="6" height="6" x="15" y="3" rx="1" />
                        <rect width="6" height="6" x="3" y="15" rx="1" />
                        <rect width="6" height="6" x="15" y="15" rx="1" />
                      </svg>
                      View QR
                    </div>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="bg-gray-50 rounded-full p-6 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <rect width="6" height="6" x="3" y="3" rx="1" />
                <rect width="6" height="6" x="15" y="3" rx="1" />
                <rect width="6" height="6" x="3" y="15" rx="1" />
                <rect width="6" height="6" x="15" y="15" rx="1" />
              </svg>
            </div>
            <p className="text-gray-600 text-center">No tickets found</p>
            <p className="text-gray-500 text-sm text-center mt-1">Your purchased tickets will appear here</p>
          </div>
        )}
      </div>

      {/* QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-purple-800">Ticket QR Code</h3>
                <button onClick={closeQrModal} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                {/* This is a placeholder for a real QR code */}
                <div className="w-48 h-48 bg-gray-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="128"
                    height="128"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-purple-800"
                  >
                    <rect width="6" height="6" x="3" y="3" rx="1" />
                    <rect width="6" height="6" x="15" y="3" rx="1" />
                    <rect width="6" height="6" x="3" y="15" rx="1" />
                    <rect width="6" height="6" x="15" y="15" rx="1" />
                  </svg>
                </div>
              </div>
              <div className="text-center">
                <h3 className="font-medium">{selectedTicket?.description}</h3>
                <p className="text-sm text-gray-500">Ticket ID: {selectedTicket?.id}</p>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 flex justify-end">
              <button
                onClick={closeQrModal}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTickets;