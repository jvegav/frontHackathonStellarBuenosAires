import React from 'react';
import Image from 'next/image';
import './globals.css';

type Ticket = {
  type: string;
  price: number;
};

export default function Home() {
  const eventos = [
    {
      id: 3,
      title: "Exposición de Arte Moderno",
      description: "Una muestra de arte contemporáneo de artistas emergentes.",
      image: "/art-exhibition.jpg",
      tickets: [
        { type: "Entrada General", price: 25 },
        { type: "VIP", price: 50 },
      ],
    },
    // Agrega más eventos aquí para ver cómo se distribuyen en las columnas
    {
      id: 4,
      title: "Concierto de Rock",
      description: "Disfruta de las mejores bandas de rock en vivo.",
      image: "/rock-concert.jpg",
      tickets: [
        { type: "Entrada General", price: 30 },
        { type: "VIP", price: 75 },
      ],
    },
    {
      id: 5,
      title: "Festival de Cine",
      description: "Proyecciones de películas independientes y clásicas.",
      image: "/film-festival.jpg",
      tickets: [
        { type: "Entrada General", price: 20 },
        { type: "VIP", price: 45 },
      ],
    },
  ];

  return (
    <div className="p-6 bg-black min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Eventos Disponibles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventos.map((event) => (
          <div
            key={event.id}
            className="bg-blue-900 rounded-lg shadow-md overflow-hidden"
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
              <p className="text-gray-200 mb-4">{event.description}</p>
              <h3 className="text-xl font-medium mb-2">Tickets:</h3>
              <ul className="space-y-2">
                {event.tickets.map((ticket: Ticket, index: number) => (
                  <li key={index} className="text-gray-200">
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