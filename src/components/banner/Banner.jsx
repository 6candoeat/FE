import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "../../styles/banner.scss";

// Swiper 모듈 추가
import { Autoplay, Pagination } from "swiper/modules";

const Banner = () => {
  const banners = [
    require("../../assets/banner.png"),
    require("../../assets/banner2.png"),
    require("../../assets/banner3.png"),
  ];

  return (
    <div className="banner-slider">
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 3000, // 3초 간격
          disableOnInteraction: false, // 사용자 상호작용 후에도 자동 재생
        }}
        pagination={{ clickable: true }}
        loop={true} // 무한 슬라이드
        className="swiper-container"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <img src={banner} alt={`Banner ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;