import React from 'react';
import { useState, useEffect } from 'react';

export default function WhatsAppLink(props) {
    const [number, setNumber] = useState("")

    async function fetchAPI() {
        var resulted = await props.service.getContent();
        setNumber(resulted);
    }

    useEffect(() => {
        fetchAPI()
    }, []);

    var wsLink = "https://wa.me/" + number.phone + "?text=Hola,%20tengo%20una%20orden.%20Mi%20id%20es%20" + props.id + "%20y%20el%20precio%20es%20" + props.price;

    return(
        <a id = "WhatsappLink" href={wsLink}>Pagar</a>
    );
}