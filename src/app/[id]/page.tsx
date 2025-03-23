import React from 'react';
import Image from 'next/image';


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
      image: "/film-festival.webp",
      tickets: [
        { type: "Entrada General", price: 20 },
        { type: "VIP", price: 45 },
      ],
    },
  ];

export default function EventDetail({ params }: { params: { id: string } }) {
  const eventId = parseInt(params.id, 10);
  const event = eventos.find((event) => event.id === eventId);

  if (!event) {
    return <div>Evento no encontrado</div>;
  }

  return (
    <div className="p-6 bg-black min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">{event.title}</h1>
        <Image
          src={event.image}
          alt={event.title}
          width={2000}
          height={500}
          className="w-full h-64 object-cover rounded-lg"
        />
        <p className="text-gray-200 mt-6">{event.description}</p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Tickets:</h2>
        <ul className="space-y-2">
          {event.tickets.map((ticket, index) => (
            <li key={index} className="text-gray-200">
              {ticket.type} - <span className="font-bold">${ticket.price}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}