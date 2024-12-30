import React from 'react';
import { Parallax } from 'react-parallax';

const Cover = ({img,title,tagline}) => {
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
        className="hero h-[700px]"
        // style={{
        //     backgroundImage: `url("${img}")`,
        // }}
        >
        <div className="hero-overlay bg-opacity-60 bg-black "></div>
        <div className="hero-content text-neutral-content text-center uppercase font-cinzel">
            <div className="max-w-md">
            <h1 className="mb-5 text-6xl font-bold ">{title}</h1>
            <p className="mb-5">
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