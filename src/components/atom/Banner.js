'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import HomeC2 from './HomeC2';
import HomeC3 from './HomeC3';

const Banner = () => {
  SwiperCore.use([Autoplay])

  return (
    <div className='dark:bg-slate-900 md:pb-15 pb-30'>
      <Swiper
        slidesPerView={1}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="h-full w-full rounded-lg overflow-hidden"
      >
        <SwiperSlide ><HomeC2 /></SwiperSlide>
        <SwiperSlide ><HomeC3 /></SwiperSlide>
      </Swiper>
    </div>

  )
};

export default Banner;