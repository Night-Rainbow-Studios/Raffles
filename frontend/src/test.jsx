import React, { useEffect, useRef, useState } from 'react';
import Api from './utils/Request/Api';
import { Button, Alert, CircularProgress } from '@mui/material';
import AvailableTickets from './components/ui/availableTickets';
import TicketsTable from './components/ui/ticketsTable';

export default function Test() {

    const [resultStatus, updateResult] = useState();

    useEffect(() => {
      callAPI()
    }, [])


    async function callAPI(){
        try {
            updateResult(<CircularProgress />)
            var api = new Api({host:"http://localhost:8080"})
            var request = api.get("api/freeTickets")
            var result = await request.send({})
            console.log("Available Tickets fetched");
            updateResult(<AvailableTickets availableTickets = {result}/>)
        } catch (error) {
            updateResult(<Alert severity="error">Error</Alert>)
            console.log("error")
            console.log(error)
        }
    }


  return (
    <TicketsTable/>
  )
}
