import React from 'react';
import useMenu from '../../../hooks/useMenu';
import FoodCard from '../../../Shared/FoodCard';

const FoodCategory = ({selectedCategory}) => {
    const [menu] = useMenu();
    const categorizedMenu = menu.filter(item=>item.category === selectedCategory);
  return (
    <section className='my-10'>
        <div className="py-10 grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4">
            {
                categorizedMenu.map(item=><FoodCard key={item._id} item={item} />)
            }
        </div>
    </section>
  )
}

export default FoodCategory