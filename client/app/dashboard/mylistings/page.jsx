'use client';
import { getVehicleById, deleteVehicleById } from '@/apiCall/vehicleApi'; // Add your delete API call here
import React, { useState, useEffect } from 'react';
import ConfirmationModal from '@/components/Confirmation';

export default function Page() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const vehicleIds = currentUser?.carsForSale || [];
        
        const fetchedListings = await Promise.all(
          vehicleIds.map(async (vehicleId) => {
            try {
              const response = await getVehicleById(vehicleId);
              if (response.status === 'success') {
                const vehicleData = response.data;
                return {
                  id: vehicleData._id,
                  image: vehicleData.photos && vehicleData.photos.length > 0 ? vehicleData.photos[0] : '',
                  distance: `${vehicleData.mileage} Km`,
                  fuelType: vehicleData.fuelType,
                  location: vehicleData.location,
                  price: `Rs. ${vehicleData.price} LPA`,
                };
              } else {
                throw new Error('Failed to fetch vehicle');
              }
            } catch (error) {
              console.error('Error fetching vehicle:', error);
              return null; // Handle gracefully or skip problematic listings
            }
          })
        );

        setListings(fetchedListings.filter(listing => listing !== null));
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const handleDeleteClick = (vehicleId) => {
    setVehicleToDelete(vehicleId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!vehicleToDelete) return;

    try {
      // Call your delete API
      const response = await deleteVehicleById(vehicleToDelete);
      if (response.status === 'success') {
        setListings(listings.filter(listing => listing.id !== vehicleToDelete));
        setVehicleToDelete(null);
        setIsModalOpen(false);
      } else {
        throw new Error('Failed to delete vehicle');
      }
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  const handleCancelDelete = () => {
    setVehicleToDelete(null);
    setIsModalOpen(false);
  };

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">My listings</h2>
      {listings.length === 0 ? (
        <p>No listings found.</p>
      ) : (
        listings.map((listing) => (
          <div key={listing.id} className="flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden mb-4">
            <div className="md:flex-shrink-0">
              <img className="h-48 w-full object-contain md:w-48" src={listing.image} alt="Car" />
            </div>
            <div className="p-4 flex flex-col justify-between flex-grow">
              <div>
                <div className="flex items-center text-sm text-gray-500">
                  <span>{listing.distance}</span>
                  <span className="mx-2">|</span>
                  <span>{listing.fuelType}</span>
                  <span className="mx-2">|</span>
                  <span>{listing.location}</span>
                </div>
                <h3 className="text-lg font-bold mt-2">{listing.price}</h3>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-3 p-10">
              <button className="bg-blue-500 text-white px-14 py-2 rounded hover:bg-blue-700">Update</button>
              <button className="bg-red-500 text-white px-14 py-2 rounded hover:bg-red-700" onClick={() => handleDeleteClick(listing.id)}>Remove</button>
            </div>
          </div>
        ))
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
