import React, { useEffect, useState } from "react";
import useMenu from "../../../hooks/useMenu";
import FoodCard from "../../../Shared/FoodCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "swiper/css";

const FoodCategory = ({ selectedCategory }) => {
  const [menu] = useMenu();
  const [loader,setLoader] = useState(true);
  const categorizedMenu = menu.filter((item) => item.category === selectedCategory);

  const slides = [];
  for (let i = 0; i < categorizedMenu.length; i += 6) {
    slides.push(categorizedMenu.slice(i, i + 6));
  }

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    document.querySelector(".swiper").swiper.slideTo(newPage - 1);
  };
  useEffect(()=>{
    setTimeout(()=> setLoader(false) , 2000);
  },[])

  return (
    <section className="my-10">
      { loader == true ? <div className="flex justify-center items-center"><span className="loading loading-ring loading-lg"></span></div> : 
      <>
      <Swiper
        onSlideChange={(swiper) => setCurrentPage(swiper.activeIndex + 1)}
        modules={[Pagination]}
        pagination={false}
        spaceBetween={20}
      >
        {slides.map((group, index) => (
          <SwiperSlide key={index}>
            <div className="py-10 grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4">
              {group.map((item) => (
                <FoodCard key={item._id} item={item} />
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex items-center justify-start mt-5 space-x-4">
        <button
          className={`p-2 rounded-full ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FaArrowLeft />
        </button>

        <span className="text-lg font-medium">
          {currentPage} / {slides.length}
        </span>

        <button
          className={`p-2 rounded-full ${
            currentPage === slides.length
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600 text-white"
          }`}
          onClick={() => currentPage < slides.length && handlePageChange(currentPage + 1)}
          disabled={currentPage === slides.length}
        >
          <FaArrowRight />
        </button>

        <div className="flex items-center space-x-1">
          {Array.from({ length: slides.length }, (_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full ${
                index + 1 === currentPage
                  ? "bg-orange-500"
                  : "bg-green-500 hover:opacity-80 cursor-pointer"
              }`}
              onClick={() => handlePageChange(index + 1)}
            ></span>
          ))}
        </div>
      </div>
      </>
      }
    </section>
  );
};

export default FoodCategory;
