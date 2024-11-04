import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import SearchBar from '../components/searchBar.jsx'
import TicketsTable from '../components/ui/ticketsTable.jsx'
import contentService from '../services/content/content_service.js'
import OrderGenerator from '../components/orderGenerator.jsx'
import { useState, useEffect } from "react";

const service = new contentService()

export default function BuyTickets() {
    const [heroic, setHeroic] = useState("")

    async function fetchAPI() {
        const result = await service.getContent();
        setHeroic(result);
    }

    useEffect(() => {
        fetchAPI()
    }, []);

    return (
        <section>
            <Header service={service} />
            <div className='max-w-full text-center m-2'>
                <h1 className='text-xl md:text-6xl text-gray-50 m-2 md:m-4 p-1 md:p-5 bg-green-900'>{heroic.title}</h1>
                <h2 className='text-xl md:text-4xl text-gray-900 m-2 md:m-3 p-1 md:p-4'>{heroic.date}</h2>
            </div>
            <div className='max-w-full text-center m-2'>
                <h1 className='text-xl md-text-4xl text-gray-800 underline'>
                    ELIGE TUS BOLETOS DEBAJO
                </h1>
            </div>
            <div className='max-w-full flex justify-center max-w-ful'>
                <img src='/images/dinero_img.webp' className='border-2 border-rose-500 object-center'></img>
            </div>
            <div className='max-w-full text-center m-4 bg-gray-800 p-5 text-gray-50'>
                <h1 className='text-xl md:text-2xl m-2'>{heroic.info1}</h1>
                <h1 className='text-xl md:text-2xl m-2'>{heroic.info2}</h1>
                <h1 className='text-xl md:text-2xl m-2'>{heroic.info3}</h1>
                <h1 className='text-xl md:text-2xl m-2'>{heroic.info4}</h1>
            </div>
            <div className='max-w-full text-center bg-yellow-300 m-2 md:m-3 p-2 md:p-5'>
                <h1 className='text-2xl md:text-4xl'>Estos sorteos son seguros</h1>
                <h1 className='text-xl md:text-2xl'>ES UN SITIO VERIFICADO, CLICK AQUI PARA MAS DETALLES</h1>
            </div>
            <div className='max-w-full text-center bg-red-700 m-1 md:m-3 p-2'>
                <h1 className='text-xl md:text-2xl text-gray-50'>HAZ CLICK ABAJO EN TU NUMERO DE LA SUERTE</h1>
            </div>
            <OrderGenerator/>
            <TicketsTable/>
            {/* <div className='flex justify-center m-3 md:m-4 p-2 md:-4 bg-emerald-400 m-2 md:m-6'>
                <p className='p-3 mx-2 bg-gray-50 rounded-full'> </p>
                <p className='text-xl md:text-2xl'>Blancos = Disponibles</p>
            </div>
            <div className='max-w-full flex justify-center'>
                <TicketsTable />
            </div> */}
            <Footer />
        </section>
    )
}
