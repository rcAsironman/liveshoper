import React from "react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "./Hero.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";

const Hero = () => {
  const slides = [
    { image: "https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", alt: "Personal Shopper" },
    { image: "https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", alt: "Personal Shopper" },
    { image: "modern.png", alt: "Personal Shopper" },
  ];

  return (
    <div className="bg">
      <div className="wrapper">
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
                  <button className="btn">Explore</button>
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
