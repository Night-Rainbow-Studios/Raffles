import React from 'react'
import Contact from '../components/contactUs'
import Header from '../components/header'
import Footer from '../components/footer.jsx'
import contentService from '../services/content/content_service.js'
import { Link } from 'react-router-dom';

const service = new contentService()

const RaffleClosed = () => {
    return (
        <section>
            <Header service={service} />
            <div className='m-2 md:m-5 max-w-full p-1 md:p-3 text-center'>
                <Link to="/">
                    <h1 className='text-5xl'>LOGO</h1>
                </Link>
            </div>
            <div className='m-5 md:m-8 max-w-full text-center p-1 md:p-4 bg-yellow-400 rounded-md'>
                <h1 className='text-xl md:text-6xl text-gray-50'>ESTA RIFA YA SE CERRO</h1>
            </div>
            <div className='m-5 md:m-8 max-w-full text-center p-1 md:p-2'>
                <p className='text-2xl md:text-3xl text-red-500 my-1'>Puedes estar atento de los siguientes sorteos</p>
                <p className='text-xl md:text-2xl my-1'>Los anunciaremos en nuestras redes sociales</p>
            </div>
            <Contact service={service} />
            <Footer />
        </section>
    )
}

export default RaffleClosed