import React from 'react'
import Logo from '../components/logo'
import Contact from '../components/contactUs'
import Header from '../components/header'
import contentService from '../services/content/content_service.js'

const service = new contentService()

const RaffleClosed = () => {
    return (
        <section>
            <Header service={service} />
            <Logo />
            <div>
                <h1>ESTA RIFA YA SE CERRO</h1>
                <p>Puedes estar atento de los siguientes sorteos</p>
                <p>Los anunciaremos en nuestras redes sociales</p>
            </div>
            <Contact />
        </section>
    )
}

export default RaffleClosed