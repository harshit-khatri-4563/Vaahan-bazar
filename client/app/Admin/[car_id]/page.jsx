'use client'
import React, { useState, useEffect } from "react";
import CustomSlider from "@/components/CustomSlider";
import { getVehicleById, deleteVehicleById } from "@/apiCall/vehicleApi";
import { getUser } from "@/apiCall/userApi";
import { FaMapMarker, FaMapMarkerAlt, FaCalendarAlt, FaPhoneAlt, FaEnvelope, FaTag, FaUser } from "react-icons/fa";
import { useUser } from "@clerk/nextjs";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { sendemail } from "@/utils/sendemail";

const AdminPage = ({ params }) => {
  const car_id = params.car_id;
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sellerDetails, setSellerDetails] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deletionReason, setDeletionReason] = useState("Does not match our platform norms.");
  const { user } = useUser();

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await getVehicleById(car_id);
        if (response.status === "success") {
          setVehicle(response.data);
          // Fetch seller details once vehicle data is fetched
          await fetchSellerDetails(response.data.seller);
        }
      } catch (error) {
        console.error("Error fetching vehicle:", error);
      } finally {
        setLoading(false);
      }
    };

    if (car_id) {
      fetchVehicle();
    }
  }, [car_id]);

  // Function to fetch seller details
  const fetchSellerDetails = async (sellerId) => {
    try {
      const response = await getUser(sellerId);
      if (response.status === "success") {
        setSellerDetails(response.data);
      }
    } catch (error) {
      console.error("Error fetching seller details:", error);
    }
  };

  // Function to handle deletion of the vehicle
  const handleDeleteVehicle = async () => {
    try {
      // Perform deletion logic
      await deleteVehicleById(car_id);

      // Send deletion confirmation email with reason
      sendemail(sellerDetails.email, `${sellerDetails.firstName} ${sellerDetails.lastName}`, `Your vehicle listing (${vehicle.make} ${vehicle.model} ${vehicle.year}) has been deleted from our platform. Reason: ${deletionReason}`);

      // Handle success or navigate to another page
      console.log("Vehicle deleted successfully!");
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    } finally {
      setShowConfirmation(false);
    }
  };

  if (loading) {
    return <div className="mt-8 text-center">Loading...</div>;
  }

  if (!vehicle) {
    return <div className="mt-8 text-center">Vehicle not found</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col items-center justify-center p-10 border border-black rounded-lg md:flex-row md:items-center">
        <div className="w-full border rounded-lg md:w-1/2">
          <CustomSlider images={vehicle.photos} />
        </div>
        <div className="flex flex-col items-center justify-center w-full mt-6 md:ml-6 md:mt-0 md:w-1/2 md:h-1/2">
          <div className="w-full">
            <div className="flex justify-end gap-4">
              <FaEdit
                className="text-2xl text-gray-400 cursor-pointer hover:text-blue-500"
                onClick={() => console.log("Edit vehicle:", vehicle)}
              />
              <FaTrashAlt
                className="text-2xl text-gray-400 cursor-pointer hover:text-red-500"
                onClick={() => setShowConfirmation(true)}
              />
            </div>
            <div className="flex flex-col gap-3 mt-3">
              <h2 className="text-4xl font-bold">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h2>
              <p className="text-lg text-gray-600">
                {vehicle.mileage} KM | {vehicle.fuelType} | {vehicle.location}
              </p>
              <p className="text-5xl font-semibold text-black">
                Rs. {vehicle.price / 100000} Lakh
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-2xl font-semibold">Confirm Deletion</h2>
            <p className="text-lg">
              Are you sure you want to delete this vehicle? Please provide a reason:
            </p>
            <textarea
              className="w-full h-24 mt-2 p-2 border rounded-md resize-none"
              placeholder="Enter reason for deletion..."
              value={deletionReason}
              onChange={(e) => setDeletionReason(e.target.value)}
            />
            <div className="flex justify-end mt-4">
              <button
                className="px-6 py-2 mr-4 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700"
                onClick={() => handleDeleteVehicle()}
              >
                Delete
              </button>
              <button
                className="px-6 py-2 font-semibold text-gray-600 bg-gray-300 rounded-md hover:bg-gray-400"
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Seller Details Section */}
      {sellerDetails && (
        <div className="mt-6">
          <h3 className="mb-2 text-2xl font-semibold">Seller Details</h3>
          <div className="mt-4 overflow-x-auto border rounded-lg border-slate-400">
            <table className="min-w-full">
              <tbody>
                <tr className="border border-black">
                  <td className="p-5 border">
                    <div className="flex flex-col items-start">
                      <div className="flex items-center">
                        <FaUser className="mr-2 text-gray-600" />
                        <span className="font-semibold">Name:</span>
                      </div>
                      <div>
                        {sellerDetails.firstName} {sellerDetails.lastName}
                      </div>
                    </div>
                  </td>
                  <td className="p-5 border">
                    <div className="flex flex-col items-start">
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="mr-2 text-gray-600" />
                        <span className="font-semibold">Location:</span>
                      </div>
                      <div>
                        {sellerDetails.address.city}, {sellerDetails.address.state}
                      </div>
                    </div>
                  </td>
                  <td className="p-5 border">
                    <div className="flex flex-col items-start">
                      <div className="flex items-center">
                        <FaCalendarAlt className="mr-2 text-gray-600" />
                        <span className="font-semibold">Member Since:</span>
                      </div>
                      <div>
                        {new Date(sellerDetails.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="border border-black">
                  <td className="p-5 border">
                    <div className="flex flex-col items-start">
                      <div className="flex items-center">
                        <FaPhoneAlt className="mr-2 text-gray-600" />
                        <span className="font-semibold">Phone:</span>
                      </div>
                      <div>{sellerDetails.phoneNo}</div>
                    </div>
                  </td>
                  <td className="p-5 border">
                    <div className="flex flex-col items-start">
                      <div className="flex items-center">
                        <FaEnvelope className="mr-2 text-gray-600" />
                        <span className="font-semibold">Email:</span>
                      </div>
                      <div>{sellerDetails.email}</div>
                    </div>
                  </td>
                  <td className="p-5 border">
                    <div className="flex flex-col items-start">
                      <div className="flex items-center">
                        <FaTag className="mr-2 text-gray-600" />
                        <span className="font-semibold">Seller Type:</span>
                      </div>
                      <div>{sellerDetails.organization}</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
