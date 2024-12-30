import React from 'react'
import Banner from './components/Banner'
import Category from './components/Category'
import MidCard from './components/MidCard'
import PopularMenu from './components/PopularMenu'
import Featured from './components/Featured'
import './Home.css'
import Testimonials from './components/Testimonials'
import { Helmet } from 'react-helmet-async'

const Home = () => {
  return (
    <section>
        <Helmet>
          <title>Home | {import.meta.env.VITE_NAME}</title>
        </Helmet>
        <Banner/>
        <Category/>
        {/* <MidCard/> */}
        <PopularMenu/>
        <Featured/>
        <Testimonials/>
    </section>
  )
}

export default Home