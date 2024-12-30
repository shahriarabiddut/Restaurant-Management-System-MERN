import React from 'react';
import { Parallax } from 'react-parallax';

const Cover = ({img,title,tagline,big=false}) => {
    // console.log(img);
  return (
    <>
     <Parallax
        blur={{ min: -15, max: 15 }}
        bgImage={img}
        bgImageAlt="the dog"
        strength={-200}
    >
    
        <div
        className="hero h-[600px]"
        // style={{
        //     backgroundImage: `url("${img}")`,
        // }}
        >
        <div className="hero-overlay bg-opacity-50 bg-black h-64 w-4/6 p-12 "></div>
        <div className="hero-content text-neutral-content text-center uppercase font-cinzel">
            <div className="max-w-md">
            <h1 className={`mb-5 ${big == true ? 'text-7xl' : 'text-5xl'} font-bold`}>{title}</h1>
            <p className="mb-5 text-white">
                {tagline}
            </p>
            </div>
        </div>
        </div>
        </Parallax>
    </>
  )
}

export default Cover 