/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

const UserTickets = ({ userTickets = [] }: { userTickets?: any[] }) => {
  return (
    <div>
      <h2>Your Tickets</h2>
      {userTickets.length > 0 ? (
        <ul>
          {userTickets.map((ticket) => (
            <li key={ticket.id}>
              {ticket.description} - {ticket.ticket_id}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tickets found.</p>
      )}
    </div>
  );
};

export default UserTickets;
