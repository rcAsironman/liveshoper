import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "./SliderComp.css";
import SliderSettings from "../../utils/SliderSettings/SliderSettings"
import Data from "../../utils/Data";
import { Link } from "react-router-dom";




function SliderComp({ route, Component }) {
  console.log(route);
  const swiperRef = useRef(null);

  return (
    <div className="slider-container">
      <Swiper loop={true} {...SliderSettings} ref={swiperRef} spaceBetween={10}>
        <div>
          <SliderButtons />
        </div>
        {Data.slice(0, 8).map((item) => (
          <SwiperSlide key={item.id}>
            <Link onClick={window.scrollTo(0,-20)} to={`${route}/${item.id}`}>
              <div
                
                className="slider-card-container"
              >
                <Component />
              </div>
            </Link>
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