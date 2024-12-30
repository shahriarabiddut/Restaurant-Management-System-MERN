import React, { useEffect, useState } from 'react';
import MenuItem from '../../../Shared/MenuItem';
import useMenu from '../../../hooks/useMenu';

const MenuCategory = ({selectedCategory}) => {
    const [menu] = useMenu();
    const categorizedMenu = menu.filter(item=>item.category === selectedCategory);
  return (
    <section className='my-10'>
        <div className="py-10 grid md:grid-cols-2 grid-cols-1 gap-4">
            {
                categorizedMenu.map(item=><MenuItem key={item._id} item={item} />)
            }
        </div>
        <div className="flex justify-center pb-5">
        <button className='btn btn-outline border-0 border-b-4 mt-4 mx-auto'> ORDER YOUR FAVOURITE FOOD </button>
        </div>
    </section>
  )
}

export default MenuCategory