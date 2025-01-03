import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../Shared/Footer'
import Navbar from '../Shared/Navbar'

const Main = () => {
  const location = useLocation();
  const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signup');
  // console.log(noHeaderFooter);
  return (
    <section className='max-w-screen-xl mx-auto'>
      {noHeaderFooter ||  <Navbar/>}
        <Outlet/>
      {noHeaderFooter ||  <Footer/>}
    </section>
  )
}

export default Main