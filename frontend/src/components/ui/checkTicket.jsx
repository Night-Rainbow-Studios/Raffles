import React, { useRef, useState } from "react";
import Api from "../../utils/Request/Api";
import { Button, Alert, CircularProgress, TextField } from "@mui/material";

export default function CheckTicket() {
  const ticketId = useRef(0);

  const [ticketStatus, updateTicketStatus] = useState();

  async function callAPI() {
    try {
      updateTicketStatus(<CircularProgress />);
      const api = new Api({ host: "http://localhost:8080" });
      const request = api.get("api/frontendTicket/" + ticketId.current);
      const result = await request.send({});

      const severity = result.payed ? "success" : "warning";
      updateTicketStatus(<Alert severity={severity}>{result.message}</Alert>);
      console.log(result);
    } catch (error) {
      updateTicketStatus(<Alert severity="error">Error</Alert>);
      console.log("error");
      console.log(error);
    }
  }

  return (
    <div className="md:flex md:justify-center md:max-w-full">
      <div
        className="m-3 p-2 bg-white max-w-full border-2 border-slate-500 md:p-3 md:m-5"
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <h1 className="font-sans font-bold underline">Consultar ticket</h1>
        <TextField
          id="enter_ticket_id_consult"
          label="ID del ticket"
          variant="outlined"
          onChange={(event) => {
            ticketId.current = event.target.value;
          }}
        />
        <div className="flex justify-center max-w-full">{ticketStatus}</div>
        <Button
          onClick={() => callAPI()}
          variant="contained"
          sx={{ width: "20vh" }}
        >
          Consultar
        </Button>
      </div>
    </div>
  );
}