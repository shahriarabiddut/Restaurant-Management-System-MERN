import React from 'react'
import Banner from './components/Banner'
import Category from './components/Category'
import MidCard from './components/MidCard'
import PopularMenu from './components/PopularMenu'
import Featured from './components/Featured'
import './Home.css'

const Home = () => {
  return (
    <section>
        <Banner/>
        <Category/>
        {/* <MidCard/> */}
        <PopularMenu/>
        <Featured/>
    </section>
  )
}

export default Home