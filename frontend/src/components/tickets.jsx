import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Ticket from './ticket';
import ticketsService from './ticketsService';

function Tickets_List() {
    const [tickets, setTickets] = useState([]);
    useEffect(() => {
        const fetchTickets = async () => {
          const data = await ticketsService.getContent();
          setTickets(data);
        };
        fetchTickets();
      }, []);

  return (
    <div>
      {tickets.map(ticket => (
        <Ticket key={ticket.id} {...ticket} />
      ))}
    </div>
  );
}

export default Tickets_List;