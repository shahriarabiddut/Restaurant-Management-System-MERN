import React from 'react';
import { Link } from 'react-router-dom';
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
          <Link to={`/order/${selectedCategory}`}>
            <button className='btn btn-outline border-0 border-b-4 mt-4 mx-auto'> ORDER YOUR FAVOURITE FOOD </button>
          </Link>
        </div>
    </section>
  )
}

export default MenuCategory