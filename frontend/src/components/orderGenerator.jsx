import React, { useEffect, useRef, useState } from 'react';
import Api from '../utils/Request/Api';
import TextField from '@mui/material/TextField';
import { Button, Alert, CircularProgress } from '@mui/material';
import contentService from '../services/content/content_service';
import WhatsAppLink from './ui/purchaseButton';
import CustomerForm from './ui/customerForm';

const service = new contentService()


export default function OrderGenerator() {
    const amount = useRef(0)
    const price = 5

    const[operationStatus, updateOperation] = useState();
    const [showForm, setShowForm] = useState(false);
    const [selectedTickets, setSelectedTickets] = useState([]);
    const [orderData, setOrderData] = useState({
        id:'',
        price:'',
        time:''
      })


    async function callAPI(){
        try {
            var api = new Api({host:"http://localhost:8080"})
            var request = api.post("api/orders")
            request.query({amount:amount.current, price:price})
            var result = await request.send({})
            setShowForm(true);
            console.log(result)
            setOrderData({
                id: result.id,
                price: result.price,
                time: result.time,
              });
            setSelectedTickets(result.tickets)
            console.log(result)
        } catch (error) {
            console.log("error")
            console.log(error)
        }
    }


  return (
    <div className="md:flex md:justify-center md:max-w-full">
        <div className='m-3 p-2 bg-white max-w-full border-2 border-slate-500' style={{display:"flex", flexDirection:"column", gap:"10px"}}>
            <h1 className='font-sans font-bold underline text-center'>MAQUINITA DE LA SUERTE</h1>
            <TextField id = "enter_amount" label = "Cantidad" variant = "outlined" onChange={(event) => {amount.current = event.target.value}}/>
            {/* <div className='flex justify-center max-w-full'>{operationStatus}</div> */}
            {/* <Button onClick={() => {callAPI()}} variant = "contained" sx={{width:"20vh"}}>Generar</Button> */}
            <div className='flex justify-center'>
                {!showForm && (
                    <Button onClick={() => {callAPI()}} variant="contained" sx={{ width: '20vh' }}>
                    Apartar
                    </Button>
                )}
                {showForm && <CustomerForm selectedTickets={selectedTickets} orderData={orderData}/>}
            </div>
        </div>
    </div>
  )
}
