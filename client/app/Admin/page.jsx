"use client";
import { deleteVehicleById, getAllVehicle } from "@/apiCall/vehicleApi";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaCheck } from "react-icons/fa";

const AdminPanel = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null); // Track selected vehicle for confirmation
  const router = useRouter();

  // Fetch all vehicles from API
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await getAllVehicle();
        if (response.status === "success") {
          const data = response.data;
          setVehicles(data);
        }
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, []);

  // Delete a vehicle by ID with confirmation
  const deleteVehicle = async (id) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      try {
        const response = await deleteVehicleById(id);
        console.log(response.data);
        // Update state after deletion
        setVehicles((prevVehicles) =>
          prevVehicles.filter((vehicle) => vehicle._id !== id)
        );
      } catch (error) {
        console.error("Error deleting vehicle:", error);
      }
    }
  };

  // Verify a vehicle by ID with confirmation (dummy action)
  const verifyVehicle = (id) => {
    if (window.confirm("Are you sure you want to verify this vehicle?")) {
      // Implement verification logic as needed (could be a PUT request to update vehicle status)
      console.log(`Vehicle with ID ${id} verified.`);
    }
  };

  // Navigate to vehicle detail page
  const handleDetailPage = (id) => {
    router.push(`/Admin/${id}`);
  };

  return (
    <div className="w-full h-screen mx-auto p-4 overflow-auto">
      <h2 className="text-2xl font-bold mb-6">Admin Panel - All Vehicles</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded shadow overflow-hidden">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="py-2 px-4 border-r border-gray-200 text-left">Make</th>
              <th className="py-2 px-4 border-r border-gray-200 text-left">Model</th>
              <th className="py-2 px-4 border-r border-gray-200 text-left">Year</th>
              <th className="py-2 px-4 border-r border-gray-200 text-left">Image</th>
              <th className="py-2 px-4 border-r border-gray-200 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-r border-gray-200">
                  {vehicle.make}
                </td>
                <td className="py-2 px-4 border-r border-gray-200">
                  {vehicle.model}
                </td>
                <td className="py-2 px-4 border-r border-gray-200">
                  {vehicle.year}
                </td>
                <td className="py-2 px-4 border-r border-gray-200">
                  <img
                    src={vehicle.photos[0]} // Assuming the first photo is the small image
                    alt={`${vehicle.make} ${vehicle.model}`}
                    className="h-12 w-12 object-cover rounded"
                  />
                </td>
                <td className="py-2 px-4 flex items-center gap-4">
                  <button
                    className="text-red-600 hover:text-red-700 mr-2"
                    onClick={() => deleteVehicle(vehicle._id)}
                  >
                    <FaTrashAlt />
                  </button>
                  <button
                    className="text-green-600 hover:text-green-700"
                    onClick={() => verifyVehicle(vehicle._id)}
                  >
                    <FaCheck />
                  </button>
                  <button
                    className="text-blue-600 hover:text-violet-900"
                    onClick={() => handleDetailPage(vehicle._id)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
