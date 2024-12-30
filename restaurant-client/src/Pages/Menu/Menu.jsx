import React from 'react'
import Navbar from '../../Shared/Navbar'
import Footer from '../../Shared/Footer'
import { Helmet } from 'react-helmet-async'
import Cover from '../../Shared/Cover'
import menuImg from '../../assets/menu/menu-bg.jpg'
import PopularMenu from '../Home/components/PopularMenu'

const Menu = () => {
  return (
    <>
    <Helmet>
        <title>Our Menu | {import.meta.env.VITE_NAME}</title>
    </Helmet>
    <Navbar/>
    <Cover img={menuImg} title={'our menu'} tagline={'Would you like to try a dish?'}/>
    <PopularMenu/>
    <Cover img={menuImg} title={'our menu'} tagline={'Would you like to try a dish?'}/>
    <PopularMenu/>
    <Cover img={menuImg} title={'our menu'} tagline={'Would you like to try a dish?'}/>
    <PopularMenu/>
    <Footer/>
    </>
  )
}

export default Menu