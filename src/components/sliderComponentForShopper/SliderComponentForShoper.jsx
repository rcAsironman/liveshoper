import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "./SliderComponentForShoper.css"; // Make sure to create this file
import SliderSettings from "../../utils/SliderSettings/SliderSettings";
import { Link } from "react-router-dom";

function SliderComponentForShoper({ route, Component, data }) {
  const swiperRef = useRef(null);
  const [shopperData, setShopperData] = useState(data.length > 0?  data : []);
  
  // Use useEffect to update shopperData when data prop changes
  useEffect(() => {
    setShopperData(data.length > 0 ? data : []);
  }, [data]);

 
  
  return (
    <div className="shoper-slider-container">
      <Swiper loop={true} {...SliderSettings} ref={swiperRef} spaceBetween={10}>
        <SliderButtons />
        {shopperData.slice(0, 8).map((item, index) => (
          <SwiperSlide key={index} className="shoper-slide">
            <Link to={`${route}/${index}`}  
              state={{
                data: item
              }}
            className="shoper-link">
              <Component key={index} id={index} name={item['name']} location={item['address']} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SliderComponentForShoper;

const SliderButtons = () => {
  const swiper = useSwiper();
  return (
    <div className="swiper-btns">
      <button className="swiper-button-prev" onClick={() => swiper.slidePrev()}>
        <img src="arrow-right.svg" alt="Previous" />
      </button>
      <button className="swiper-button-next" onClick={() => swiper.slideNext()}>
        <img src="arrow-right.svg" alt="Next" />
      </button>
    </div>
  );
};
