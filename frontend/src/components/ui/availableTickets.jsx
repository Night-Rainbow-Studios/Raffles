import React, { useState, useEffect } from 'react';
import { Button, CircularProgress } from '@mui/material';
import axios from "axios";
import CustomerForm from './customerForm';

export default function AvailableTickets(props) {
  const [selectedTickets, setSelectedTickets] = useState([]);
  const fixedPrice = 5
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
  });

  const [orderData, setOrderData] = useState({
    id:'',
    price:'',
    time:''
  })

  const [showForm, setShowForm] = useState(false);
  const [orderedTickets, setOrderedTickets] = useState([]);

  const handleInputChange = (event) => {
    setCustomerData({ ...customerData, [event.target.name]: event.target.value });
  };


  const handleTicketClick = (ticketId) => {
    if (selectedTickets.includes(ticketId)) {
      setSelectedTickets(selectedTickets.filter((id) => id !== ticketId));
    } else {
      setSelectedTickets([...selectedTickets, ticketId]);
    }
  };

  const handleSubmit = async () => {
    if (selectedTickets.length === 0) {
      console.log('No tickets selected!');
      return;
    }

    const data = {
      selected_tickets: selectedTickets,
      price: fixedPrice,
    };

    try {
      const response = await axios.post('http://localhost:8080/api/specificOrder', data);
      console.log('Order ID is: ', response.data.id)
      console.log('Order price is: ', response.data.price)
      console.log('Order time is: ', response.data.time)
      setOrderData({
        id: response.data.id,
        price: response.data.price,
        time: response.data.time,
      });
      setOrderedTickets(selectedTickets)
      setShowForm(true);
    } catch (error) {
      console.error('Error sending order:', error);
    }
  };

  return (
    <>
        <div className="max-w-screen-md mx-auto p-4">
            <div className="overflow-y-auto max-h-96">
                <div className="grid grid-cols-2 md:grid-cols-10 gap-x-1 gap-y-1">
                {props.availableTickets.map((item) => (
                    <div
                    key={item.id}
                    className={`text-center border-2 w-16 mx-0 ${
                        selectedTickets.includes(item.id) ? 'bg-slate-400 border-yellow-500 hover:bg-slate-300' : 'bg-slate-200 border-green-600 hover:bg-slate-400'
                    }`}
                    onClick={() => handleTicketClick(item.id)}
                    >
                    <p>{item.id}</p>
                    </div>
                ))}
                </div>
            </div>
        </div>
        {/* <div>
          <p>Nombre: {customerData.name}</p>
          <p>Teléfono: {customerData.phone}</p>
        </div> */}
        <div className='flex justify-center'>
          {!showForm && (
            <Button onClick={handleSubmit} variant="contained" sx={{ width: '20vh' }}>
              Apartar
            </Button>
          )}
          {showForm && <CustomerForm onChange={handleInputChange} selectedTickets={orderedTickets} orderData={orderData} customerName={customerData.name} customerPhone={customerData.phone}/>}
        </div>
    </>
  );
}
