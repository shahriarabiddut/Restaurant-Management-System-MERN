import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { useParams } from 'react-router-dom';
import orderCover from '../../assets/shop/order.jpg';
import Cover from '../../Shared/Cover';
import FoodCategory from './components/FoodCategory';
import './Order.css';

const categories = ['salad','pizza','soup','dessert','drinks']

const Order = () => {
    const {category} = useParams();
    // console.log(category);
    const index = categories.indexOf(category);
    // console.log (index);
    const [tabIndex, setTabIndex] = useState(index!=-1?index:0);
  return (
    <>
    <Helmet>
        <title>Order | {import.meta.env.VITE_NAME}</title>
    </Helmet>
    <Cover img={orderCover} title={'Our Shop'} tagline={'Would you like to try a dish? Order Food'} big={true}/>
    {/* Tabs */}
    <Tabs className={'py-16'} selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <div className="flex justify-center font-cinzel" >
            <TabList>
            <Tab>Salad</Tab>
            <Tab>Pizza</Tab>
            <Tab>Soup</Tab>
            <Tab>Dessert</Tab>
            <Tab>Drinks</Tab>
            </TabList>
        </div>
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
    </>
  )
}

export default Order