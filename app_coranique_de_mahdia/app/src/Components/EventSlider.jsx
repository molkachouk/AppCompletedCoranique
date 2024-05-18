import React from 'react'
import { useSwiper } from 'swiper/react';
import '../Styles/Events.css'

import { BsArrowRightShort } from "react-icons/bs";
import { BsArrowLeftShort } from "react-icons/bs";



export default function EventSlider() {
    const swiper = useSwiper();

  return (

    <div className="swiper-nav-btns">
    <button onClick={() => swiper.slidePrev()}><BsArrowRightShort className='icon1'/></button>
    <button onClick={() => swiper.slideNext()}><BsArrowLeftShort className='icon1' /></button>
  </div>
  )
}
