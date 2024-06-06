import React from "react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "./Hero.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import img1 from "../../background-image/hero-01.png"
import img2 from "../../background-image/hero-1.png"
import img3 from "../../background-image/hero-img-3.png"




const Hero = ({handleClick}) => {
  const slides = [
    { image: img1, alt: "Personal Shopper" },
    { image: img2, alt: "Personal Shopper" },
    { image: img3, alt: "Personal Shopper" },
  ];

  const handleExploreClick = () => {
    handleClick()
  }

  return (
    <div className="bg">
      <div className="hero-wrapper">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: true,
          }}
          
          loop={true}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="hero-container">
                <div className="hero-left">
                  <h2 className="title">Live Shoper</h2>
                  <p className="para">Personal Shopper For Everyone</p>
                  <p className="para">Everything you need comes to your hand</p>
                  <button className="btn" onClick={handleExploreClick}>Explore</button>
                </div>
                <div className="hero-right">
                  <div className="img-container">
                    <img
                      className="shopper-image"
                      src={slide.image}
                      alt={slide.alt}
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Hero;
