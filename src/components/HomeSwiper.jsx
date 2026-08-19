import React from "react";
import { Box, IconButton } from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import banner1 from "../assets/slider-of-ecommerce-01.webp";
import banner2 from "../assets/eCommerce-Website-02.webp";
import banner3 from "../assets/eCommerce-Website-Components-photo-1024x536.webp";
import banner4 from "../assets/unleashing-03.webp";

const banners = [banner1, banner2, banner3, banner4];

export default function HomeSwiper() {
  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
      }}
    >
      {/* Swiper */}
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          prevEl: ".home-swiper-prev",
          nextEl: ".home-swiper-next",
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        spaceBetween={0}
        slidesPerView={1}
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <Box
              component="img"
              src={banner}
              alt={`Banner ${index + 1}`}
              sx={{
                display: "block",
                width: "100%",
                // Horizontal banner height
                height: {
                  xs: 250,
                  sm: 300,
                  md: 370,
                  lg: 470,
                },

                objectFit: "cover",

                borderRadius: 3,
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Previous button */}
      <IconButton
        className="home-swiper-prev"
        sx={{
          position: "absolute",
          left: 15,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,

          width: 45,
          height: 45,

          backgroundColor: "#fff",

          boxShadow: "0 3px 10px rgba(0,0,0,0.2)",

          "&:hover": {
            backgroundColor: "#fff",
          },
        }}
      >
        <ArrowBackIosNewIcon fontSize="small" />
      </IconButton>

      {/* Next button */}
      <IconButton
        className="home-swiper-next"
        sx={{
          position: "absolute",
          right: 15,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,

          width: 45,
          height: 45,

          backgroundColor: "#fff",

          boxShadow: "0 3px 10px rgba(0,0,0,0.2)",

          "&:hover": {
            backgroundColor: "#fff",
          },
        }}
      >
        <ArrowForwardIosIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
