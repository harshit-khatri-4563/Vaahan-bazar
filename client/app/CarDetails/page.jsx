'use client'
import React, { useEffect, useState } from 'react';
import CustomSlider from '../../components/CustomSlider';
import { FaRupeeSign, FaTachometerAlt, FaGasPump, FaCalendarAlt, FaCogs, FaPalette, FaUser, FaMapMarkerAlt, FaShieldAlt, FaTag, FaHeart } from 'react-icons/fa';

import { getAllVehicle } from '@/apiCall/vehicleApi';
import Card from '@/components/CarCards';
const page = () => {
  const images = [
    "/tata_punch_image.jpeg",
    "/mahindra_scorpio_image.webp",
    "/tata_punch_image.jpeg",
  ];
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const resp = await getAllVehicle();
        setCars(resp.data);
      } catch (error) {
        console.error('Failed to fetch vehicles', error);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col md:flex-row justify-center items-center md:items-center border border-black rounded-lg p-10  ">
        <div className="w-full md:w-1/2 border rounded-lg">
          <CustomSlider images={images} />
        </div>
        <div className="md:ml-6 mt-6 md:mt-0 w-full md:w-1/2 md:h-1/2 flex flex-col justify-center items-center">
       <div className=' w-1/2'>
       <div className='flex justify-end'>
              <FaHeart className="text-gray-400 text-2xl cursor-pointer hover:text-red-500" />
            </div>
          <div className="flex justify-between items-start">
            <div className=' flex flex-col gap-5'>
              <h2 className="text-4xl font-bold">2020 Mahindra Scorpio</h2>
              <p className="text-lg text-gray-600 mt-1">70,000 km | Diesel | Delhi</p>
              <p className="text-5xl font-semibold text-black mt-1">Rs. 12.3 L</p>
            </div>
          
          </div>
          <button className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 ">Get Seller Details</button>
       </div>
         
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-2xl font-semibold">Car Overview</h3>
        <div className="overflow-x-auto mt-4 border border-slate-400 rounded-lg">
      <table className="min-w-full ">
        <tbody>
          <tr className="border border-black">
            <td className="p-5 border">
              <div className="flex flex-col items-start">
                <div className="flex items-center">
                  <FaRupeeSign className="mr-2 text-gray-600" />
                  <span className="font-semibold">Price:</span>
                </div>
                <div>
                  ₹ 5.65 Lakh
                </div>
              </div>
            </td>
            <td className="p-5 border">
              <div className="flex flex-col items-start">
                <div className="flex items-center">
                  <FaTachometerAlt className="mr-2 text-gray-600" />
                  <span className="font-semibold">Kilometer:</span>
                </div>
                <div>
                  49,000 km
                </div>
              </div>
            </td>
            <td className="p-5 border">
              <div className="flex flex-col items-start">
                <div className="flex items-center">
                  <FaGasPump className="mr-2 text-gray-600" />
                  <span className="font-semibold">Fuel type:</span>
                </div>
                <div>
                  Petrol
                </div>
              </div>
            </td>
          </tr>
          <tr className="border border-black">
            <td className="p-5 border">
              <div className="flex flex-col items-start">
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2 text-gray-600" />
                  <span className="font-semibold">Registration year:</span>
                </div>
                <div>
                  Jun 2024
                </div>
              </div>
            </td>
            <td className="p-5 border">
              <div className="flex flex-col items-start">
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2 text-gray-600" />
                  <span className="font-semibold">Manufacturing year:</span>
                </div>
                <div>
                  Oct 2018
                </div>
              </div>
            </td>
            <td className="p-5 border">
              <div className="flex flex-col items-start">
                <div className="flex items-center">
                  <FaUser className="mr-2 text-gray-600" />
                  <span className="font-semibold">No. of owners:</span>
                </div>
                <div>
                  First
                </div>
              </div>
            </td>
          </tr>
          <tr className="border border-black">
            <td className="p-5 border">
              <div className="flex flex-col items-start">
                <div className="flex items-center">
                  <FaCogs className="mr-2 text-gray-600" />
                  <span className="font-semibold">Transmission:</span>
                </div>
                <div>
                  Manual - 5 Gears
                </div>
              </div>
            </td>
            <td className="p-5 border">
              <div className="flex flex-col items-start">
                <div className="flex items-center">
                  <FaPalette className="mr-2 text-gray-600" />
                  <span className="font-semibold">Color:</span>
                </div>
                <div>
                  Blue
                </div>
              </div>
            </td>
            <td className="p-5 border">
              <div className="flex flex-col items-start">
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-gray-600" />
                  <span className="font-semibold">Car Available at:</span>
                </div>
                <div>
                  Janakpuri, Delhi
                </div>
              </div>
            </td>
          </tr>
          <tr className="border border-black">
            <td className="p-5 border">
              <div className="flex flex-col items-start">
                <div className="flex items-center">
                  <FaShieldAlt className="mr-2 text-gray-600" />
                  <span className="font-semibold">Insurance:</span>
                </div>
                <div>
                  Comprehensive
                </div>
              </div>
            </td>
            <td className="p-5 border">
              <div className="flex flex-col items-start">
                <div className="flex items-center">
                  <FaTag className="mr-2 text-gray-600" />
                  <span className="font-semibold">Registration type:</span>
                </div>
                <div>
                  Individual
                </div>
              </div>
            </td>
            <td className="p-5 border">
              <div className="flex flex-col items-start">
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2 text-gray-600" />
                  <span className="font-semibold">Last Updated:</span>
                </div>
                <div>
                  6 day(s) ago
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
      </div>
      <div className='mt-6'>
      <h3 className="text-2xl font-semibold">Similar Cars</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
        {cars.map((car, index) => (
          <Card key={index} car={car} />
        ))}
      </div>
      </div>
    </div>
  );
};

export default page;
