import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import img1 from '../../../assets/home/01.jpg'
import img2 from '../../../assets/home/02.jpg'
import img3 from '../../../assets/home/03.png'
import img4 from '../../../assets/home/04.jpg'
import img5 from '../../../assets/home/05.png'
import img6 from '../../../assets/home/06.png'

const imageData = [
    { src: img1, legend: " Welcome ! " },
    { src: img2, legend: " Welcome ! " },
    { src: img3, legend: " Welcome ! " },
    { src: img4, legend: " Welcome ! " },
    { src: img5, legend: " Welcome ! " },
    { src: img6, legend: " Welcome ! " },
  ];

const Banner = () => {
  return (
    <>
        <Carousel >
            {imageData.map((item, index) => (
                <div key={index}>
                <img src={item.src} alt={`Image ${index + 1}`} className='max-h-screen'/>
                {/* <p className="legend">{item.legend}</p> */}
                </div>
            ))}
        </Carousel>
    </>
  )
}

export default Banner