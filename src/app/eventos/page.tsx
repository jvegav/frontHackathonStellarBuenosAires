import React from 'react';
import Image from 'next/image';
import '../globals.css'

type Ticket = {
  type: string;
  price: number;
};

export default function Home() {


  const  eventos = [
    {
      "id": 3,
      "title": "Exposición de Arte Moderno",
      "description": "Una muestra de arte contemporáneo de artistas emergentes.",
      "image": "/art-exhibition.jpg",
      "tickets": [
        { "type": "Entrada General", "price": 25 },
        { "type": "VIP", "price": 50 }
      ]
    },
]
return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Eventos Disponibles</h1>
      <div className="space-y-6">
        {eventos.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <Image
              src={event.image}
              alt={event.title}
              width={2000}
              height={500}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">{event.title}</h2>
              <p className="text-gray-700 mb-4">{event.description}</p>
              <h3 className="text-xl font-medium mb-2">Tickets:</h3>
              <ul className="space-y-2">
                {event.tickets.map((ticket: Ticket, index: number) => (
                  <li key={index} className="text-gray-600">
                    {ticket.type} - <span className="font-bold">${ticket.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}