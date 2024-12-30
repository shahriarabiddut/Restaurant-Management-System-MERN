import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Footer from '../../Shared/Footer';
import Navbar from '../../Shared/Navbar';

import orderCover from '../../assets/shop/order.jpg';
import Cover from '../../Shared/Cover';
import FoodCategory from './components/FoodCategory';

const Order = () => {
  return (
    <>
    <Helmet>
        <title>Order | {import.meta.env.VITE_NAME}</title>
    </Helmet>
    <Navbar/>
    <Cover img={orderCover} title={'Our Shop'} tagline={'Would you like to try a dish? Order Food'} big={true}/>
    {/* Tabs */}
    <Tabs className={'py-16'}>
        <TabList>
        <Tab>Salad</Tab>
        <Tab>Pizza</Tab>
        <Tab>Soup</Tab>
        <Tab>Dessert</Tab>
        <Tab>Drinks</Tab>
        </TabList>

        <TabPanel>
            <FoodCategory selectedCategory={'salad'}/>
        </TabPanel>
        <TabPanel>
            <FoodCategory selectedCategory={'pizza'}/>
        </TabPanel>
        <TabPanel>
            <FoodCategory selectedCategory={'soup'}/>
        </TabPanel>
        <TabPanel>
            <FoodCategory selectedCategory={'dessert'}/>
        </TabPanel>
        <TabPanel>
            <FoodCategory selectedCategory={'drinks'}/>
        </TabPanel>
    </Tabs>
    {/* Ends */}
    <Footer/>
    </>
  )
}

export default Order