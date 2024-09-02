'use client'
import Image from 'next/image';
import React from 'react';
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CustomSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center justify-center">
        <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} className="w-full rounded-lg" />
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 left-4 cursor-pointer  border border-black rounded-full p-2 " onClick={handlePrev}>
        <FaChevronLeft className="text-gray-600 text-2xl" />
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 right-4 cursor-pointer border border-black rounded-full p-2" onClick={handleNext}>
        <FaChevronRight className="text-gray-600 text-2xl" />
      </div>
    </div>
  );
};

export default CustomSlider;
