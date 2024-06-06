import React, { useRef } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "./SliderComp.css";
import SliderSettings from "../../utils/SliderSettings/SliderSettings"
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

function SliderComp({ Component, productData }) {

  const swiperRef = useRef(null);
  const navigate = useNavigate(); // Use useNavigate hook for programmatic navigation

  const handleClick = (item) => {
    // Programmatic navigation to EachProductPage with data
    // navigate("/products", { state: { data: item } });
  };

  return (
    <div className="slider-container">
      <Swiper loop={true} {...SliderSettings} ref={swiperRef} spaceBetween={10}>
        <div>
          <SliderButtons />
        </div>
        {productData.map((data, index) => (
          
          <SwiperSlide key={index}>
            <div className="slider-card-container" onClick={() => handleClick(data)}>
              <Component data={data} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SliderComp;

const SliderButtons = () => {
  const swiper = useSwiper();
  return (
    <div className="swiper-btns">
      <button className="swiper-button-prev" onClick={() => swiper.slidePrev()}>
        <img src="arrow-right.svg" alt="" />
      </button>
      <button className="swiper-button-next" onClick={() => swiper.slideNext()}>
        <img src="arrow-right.svg" alt="" />
      </button>
    </div>
  );
};
