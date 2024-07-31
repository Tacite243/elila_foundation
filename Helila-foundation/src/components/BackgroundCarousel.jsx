import React from 'react';
import Slider from 'react-slick';
import image1 from '../assets/WhatsApp Image 2024-07-16 à 09.08.21_707fda3f.jpg';
import image2 from '../assets/WhatsApp Image 2024-07-16 à 09.21.55_ebeabfc1.jpg';
import image3 from '../assets/WhatsApp Image 2024-07-16 à 09.27.23_6c3e9232.jpg'

const images = [
  image1,
  image2,
  image3
];

export default function BackgroundCarousel () {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    pauseOnHover: false,
  };

  return (
    <Slider {...settings} classNameName="background-carousel">
      {images.map((image, index) => (
        <div key={index}>
          <div
            classNameName="background-slide"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        </div>
      ))}
    </Slider>
  );
};