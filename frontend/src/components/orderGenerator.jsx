import React, { useEffect, useRef, useState } from 'react';
import Api from '../utils/Request/Api';
import TextField from '@mui/material/TextField';
import { Button, Alert, CircularProgress } from '@mui/material';
import contentService from '../services/content/content_service';
import WhatsAppLink from './ui/purchaseButton';

const service = new contentService()


export default function OrderGenerator() {
    const amount = useRef(0)
    const price = 5

    const[operationStatus, updateOperation] = useState();


    async function callAPI(){
        try {
            updateOperation(<CircularProgress />)
            var api = new Api({host:"http://localhost:8080"})
            var request = api.post("api/orders")
            request.query({amount:amount.current, price:price})
            var result = await request.send({})
            updateOperation(<Alert severity="success">Operacion Exitosa. Tu ID de orden es {result.id} y el precio es {result.price} <WhatsAppLink service = {service} id = {result.id} price = {result.price}/></Alert>)
            console.log(result)
        } catch (error) {
            updateOperation(<Alert severity="error">Error</Alert>)
            console.log("error")
            console.log(error)
        }
    }


  return (
    <div>
        <div className='m-3 p-2 bg-white max-w-full border-2 border-slate-500' style={{display:"flex", flexDirection:"column", gap:"10px"}}>
            <h1 className='font-sans font-bold underline'>Genera tu orden!</h1>
            <TextField id = "enter_amount" label = "Cantidad" variant = "outlined" onChange={(event) => {amount.current = event.target.value}}/>
            <div className='flex justify-center max-w-full'>{operationStatus}</div>
            <Button onClick={() => {callAPI()}} variant = "contained" sx={{width:"20vh"}}>Generar</Button>
        </div>
    </div>
  )
}
