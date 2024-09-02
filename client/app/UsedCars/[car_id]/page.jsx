"use client";
import React, { useEffect, useState } from "react";
import CustomSlider from "@/components/CustomSlider";
import { getVehicleById } from "@/apiCall/vehicleApi";
import { getAllVehicle } from "@/apiCall/vehicleApi";
import { getUser } from "@/apiCall/userApi";
import { SignInButton, useUser } from "@clerk/nextjs";
import Card from "@/components/CarCards";
import { FaWhatsapp, FaFacebook, FaTelegram } from "react-icons/fa";

import {
  FaRupeeSign,
  FaTachometerAlt,
  FaGasPump,
  FaCalendarAlt,
  FaCogs,
  FaPalette,
  FaUser,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaTag,
  FaHeart,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { WhatsappShareButton, FacebookShareButton,TelegramShareButton } from "react-share";
import { sendemail } from "@/utils/sendemail";
import { notifyError, notifySuccess } from "@/utils/Tostify";

const Page = ({ params }) => {
  const car_id = params.car_id;
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sellerDetails, setSellerDetails] = useState(null); // State to hold seller details
  const [showSellerPopup, setShowSellerPopup] = useState(false); // State to control popup visibility
  const [sellerDetailsLoading, setSellerDetailsLoading] = useState(false); // State to track seller details loading
  const { isLoading, isSignedIn, user } = useUser();
  const [cars, setCars] = useState([]);

  const [email, setEmail] = useState(""); // State to hold user's email
  const [bidAmount, setBidAmount] = useState(""); // State to hold bid amount
  const [formMessage, setFormMessage] = useState(""); // State to show form submission status

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const resp = await getAllVehicle();
        setCars(resp.data.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch vehicles", error);
      }
    };

    fetchVehicles();
  }, []);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await getVehicleById(car_id);
        if (response.status === "success") {
          setVehicle(response.data);
          // Fetch seller details once vehicle data is fetched
          await fetchSellerDetails();
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
  const fetchSellerDetails = async () => {
    if (!vehicle) return; // Exit if vehicle is not set
    try {
      setSellerDetailsLoading(true);
      const response = await getUser(vehicle.seller);
      if (response.status === "success") {
        setSellerDetails(response.data);
      }
    } catch (error) {
      console.error("Error fetching seller details:", error);
    } finally {
      setSellerDetailsLoading(false);
    }
  };

  // Function to handle opening seller details popup
  const handleSellerDetails = () => {
    if (!sellerDetails) {
      fetchSellerDetails();
    } else {
      setShowSellerPopup(true);
    }
  };

  // Function to handle closing seller details popup
  const handleCloseSellerPopup = () => {
    setShowSellerPopup(false);
  };

  const handleInterestSubmit = async (e) => {
    e.preventDefault();
    // Implement the logic to send email and bid amount to the seller
    try {
      // Example of sending the email and bid amount to the seller
     
      sendemail(
        sellerDetails.email,
        sellerDetails.firstName + " " + sellerDetails.lastName,
        `Hello ${sellerDetails.firstName},\n\n${user.emailAddresses[0].emailAddress} has shown interest in your ${
          vehicle.year
        } ${vehicle.make} ${vehicle.model} listed at ${
          vehicle.location
        } with a bid of Rs. ${bidAmount}\n\nPlease contact them at their provided email address for further details.\n\nThank you.\nVaahan Bazar Team`
      );

      notifySuccess("Interest has been shared with seller");

      
    } catch (error) {
      notifyError(error.message)
      console.error("Error sending interest:", error);
      setFormMessage("An error occurred. Please try again.");
    }
  };

  if (loading) {
    return <div className="mt-8 text-center">Loading...</div>;
  }

  if (!vehicle) {
    return <div className="mt-8 text-center">Vehicle not found</div>;
  }

  const shareUrl = `${window.location.origin}${location.pathname}`;
  const whatsappMessage = `🚗 *Check out this Car on Vaahan Bazar!*

*Make*: ${vehicle.make}
*Model*: ${vehicle.model}
*Year*: ${vehicle.year}
*Price*: ₹${vehicle.price}
*Location*: ${vehicle.location}

🔗 ${shareUrl}
📸 ${vehicle.photos[0]}`;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col items-center justify-center p-10 border border-black rounded-lg md:flex-row md:items-center">
        <div className="w-full border rounded-lg md:w-1/2">
          <CustomSlider images={vehicle.photos} />
        </div>
        <div className="flex flex-col items-center justify-center w-full mt-6 md:ml-6 md:mt-0 md:w-1/2 md:h-1/2">
          <div className="w-full">
            <div className="flex justify-end gap-4">
              <FaHeart className="text-2xl text-gray-400 cursor-pointer hover:text-red-500" />
              <WhatsappShareButton url={shareUrl} title={whatsappMessage}>
                <FaWhatsapp
                  size={28}
                  className="text-white bg-green-500 rounded-lg hover:bg-green-600"
                />
              </WhatsappShareButton>
              <FacebookShareButton url={shareUrl} title={whatsappMessage}>
                <FaFacebook
                  size={28}
                  className="text-white bg-blue-700 rounded-lg hover:bg-blue-800"
                />
              </FacebookShareButton>
              <TelegramShareButton url={shareUrl} title={whatsappMessage}>
                <FaTelegram
                  size={28}
                  className="text-white bg-blue-500 rounded-lg hover:bg-blue-800"
                />
              </TelegramShareButton>
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
          {!!user ? (
              <button
              onClick={handleSellerDetails}
              className="px-10 py-2 mt-4 font-semibold text-white bg-blue-900 rounded hover:bg-blue-950 "
            >
              {sellerDetailsLoading
                ? "Loading Seller Details..."
                : "Get Seller Details"}
            </button>
          ):(
            <SignInButton  className="px-10 py-2 mt-4 font-semibold text-white bg-blue-900 w-auto rounded hover:bg-blue-950 text-center">Sign in to get seller details</SignInButton>
          )}
          </div>
        </div>
      </div>
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
                        {sellerDetails.address.city},{" "}
                        {sellerDetails.address.state}
                      </div>
                    </div>
                  </td>
                  <td className="p-5 border">
                    <div className="flex flex-col items-start">
                      <div className="flex items-center">
                        <FaCalendarAlt className="mr-2 text-gray-600" />
                        <span className="font-semibold">Member since:</span>
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
                  <td className="p-5 border"></td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Form to Show Interest */}
          <form onSubmit={handleInterestSubmit} className="flex flex-col mt-6">
            <label className="mb-2 font-semibold" htmlFor="email">
              Your Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-2 mb-4 border border-gray-300 rounded"
            />
            <label className="mb-2 font-semibold" htmlFor="bidAmount">
              Your Bid Amount (Rs.):
            </label>
            <input
              type="number"
              id="bidAmount"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              required
              className="p-2 mb-4 border border-gray-300 rounded"
            />
            <button
              type="submit"
              className="px-4 py-2 font-semibold text-white bg-blue-900 rounded hover:bg-blue-950"
            >
              Show Interest
            </button>
            {formMessage && <p className="mt-4 text-center">{formMessage}</p>}
          </form>
        </div>
      )}
      <div className="mt-6">
        <h3 className="text-2xl font-semibold">Car Overview</h3>
        <div className="mt-4 overflow-x-auto border rounded-lg border-slate-400">
          <table className="min-w-full">
            <tbody>
              <tr className="border border-black">
                <td className="p-5 border">
                  <div className="flex flex-col items-start">
                    <div className="flex items-center">
                      <FaRupeeSign className="mr-2 text-gray-600" />
                      <span className="font-semibold">Price:</span>
                    </div>
                    <div>₹ {vehicle.price}</div>
                  </div>
                </td>
                <td className="p-5 border">
                  <div className="flex flex-col items-start">
                    <div className="flex items-center">
                      <FaTachometerAlt className="mr-2 text-gray-600" />
                      <span className="font-semibold">Kilometer:</span>
                    </div>
                    <div>{vehicle.mileage} KM</div>
                  </div>
                </td>
                <td className="p-5 border">
                  <div className="flex flex-col items-start">
                    <div className="flex items-center">
                      <FaGasPump className="mr-2 text-gray-600" />
                      <span className="font-semibold">Fuel type:</span>
                    </div>
                    <div>{vehicle.fuelType}</div>
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
                    <div>{vehicle.year}</div>
                  </div>
                </td>
                <td className="p-5 border">
                  <div className="flex flex-col items-start">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2 text-gray-600" />
                      <span className="font-semibold">Manufacturing year:</span>
                    </div>
                    <div>{vehicle.year}</div>
                  </div>
                </td>
                <td className="p-5 border">
                  <div className="flex flex-col items-start">
                    <div className="flex items-center">
                      <FaUser className="mr-2 text-gray-600" />
                      <span className="font-semibold">No. of owners:</span>
                    </div>
                    <div>{vehicle.condition}</div>
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
                    <div>{vehicle.transmissionType}</div>
                  </div>
                </td>
                <td className="p-5 border">
                  <div className="flex flex-col items-start">
                    <div className="flex items-center">
                      <FaPalette className="mr-2 text-gray-600" />
                      <span className="font-semibold">Color:</span>
                    </div>
                    <div>{vehicle.color}</div>
                  </div>
                </td>
                <td className="p-5 border">
                  <div className="flex flex-col items-start">
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-gray-600" />
                      <span className="font-semibold">Car Available at:</span>
                    </div>
                    <div>{vehicle.location}</div>
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
                    <div>Comprehensive</div>
                  </div>
                </td>
                <td className="p-5 border">
                  <div className="flex flex-col items-start">
                    <div className="flex items-center">
                      <FaTag className="mr-2 text-gray-600" />
                      <span className="font-semibold">Best selling:</span>
                    </div>
                    <div>Finance options available</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="mb-2 text-2xl font-semibold">Similar Cars</h3>
        <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-4">
          {cars.map((car) => (
            <Card key={car._id} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
