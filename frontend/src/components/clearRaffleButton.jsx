import React, { useState } from 'react'
import Api from '../utils/Request/Api'
import { Button, Alert } from '@mui/material';

export default function ClearRaffleButton() {
    var api = new Api({host:"http://localhost:8080"})

    const [resultStatus, updateResult] = useState();

    async function clearDB(){
        try {
            var request = api.put("api/clear")
            var result = await request.send({})
            updateResult(<Alert severity = "success">Base de datos: {result.mensaje}</Alert>)
        } catch (error) {
            console.log("error")
            console.log(error)
        }
    }

  return (
    <>
    <Button onClick={() => {clearDB()}} variant="outlined" color="error">Reiniciar Rifa</Button>
    <div className='flex justify-center max-w-full'>{resultStatus}</div>
    </>
    
  )
}
