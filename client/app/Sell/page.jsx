'use client'
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import ScreenLoader from "@/components/Loaders/ScreenLoader";
import { createVehicle } from "@/apiCall/vehicleApi";
import { updateUser } from "@/apiCall/userApi";
import { brand } from "@/constant";
import { useRouter } from "next/navigation";
import { notifySuccess,notifyError } from "@/utils/Tostify";
import Notification from "@/utils/Tostify";
import { sendemail } from "@/utils/sendemail";

const Page = () => {
  const router= useRouter();
  const { isSignedIn, user, isLoaded } = useUser();
  const [apiLoading, setApiLoading] = useState(false);
  const [step, setStep] = useState(1); // Current step of the form
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    mileage: "",
    transmissionType: "",
    fuelType: "",
    category: "",
    location: "",
    price: "",
    color: "",
    photos: [],
    seller: "",
    condition: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, files } = e.target;
    if (name === "photos") {
      
      if (files.length > 10) {
        alert("You can only upload a maximum of 10 images.");
        e.target.value = '';
        return;
      }
      // const selectedFiles = Array.from(files).slice(0, 10); 
      setFormData({
        ...formData,
        photos: files, 
      });
    } else {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("make", formData.make);
      formDataToSend.append("model", formData.model);
      formDataToSend.append("year", formData.year);
      formDataToSend.append("mileage", formData.mileage);
      formDataToSend.append("transmissionType", formData.transmissionType);
      formDataToSend.append("fuelType", formData.fuelType);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("color", formData.color);
      for (let i = 0; i < formData.photos.length; i++) {
        formDataToSend.append('photos', formData.photos[i]);
      }
      // formDataToSend.append("photos", formData.photos); // append the file object
      formDataToSend.append("seller", user.id); // Use clerkId from user object
      formDataToSend.append("condition", formData.condition);
      formDataToSend.append("description", formData.description);

      if (localStorage.getItem("currentUser")) {
        const vehicle = await createVehicle(formDataToSend);

        // Update user's myListings with new vehicle
        const updatedUser = JSON.parse(localStorage.getItem("currentUser"));
        updatedUser.carsForSale.push(vehicle.data._id); // Assuming vehicle._id is available after createVehicle

        const response = await updateUser(updatedUser);
        
        if (response.status === "success" && response.data) {
          const vehicle= response.data;
          sendemail(
            user.emailAddresses[0].emailAddress,
            "Vaahan Bazar",
        
            `Dear ${user.fullName},
          
          Congratulations! Your vehicle has been successfully added to Vaahan Bazar.
          
          Vehicle Details:
          - Make: ${formData.make}
          - Model: ${formData.model}
          - Year: ${formData.year}
          - Mileage: ${formData.mileage} km
          - Transmission Type: ${formData.transmissionType}
          - Fuel Type: ${formData.fuelType}
          - Category: ${formData.category}
          - Location: ${formData.location}
          - Price: ₹${formData.price}
          - Color: ${formData.color}
          - Condition: ${formData.condition}
          
          Thank you for choosing Vaahan Bazar. If you have any questions or need further assistance, please feel free to contact us.
          
          Best regards,
          Vaahan Bazar Team
          `
          );
          
          notifySuccess("Successfull")
          localStorage.setItem("currentUser", JSON.stringify(response.data));
        } else {
          localStorage.removeItem("currentUser");
          router.push("/")
        }

        setApiLoading(false);
      } else {
        notifyError("Complete user profile first")
       
        router.push("/")
      }

      // Optionally handle success feedback or redirect to another page
    } catch (error) {
      console.error("Error creating vehicle:", error);
      notifyError("Error creating vehicle")
      // Handle error feedback or display to the user
    } finally {
      setApiLoading(false);
    }
  };

  if (!isLoaded || apiLoading) {
    return (
      <div className="z-0 w-full h-screen">
        <ScreenLoader />
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        You need to sign in first.
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen p-5 bg-gray-100">
      <Notification/>
      <div className="absolute top-0 left-0 right-0 w-full bg-blue-900 py-14">
        <h1 className="text-2xl font-bold text-center text-white md:text-4xl lg:text-6xl">
          Sell Your Car Online For Free
        </h1>
      </div>
      <div className="relative w-full max-w-3xl px-4 py-8 mt-32 mb-4 bg-white rounded-lg shadow-md">
        {step === 1 && (
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Step 1: Vehicle Details */}
            <div>
              <label htmlFor="make" className="block text-sm font-medium text-gray-700">
                Brand
              </label>
              <select
                id="make"
                name="make"
                value={formData.make}
                onChange={handleChange}
                className="block w-full py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-900 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option value="">Select Brand</option>
                {brand.map((brand, index) => (
                  <option key={index} value={brand.name}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="model" className="block text-sm font-medium text-gray-700">
                Model
              </label>
              <select
                id="model"
                name="model"
                value={formData.model}
                onChange={handleChange}
                className="block w-full py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-900 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option value="">Select Model</option>
                {formData.make &&
                  brand
                    .find((brandItem) => brandItem.name === formData.make)
                    ?.vehicles.map((vehicle, idx) => (
                      <option key={idx} value={vehicle}>
                        {vehicle}
                      </option>
                    ))}
              </select>
            </div>
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                Year
              </label>
              <select
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="block w-full py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-900 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option value="">Select Year</option>
                {Array.from({ length: 15 }, (_, index) => {
                  const year = 2024 - index;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label htmlFor="mileage" className="block text-sm font-medium text-gray-700">
                Kilometers Driven
              </label>
              <input
                type="text"
                id="mileage"
                name="mileage"
                value={formData.mileage}
                onChange={handleChange}
                placeholder="Ex: 80000"
                className="block w-full py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-900 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="inline-block px-4 py-3 text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </form>
        )}
        {step === 2 && (
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Step 2: Additional Details */}
            <div>
              <label htmlFor="transmissionType" className="block text-sm font-medium text-gray-700">
                Transmission Type
              </label>
              <select
                id="transmissionType"
                name="transmissionType"
                value={formData.transmissionType}
                onChange={handleChange}
                className="block w-full py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-900 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option value="">Select Transmission Type</option>
                <option value="automatic">Automatic</option>
                <option value="manual">Manual</option>
                <option value="semi-automatic">Semi Automatic</option>
              </select>
            </div>
            <div>
              <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700">
                Fuel Type
              </label>
              <select
                id="fuelType"
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
                className="block w-full py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-900 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option value="">Select Fuel Type</option>
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="electric">Electric</option>
                <option value="hybrid">Hybrid</option>
                <option value="cng">CNG</option>
              </select>
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="block w-full py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-900 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option value="">Select Category</option>
                <option value="SUV">SUV</option>
                <option value="sedan">Sedan</option>
                <option value="hatchback">Hatchback</option>
                <option value="coupe">Coupe</option>
                <option value="convertible">Convertible</option>
                <option value="wagon">Wagon</option>
                <option value="pickup">Pickup</option>
                <option value="van">Van</option>
                <option value="minivan">Minivan</option>
                <option value="truck">Truck</option>
              </select>
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                className="block w-full py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-900 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div className="flex justify-between space-x-4">
              <button
                type="button"
                className="inline-block px-4 py-3 text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                onClick={handlePrevious}
              >
                Previous
              </button>
              <button
                type="button"
                className="inline-block px-4 py-3 text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </form>
        )}
        {step === 3 && (
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Step 3: Pricing and Description */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price (INR)
              </label>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Ex: 300000"
                className="block w-full py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-900 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                Color
              </label>
              <input
                type="text"
                id="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="Color"
                className="block w-full py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-900 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="photos" className="block text-sm font-medium text-gray-700">
                Photos
              </label>
              <input
                type="file"
                id="photos"
                name="photos"
                required
                multiple
                onChange={handleChange}
                accept="image/*"
                className="block w-full py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-900 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="condition" className="block text-sm font-medium text-gray-700">
                Condition
              </label>
              <select
                id="condition"
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className="block w-full py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-900 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option value="">Select Condition</option>
                <option value="new">New</option>
                <option value="used">Used</option>
                <option value="certified">Certified Pre-owned</option>
              </select>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                placeholder="Description"
                className="block w-full py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-900 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              ></textarea>
            </div>
            <div className="flex justify-between space-x-4">
              <button
                type="button"
                className="inline-block px-4 py-3 text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                onClick={handlePrevious}
              >
                Previous
              </button>
              <button
                type="submit"
                className="inline-block px-4 py-3 text-white bg-blue-900 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-opacity-50"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Page;

