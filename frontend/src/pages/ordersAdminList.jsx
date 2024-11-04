import React, { useEffect, useRef, useState } from 'react';
import Api from '../utils/Request/Api';
import { Button, Alert, CircularProgress } from '@mui/material';
import OrdersRender from '../components/ui/ordersRender';

export default function OrdersAdminList() {

    const [resultStatus, updateResult] = useState();

    useEffect(() => {
      callAPI()
    }, [])


    async function callAPI(){
        try {
            updateResult(<CircularProgress />)
            var api = new Api({host:"http://localhost:8080"})
            var request = api.get("api/orders")
            var result = await request.send({})
            console.log("Orders fetched");
            console.log(result)
            updateResult(<OrdersRender orders = {result}/>)
        } catch (error) {
            updateResult(<Alert severity="error">Error</Alert>)
            console.log("error")
            console.log(error)
        }
    }


  return (
    <section>{resultStatus}</section>
  )
}
