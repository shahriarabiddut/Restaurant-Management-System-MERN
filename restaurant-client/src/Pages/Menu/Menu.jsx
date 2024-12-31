import React from 'react'
import { Helmet } from 'react-helmet-async'
import SectionTitle from '../../components/SectionTitle'
import Cover from '../../Shared/Cover'
import MenuCategory from './components/MenuCategory'
// BG Images
import dessertImg from '../../assets/menu/dessert-bg.jpeg'
import menuImg from '../../assets/menu/menu-bg.jpg'
import pizzaImg from '../../assets/menu/pizza-bg.jpg'
import saladImg from '../../assets/menu/salad-bg.jpg'
import soupImg from '../../assets/menu/soup-bg.jpg'

const Menu = () => {
  return (
    <>
    <Helmet>
        <title>Our Menu | {import.meta.env.VITE_NAME}</title>
    </Helmet>
    <Cover img={menuImg} title={'our menu'} tagline={'Would you like to try a dish?'} big={true}/>
    <SectionTitle subHeading={` Don't Miss`} heading={`TODAY'S OFFER`} />
    <MenuCategory selectedCategory={'offered'}/>

    <Cover img={dessertImg} title={'DESSERTS'} tagline={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}/>
    <MenuCategory selectedCategory={'dessert'}/>

    <Cover img={pizzaImg} title={'pizza'} tagline={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}/>
    <MenuCategory selectedCategory={'pizza'}/>

    <Cover img={saladImg} title={'salad'} tagline={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}/>
    <MenuCategory selectedCategory={'salad'}/>

    <Cover img={soupImg} title={'soup'} tagline={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}/>
    <MenuCategory selectedCategory={'soup'}/>
    </>
  )
}

export default Menu