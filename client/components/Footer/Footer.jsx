import Image from 'next/image';
import React from 'react';
import { GoogleTranslate} from '@/components/language';
// import { getPrefLangCookie } from '@/components/language';

// const getPrefLangCookie = () => {
// 	return cookies().get("googtrans")?.value ?? "en";
// };

const getPrefLangCookie = () => {
  try {
    const cookies = document.cookie.split('; ');
    const googtransCookie = cookies.find(cookie => cookie.startsWith('googtrans='));
    const value = googtransCookie ? googtransCookie.split('=')[1] : 'en';
    return value;
  } catch (error) {
    console.error('Error retrieving preferred language:', error);
    return 'en'; // Default language
  }
};


const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="mb-6 md:mb-0">
          <Image src="/vaahan_bazar_logo.png" width={150} height={150} alt="VahanBazar.com" />
          <p className="text-gray-600 mt-2">Vaahan Bazar 2024 • All rights reserved</p>
        
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-16">
          <div className="flex flex-col space-y-3">
            <h2 className="font-bold">Vaahan Bazar</h2>
            <a href="/UsedCars" className="hover:underline">Buy</a>
            <a href="/reviews" className="hover:underline">Reviews</a>
            <GoogleTranslate prefLangCookie={getPrefLangCookie()}/>
          </div>
          <div className="flex flex-col space-y-2">
            <h2 className="font-bold">Services</h2>
            <a href="/UsedCars" className="hover:underline">User Cars</a>
            <a href="/Sell" className="hover:underline">Sell Car</a>
            
          </div>
        
        </div>
      </div>
      <div className="container mx-auto mt-8 flex flex-col md:flex-row justify-between items-center px-4">
        <p className="text-gray-600 mb-4 md:mb-0">We accept online card payments as well as UPI transfers.</p>
        <div className="flex space-x-4">
          <Image src="/visa.png" width={40} height={24} alt="Visa" />
          <Image src="/masterCard.png" width={40} height={24} alt="Mastercard" />
          <Image src="/upay.png" width={40} height={24} alt="Rupay" />
          <Image src="/UPI.webp" width={40} height={24} alt="UPI"  className='object-contain'/>
         
        </div>
      </div>
    </footer>
  );
};

export default Footer;
