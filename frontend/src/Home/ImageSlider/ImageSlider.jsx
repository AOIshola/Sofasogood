import React, { useState } from 'react'
import './imageSlider.css'


function ImageSlider({slides}) {

    const [currentIndex, setCurrentIndex] = useState(0);

    const slideStyles = {
    
        backgroundImage: `url(${slides[currentIndex].url})`,
    }

   const goToPrevious =()=>{
        const isFirstSlide = currentIndex === 0
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
   }

   const goToNext =()=> {
        const isLastSlide = currentIndex === slides.length - 1
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex)
   }


  return (
    <>
    <div className='slider'>
        <div className='leftArrow' onClick={goToPrevious}>{'<'}</div>
        <div className='rightArrow' onClick={goToNext}>{'>'}</div>
        <div className='slide' style={ slideStyles } > </div>
    </div>
    </>
  )
}

export default ImageSlider