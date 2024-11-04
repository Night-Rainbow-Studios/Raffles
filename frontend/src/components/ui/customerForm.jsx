import React, {useState, useEffect} from 'react';
import { TextField, Alert } from '@mui/material';
import moment from 'moment';

export default function CustomerForm({ onChange, selectedTickets, orderData, customerName, customerPhone }) {

  const formattedDate = moment.unix(orderData.time).format('DD/MM/YYYY, HH:mm');

  const [formattedTickets, setFormattedTickets] = useState([]);

  const [whatsUrl, setWhatsUrl] = useState("");

  const testNumber = "525537244511"

  // const [number, setNumber] = useState("")

    // async function fetchPhone() {
    //     var resulted = await props.service.getContent();
    //     setNumber(resulted);
    // }

    // useEffect(() => {
    //     fetchPhone()
    // }, []);

  function createWhatsAppMessage(orderData, customerName, customerPhone, formattedTickets) {
    const formattedDate = moment.unix(orderData.time).format('DD/MM/YYYY, HH:mm');

    const encodedMessage = `https://wa.me/${testNumber}?text=%2A%2ARifas%20MX%2A%2A%0A%0AHola.%20Mi%20nombre%20es%20${customerName}%2C%20y%20mi%20n%C3%BAmero%20de%20tel%C3%A9fono%20es%20${customerPhone}.%0A%0AOrden%3A%2${orderData.id}%0AApartado%20el%3A%20${formattedDate}.%0AImporte%20a%20pagar%3A%20${orderData.price}.%0A%0ABoletos%3A%0A${formattedTickets}%0A%0AEnlace%20para%20ver%20las%20cuentas%20para%20pagar%3A%0Ahttps%3A%2F%2Frifas.com%2FcuentasPago%0A%0Ael%20siguiente%20paso%20es%20enviar%20tu%20comprobante%20de%20pago%20por%20este%20medio%2C%20en%20cuanto%20env%C3%ADes%20tu%20comprobante%20te%20llegar%C3%A1%20tu%20boleto%20digital.%0A%0A55555555555555%20banco%20STP%20----------%20a%20nombre%20de%20Jon%20Doe%0A%0A55555555555555%20banco%20BBVA%20--------a%20nombre%20de%20John%20Doe%0A%0A%E2%9A%A0EXCLUSIVO%20DEP%C3%93SITO%20EN%20OXXO%E2%9A%A0%20555555555%2B%2B%2B%2Bbanco%20SPIN%2B%2B%2B%2B%2B%2B%2B%2B%2B%2B%2B%2B%2B%2B%2B%2B%2B%2B%2Ba%20nombre%20de%20John%20Doe%0A%0AEntiendo%20que%20debo%20enviar%20mi%20comprobante%20de%20pago%20v%C3%ADa%20WhatsApp%20en%20un%20lapso%20no%20mayor%20a%20una%20hora.%0A%0ARifas%20MX`;
  
    return encodedMessage;
  }

  useEffect(() => {
    const newFormattedTickets = selectedTickets.map(ticket => `${ticket}%0D`);
    setFormattedTickets(newFormattedTickets);
    const whatsUrl = createWhatsAppMessage(orderData, customerName, customerPhone, formattedTickets);
    setWhatsUrl(whatsUrl);
  }, [selectedTickets, orderData, customerName, customerPhone]);

  const [isFormFilled, setIsFormFilled] = useState(false);

  useEffect(() => {

    setIsFormFilled(customerName !== "" && customerPhone !== "");
  }, [customerName, customerPhone]);

  return (
    <div>
      <Alert severity="success">
        <div className='text-center'>
          <p>¡Operación completada el {formattedDate}! Tus boletos son:</p>
          {selectedTickets.map((ticketId) => (
            <div key={ticketId} className="flex justify-center">
              <p>{ticketId}</p>
              <br />
            </div>
          ))}
          <p>Por favor, llena tus datos abajo para apartar la orden. <br></br> ¡Tienes solo una hora para pagar!</p>
        </div>
      </Alert>
      <form className='content-center md:flex items-center md:justify-center'>
        <div className='flow-rot m-3'>
          <TextField
            id="enter_name"
            label="Nombre Completo"
            variant="outlined"
            name="name"
            onChange={onChange}
            required
          />
        </div>
        <div className='flow-rot m-3'>
          <TextField
            id="enter_phone"
            label="Número de teléfono"
            variant="outlined"
            name="phone"
            onChange={onChange}
            required
          />
        </div>
      </form>
      <a href={isFormFilled ? whatsUrl : "#"} className="text-center mt-4 block font-bold text-lg text-white bg-blue-700 hover:bg-blue-800 py-2 rounded-md shadow-sm">Pagar</a>
    </div>
  );
}