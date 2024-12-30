import React from 'react'
import SectionTitle from '../../../components/SectionTitle'
import featuredImage from '../../../assets/home/featured.jpg'

const Featured = () => {
    
  return (
    <section className='featured-item'>
        <SectionTitle subHeading={' check it out '} heading={'Featured Item'} />
        <div className='md:flex justify-center items-center gap-8 py-20 px-36'>
            <div><img src={featuredImage} alt="" className='p-5 rounded-3xl'/></div>
            <div className='space-y-2'>
                <p>Aug 20,2025</p>
                <p className='uppercase'> Where can i get some ? </p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, accusantium! Non explicabo similique fuga. Quis dignissimos exercitationem, praesentium laudantium reprehenderit, suscipit consequuntur saepe, sed quae maxime nulla odio quas architecto.</p>
                <button className="btn btn-outline"> Order Now </button>
            </div>
        </div>
    </section>
  )
}

export default Featured