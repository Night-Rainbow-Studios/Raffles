import React, { useRef, useState } from 'react';
import Api from '../utils/Request/Api';
import TextField from '@mui/material/TextField';
import { Button, Alert, CircularProgress } from '@mui/material';

export default function PayOrder() {

    const id = useRef(0)

    const [resultStatus, updateResult] = useState();


    async function callAPI(){
        try {
            updateResult(<CircularProgress />)
            var api = new Api({host:"http://localhost:8080"})
            var request = api.put("api/order/" + id.current)
            var result = await request.send({})
            console.log("Payed order");
            console.log(result);
            updateResult(<Alert severity="success">Orden pagada.</Alert>)
            console.log(result)
        } catch (error) {
            updateResult(<Alert severity="error">Error</Alert>)
            console.log("error")
            console.log(error)
        }
    }


  return (
        <div className='m-3 p-2 bg-white max-w-full border-2 border-slate-500' style={{display:"flex", flexDirection:"column", gap:"10px"}}>
            <h1 className='font-sans font-bold underline'>Pagar orden</h1>
            <TextField id = "enter_order_id_consult" label = "ID" variant = "outlined" onChange={(event) => {id.current = event.target.value}}/>
            <div className='flex justify-center max-w-full'>{resultStatus}</div>
            <Button onClick={() => {callAPI()}} variant = "contained" sx={{width:"20vh"}}>Pagar</Button>
        </div>   
  )
}
