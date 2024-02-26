import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "./Carousel.scss";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules

export default function Carousel({ imgUrls }) {
  return (
    <>
      <Swiper
        navigation={true}
        pagination={{
          type: "fraction",
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {imgUrls.map((imgUrl, index) => (
          <SwiperSlide key={imgUrl + index}>
            <img src={imgUrl} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
