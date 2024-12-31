import React, { useEffect, useState } from 'react'
import SectionTitle from '../../../components/SectionTitle'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import axios from 'axios';

const Testimonials = () => {
    const [reviews,setReviews] = useState([]);
    useEffect(()=>{
            axios.get(`${import.meta.env.VITE_URL}/reviews`)
            .then((res)=>{
                setReviews(res.data);
            })
        },[]);
  return (
    <section className='my-20'>
        <SectionTitle subHeading={' What Our Client Says '} heading={'Testimonials'} />
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
            {
                reviews.map(review=>
                    <SwiperSlide key={review._id}>
                        <div className='m-24 flex flex-col items-center gap-4'>
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />
                            <p className=''>{review.details}</p>
                            <h3 className="text-2xl text-orange-400">{review.name}</h3>
                            
                        </div>
                    </SwiperSlide>)
            }
        </Swiper>
    </section>
  )
}

export default Testimonials