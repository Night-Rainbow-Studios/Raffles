import React, { useEffect, useRef, useState } from 'react';
import Api from '../utils/Request/Api';
import { Button, Alert, CircularProgress } from '@mui/material';
import TicketRender from '../components/ui/ticketRender';

export default function AdminTicketList() {

    const [resultStatus, updateResult] = useState();

    useEffect(() => {
      callAPI();
    }, [])


    async function callAPI(){
        try {
            updateResult(<CircularProgress />)
            var api = new Api({host:"http://localhost:8080"})
            var request = api.get("api/tickets")
            var result = await request.send({})
            console.log("Tickets fetched");
            console.log(result)
            updateResult(<TicketRender tickets = {result}/>)
        } catch (error) {
            updateResult(<Alert severity="error">Error</Alert>)
            console.log("error")
            console.log(error)
        }
    }


  return (
    <div>
        {resultStatus}
    </div>
  )
}
