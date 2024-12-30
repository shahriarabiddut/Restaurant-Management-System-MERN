import React, { useEffect, useState } from 'react'
import SectionTitle from '../../../components/SectionTitle'
import MenuItem from '../../../Shared/MenuItem';

const PopularMenu = () => {
    const [menu,setMenu] = useState([]);
    useEffect(()=>{
        fetch('/menu.json')
        .then(res=>res.json())
        .then((data)=>{
            const popularItems = data.filter(item=>item.category === 'popular');
            setMenu(popularItems);
        })
    },[]);
  return (
    <section>
        <SectionTitle subHeading={' Popular Items '} heading={'From Our Menu'} />
        <div className="py-10 grid md:grid-cols-2 grid-cols-1 gap-4">
            {
                menu.map(item=><MenuItem key={item._id} item={item} />)
            }
        </div>
        <div className="flex justify-center pb-5">
        <button className='btn btn-outline border-0 border-b-4 mt-4 mx-auto'> View Full Menu</button>
        </div>
    </section>
  )
}

export default PopularMenu