import React, { useEffect, useRef, useState } from 'react';
import Api from './utils/Request/Api';
import TextField from '@mui/material/TextField';
import { Button, Alert, CircularProgress } from '@mui/material';
import GenerateDb from './components/generateDb';
import ClearRaffleButton from './components/clearRaffleButton';
import OrderGenerator from './components/orderGenerator';
import WinRaffle from './components/winRaffle';
import ConsultOrder from './components/orderConsultor';
import PayOrder from './components/payOrder';
import CloseOrder from './components/closeOrder';

export default function Test() {

    const id = useRef(0)

    const [resultStatus, updateResult] = useState();


    async function callAPI(){
        try {
            updateResult(<CircularProgress />)
            var api = new Api({host:"http://localhost:8080"})
            var request = api.put("api/closeOrder/" + id.current)
            var result = await request.send({})
            console.log("Payed order");
            console.log(result);
            updateResult(<Alert severity="success">Orden Cancelada.</Alert>)
            console.log(result)
        } catch (error) {
            updateResult(<Alert severity="error">Error</Alert>)
            console.log("error")
            console.log(error)
        }
    }


  return (
    <div>
        <GenerateDb/>
        <ClearRaffleButton/>
        <WinRaffle/>
        <OrderGenerator/>
        <ConsultOrder/>
        <PayOrder/>
        <CloseOrder/>
    </div>
  )
}
