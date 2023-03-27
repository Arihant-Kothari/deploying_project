import React from 'react'
import AboutUs from './AboutUs'
import ContactUs from './ContactUs'
import HeroSection from './HeroSection'
import Navbar from './Navbar'

const LandingPage = () => {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <AboutUs/>
    <ContactUs/>
    </>
  )
}

export default LandingPage