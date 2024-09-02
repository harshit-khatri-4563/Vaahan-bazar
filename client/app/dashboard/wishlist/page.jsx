'use client';
import { getVehicleById } from '@/apiCall/vehicleApi';
import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve wishlist from localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const wishlistIds = currentUser?.wishlist || [];

    // Fetch vehicles based on wishlistIds
    const fetchVehicles = async () => {
      try {
        const vehiclesData = await Promise.all(
          wishlistIds.map(async (id) => {
            const response = await getVehicleById(id);
            if (response.status === 'success') {
              return response.data;
            } else {
              throw new Error('Failed to fetch vehicle');
            }
          })
        );
        setVehicles(vehiclesData);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      } finally {
        setLoading(false);
      }
    };

    if (wishlistIds.length > 0) {
      fetchVehicles();
    } else {
      setLoading(false);
    }
  }, []);

  // Function to handle navigation to vehicle details page
  const handleBuy = (id) => {
    router.push(`/UsedCars/${id}`);
  };

  // Function to handle removing vehicle from wishlist
  const handleRemoveFromWishlist = async (id) => {
    try {
      // Logic to update wishlist in the backend (if needed)
      setVehicles(vehicles.filter(vehicle => vehicle._id !== id));
    } catch (error) {
      console.error('Error removing vehicle from wishlist:', error);
    }
  };

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Wishlist</h2>
      {vehicles.length === 0 ? (
        <p>No vehicles found in your wishlist.</p>
      ) : (
        vehicles.map((vehicle) => (
          <div key={vehicle._id} className="relative flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden mb-4">
            {/* Heart icon */}
            <div className="absolute top-2 right-2">
              <FaHeart
                className="hover:text-gray-400 text-2xl cursor-pointer text-red-500"
                onClick={() => handleRemoveFromWishlist(vehicle._id)}
              />
            </div>

            <div className="md:flex-shrink-0">
              <img className="h-48 w-full object-contain md:w-48" src={vehicle.photos && vehicle.photos.length > 0 ? vehicle.photos[0] : '/placeholder.jpg'} alt="Car" />
            </div>
            <div className="p-4 flex flex-col justify-between flex-grow">
              <div>
                <div className="flex items-center text-sm text-gray-500">
                  <span>{vehicle.location}</span>
                  <span className="mx-2">|</span>
                  <span>{vehicle.fuelType}</span>
                  {/* Add other details as needed */}
                </div>
                <h3 className="text-lg font-bold mt-2">{vehicle.make} {vehicle.model}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Contact no: {vehicle.seller.phoneNo} <br />
                  Email id: {vehicle.seller.email}
                </p>
              </div>
              <div className="pt-5">
                <button className="bg-blue-900 text-white px-14 py-2 rounded hover:bg-blue-950" onClick={() => handleBuy(vehicle._id)}>Buy now</button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
