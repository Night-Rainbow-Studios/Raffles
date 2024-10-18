import React, { useRef, useState } from 'react';
import Api from '../utils/Request/Api';
import { Button, Alert, CircularProgress } from '@mui/material';

export default function WinRaffle() {

    const [resultStatus, updateResult] = useState();


    async function callAPI(){
        try {
            updateResult(<CircularProgress />)
            var api = new Api({host:"http://localhost:8080"})
            var request = api.put("api/winner")
            var result = await request.send({})
            console.log("Winner");
            console.log(result);
            updateResult(<Alert severity="success">Rifa terminada. El ganador es: {result.winner}</Alert>)
            console.log(result)
        } catch (error) {
            updateResult(<Alert severity="error">Error</Alert>)
            console.log("error")
            console.log(error)
        }
    }


  return (
    <div>
        <Button onClick={() => {callAPI()}} variant = "contained" sx={{width:"20vh"}}>Obtener ganador</Button>
        <div className='flex justify-center max-w-full'>{resultStatus}</div>
    </div>
  )
}