"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { createUser, getUser, updateUser } from "@/apiCall/userApi";
import { useRouter } from "next/navigation";
import { notifyError,notifySuccess } from "@/utils/Tostify";
import Notification from "@/utils/Tostify";

export default function Page() {
  const router= useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const [profileData, setProfileData] = useState({
    imageUrl: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
    whatsappAlerts: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isNewUser, setIsNewUser] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [hasData, setHasData] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (isLoaded && isSignedIn && user) {
        const clerkData = {
          imageUrl: user.imageUrl || "",
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.emailAddresses[0]?.emailAddress || "",
          phoneNo: user.phoneNumbers[0]?.phoneNumber || "",
          address: {
            street: "",
            city: "",
            state: "",
            zip: "",
            country: "",
          },
          whatsappAlerts: false,
        };

        try {
          if (isLoaded && isSignedIn) {
            const response = await getUser(user.id);
            console.log(response);

            if (response.status == "success") {
              const data = response.data;
              setProfileData({
                ...clerkData,
                address: {
                  ...data.address,
                },
                whatsappAlerts: data.whatsappAlerts || false,
              });
              setIsNewUser(false);
              setHasData(true);
            } else {
              setProfileData(clerkData);
              setIsNewUser(true);
              setHasData(false);
            }
          }
        } catch (error) {
          console.error("Error fetching profile data:", error);
          setHasData(false);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchProfileData();
  }, [isLoaded, isSignedIn, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        [name]: value,
      },
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        ...profileData,
        photo: user.imageUrl,
        firstName: user.firstName,
        lastName: user.lastName,
        clerkId: user.id,
        email: user.emailAddresses[0]?.emailAddress,
        phoneNo: user.phoneNumbers[0]?.phoneNumber,
      };

      if (isNewUser) {
        const response = await createUser(userData);
        notifySuccess("Profile created successfully");
        localStorage.setItem("currentUser", JSON.stringify(response.data));
      } else {
        const response = await updateUser(userData);
        if (response.status === "success" && response.data) {
          localStorage.setItem("currentUser", JSON.stringify(response.data));
          notifySuccess("Profile updated successfully");
          setProfileData(response.data);
          router.push("/")          
        }
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile data:", error);
      notifyError("Error saving profile data");

    }
  };

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-md md:max-w-2xl animate-pulse">
        <Notification/>
        <div className="md:flex">
          <div className="w-full p-4">
            <div className="flex items-center justify-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
            </div>
            <div className="mt-4 text-center">
              <div className="w-1/2 h-6 mx-auto bg-gray-300 rounded"></div>
            </div>
            <div className="mt-6">
              <h3 className="pb-2 text-lg font-semibold border-b">
                Personal Details
              </h3>
              <div className="mt-4">
                <h4 className="text-sm font-semibold">Address</h4>
                <div className="w-full h-6 mt-1 bg-gray-300 rounded"></div>
                <div className="w-full h-6 mt-1 bg-gray-300 rounded"></div>
                <div className="w-full h-6 mt-1 bg-gray-300 rounded"></div>
                <div className="w-full h-6 mt-1 bg-gray-300 rounded"></div>
                <div className="w-full h-6 mt-1 bg-gray-300 rounded"></div>
              </div>
              <hr className="my-4" />
              <div className="mt-4">
                <h4 className="text-sm font-semibold">Phone number</h4>
                <div className="w-full h-6 mt-1 bg-gray-300 rounded"></div>
              </div>
              <hr className="my-4" />
              <div className="mt-4">
                <h4 className="text-sm font-semibold">Email</h4>
                <div className="w-full h-6 mt-1 bg-gray-300 rounded"></div>
              </div>
              <hr className="my-4" />
              <div className="flex items-center justify-between mt-4">
                <h4 className="text-sm font-semibold">Whatsapp Alerts</h4>
                <div className="w-1/4 h-6 mt-1 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-md md:max-w-2xl">
      

      <div className="md:flex">
        <div className="w-full p-4">
          <div className="flex items-center justify-center">
            <div className="w-24 h-24 bg-gray-300 rounded-full">
              <img
                src={profileData.imageUrl?profileData.imageUrl:`https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png`}
                alt=""
                className="w-full h-full rounded-full"
              />
            </div>
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-xl font-bold">
              {`${user.firstName} ${user.lastName}`}
            </h2>
          </div>
          {!hasData ? (
          <div className="popup">
            <div className="flex flex-col items-center justify-center popup-content">
              <h1 className="my-2 text-xl font-semibold text-center text-gray-400">
                Complete the User Profile
              </h1>
              <p className="w-1/2 text-xs text-center text-gray-400">
                You won't be able to access any of the feature if you do not complete your profile.
              </p>
              <div className="w-full mt-4 bg-gray-200 rounded-lg">
                <div
                  className="py-1 text-xs leading-none text-center text-white bg-blue-900 rounded-lg"
                  style={{ width: "75%" }}
                >
                  75% Complete
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full mt-4 bg-gray-200 rounded-lg">
                <div
                  className="py-1 text-xs leading-none text-center text-white bg-blue-900 rounded-lg"
                  style={{ width: "100%" }}
                >
                  100% Complete
                </div>
              </div>
        )}
          <div className="mt-6">
            <h3 className="pb-2 text-lg font-semibold border-b">
              Personal Details
            </h3>
            <div className="mt-4">
              <h4 className="my-2 text-sm font-semibold">Address</h4>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="street"
                    value={profileData.address.street}
                    onChange={handleInputChange}
                    className="w-full px-2 mt-1 border rounded"
                    placeholder="Street"
                  />
                  <input
                    type="text"
                    name="city"
                    value={profileData.address.city}
                    onChange={handleInputChange}
                    className="w-full px-2 mt-1 border rounded"
                    placeholder="City"
                  />
                  <input
                    type="text"
                    name="state"
                    value={profileData.address.state}
                    onChange={handleInputChange}
                    className="w-full px-2 mt-1 border rounded"
                    placeholder="State"
                  />
                  <input
                    type="text"
                    name="zip"
                    value={profileData.address.zip}
                    onChange={handleInputChange}
                    className="w-full px-2 mt-1 border rounded"
                    placeholder="Zip"
                  />
                  <input
                    type="text"
                    name="country"
                    value={profileData.address.country}
                    onChange={handleInputChange}
                    className="w-full px-2 mt-1 border rounded"
                    placeholder="Country"
                  />
                </>
              ) : (
                <p className="mb-4 text-gray-600">
                  {profileData.address.street} {profileData.address.city} {" "}
                  {profileData.address.zip} {profileData.address.state}{" "}
                  {profileData.address.country}
                </p>
              )}
              {!isEditing && (
                <a
                  href="#"
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 text-blue-900 border-2 border-blue-900 rounded "
                >
                  Add Address
                </a>
              )}
              <hr className="my-4" />
              <div className="mt-4">
                <h4 className="text-sm font-semibold">Phone number</h4>
                <p className="mt-1 text-gray-600">
                  {user.phoneNumbers[0].phoneNumber}
                </p>
              </div>
              <hr className="my-4" />
              <div className="mt-4">
                <h4 className="text-sm font-semibold">Email</h4>
                <p className="mt-1 text-gray-600">
                  {user.emailAddresses[0].emailAddress}
                </p>
              </div>
              <hr className="my-4" />
              <div className="flex items-center justify-between mt-4">
                <h4 className="text-sm font-semibold"> Alerts</h4>
                <div>
                  <input
                    type="checkbox"
                    checked={profileData.whatsappAlerts}
                    onChange={() =>
                      setProfileData((prevData) => ({
                        ...prevData,
                        whatsappAlerts: !prevData.whatsappAlerts,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="mt-4">
                {isEditing && (
                  <a href="/">
                    <button
                    onClick={handleSave}
                    className="px-4 py-2 text-white bg-blue-900 rounded hover:bg-blue-900"
                  >
                    Save
                  </button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
