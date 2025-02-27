import React from 'react'
import Header from '../components/header.jsx'
import HeroHome from '../components/heroHome'
import About from '../components/about'
import Contact from '../components/contactUs'
import Footer from '../components/footer'
import contentService from '../services/content/content_service.js'
import CheckTicket from '../components/ui/checkTicket.jsx'

const service = new contentService()

export default function Landing() {
    return (
        <>
            <Header service={service} />
            <HeroHome service={service} />
            <About />
            <CheckTicket/>
            <Contact service={service} />
            <Footer />
        </>
    )
}
