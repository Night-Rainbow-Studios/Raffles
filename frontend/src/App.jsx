import React from 'react'

import Header from './components/header'
import HeroHome from './components/heroHome'
import About from './components/about'
import Contact from './components/contactUs'
import Footer from './components/footer'
import contentService from './services/content/content_service.js'
import {
  RouterProvider
} from "react-router-dom";
import routes from './routes/routers.jsx'

const App = () => {
  return (
    <RouterProvider router={routes}></RouterProvider>
    // <>
    //   <Header />
    //   <HeroHome service={service} />
    //   <About />
    //   <Contact service={service} />
    //   <Footer />
    // </>
  )
}

export default App