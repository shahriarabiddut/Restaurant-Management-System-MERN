import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination } from 'swiper/modules';

// Images for slider
import img1 from '../../../assets/home/slide1.jpg'
import img2 from '../../../assets/home/slide2.jpg'
import img3 from '../../../assets/home/slide3.jpg'
import img4 from '../../../assets/home/slide4.jpg'
import img5 from '../../../assets/home/slide5.jpg'
import SectionTitle from '../../../components/SectionTitle';
const imageData = [
    { src: img1, alt: " Salad " },
    { src: img2, alt: " pizza " },
    { src: img3, alt: " soups " },
    { src: img4, alt: " desert " },
    { src: img5, alt: " salad " },
  ];

const Category = () => {
  return (
    <section>
        <SectionTitle subHeading={'From 11AM to 10PM'} heading={'Order Online'} />
        <Swiper
            slidesPerView={4}
            spaceBetween={30}
            pagination={{
            clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper my-10"
        >
            {imageData.map((item, index) => (
                <SwiperSlide key={index} className='mb-16'>
                    <img src={item.src} alt={`Image ${index + 1} : ${item.alt} `}/>
                    <h3 className="text-3xl uppercase text-center -mt-16 text-white">{item.alt}</h3>
                </SwiperSlide>
                
            ))}
        </Swiper>
        
    </section>
  )
}

export default Category