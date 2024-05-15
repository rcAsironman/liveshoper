import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "../Slider/SliderComp.css";
import SliderSettings from "../../utils/SliderSettings/SliderSettings"
import Data from "../../utils/Data";
import { Link } from "react-router-dom";
import axios from "axios";





function SliderComponentForShoper({ route, Component }) {
  
  const swiperRef = useRef(null);
  const [shopperData, setShopperData] = useState([])
  useEffect(()=>{
    axios.get(`http://65.2.73.20:8080/liveshoper/api/v1/employee/get-all-employees?page=0&size=15`)
    .then((response)=>{
      setShopperData(response.data.data['content'])
    })
    .catch((error)=>{
      console.log(error)
    })
  },[])
  return (
    <div className="slider-container">
      <Swiper loop={true} {...SliderSettings} ref={swiperRef} spaceBetween={10}>
        <div>
          <SliderButtons />
        </div>
        {shopperData.slice(0,8).map((item, index) => (
          <SwiperSlide key={index} >
            {console.log(item)}
            <Link  to={`${route}/${item.id}`}>
              <div
                
                className="slider-card-container"
              >
                <Component name={item['name']} location={item['address']}/>
              </div>
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
        <img src="arrow-right.svg" alt="" />
      </button>
      <button className="swiper-button-next" onClick={() => swiper.slideNext()}>
        <img src="arrow-right.svg" alt="" />
      </button>
    </div>
  );
};
