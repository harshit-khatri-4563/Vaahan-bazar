'use client'
import React, { useState, useEffect } from 'react';
import { getAllVehicle } from '@/apiCall/vehicleApi';
import { SignIn, SignInButton, useUser } from '@clerk/nextjs';
import { getUser } from '@/apiCall/userApi';
import HeroLoader from '../Loaders/HeroLoader';
import SpeechToText from "@/components/SpeechToText";


const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false); // State to manage loading indicator
  const [showProfilePopup, setShowProfilePopup] = useState(false); // State to manage profile completion popup

  const handleTranscription = (transcription) => {
		console.log("Transcribed Text:", transcription);
    setSearchTerm(transcription);
	};

  useEffect(() => {
    const handleSearch = async () => {
    

      try {
        if (!searchTerm.trim()) {
          // If search term is empty, clear results and hide options
          setSearchResults([]);
          setShowOptions(false);
          return;
        }
        
        const response = await getAllVehicle();
        if (response.status === 'success') {
          const filteredResults = response.data.filter(vehicle =>
            `${vehicle.make} ${vehicle.model}`.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setSearchResults(filteredResults);
          setShowOptions(true);
        } else {
          console.error('Failed to fetch vehicles');
        }
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      } finally {
        
      }
    };

    const debounceSearch = setTimeout(() => {
      handleSearch();
    }, 300); // Debounce to avoid frequent API calls

    return () => clearTimeout(debounceSearch);
  }, [searchTerm]);

  useEffect(() => {
    const fetchUser = async () => {
      if (isLoaded && isSignedIn) {
        setLoading(true);
        try {
          const response = await getUser(user.id);
          if (response.status === 'success') {
            setCurrentUser(response.data);
          } else {
            console.error('Failed to fetch user');
          }
        } catch (error) {
          console.error('Error fetching user:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUser();
  }, [isLoaded, isSignedIn, user]);

  useEffect(() => {
    
    if (!currentUser) {
      setShowProfilePopup(true); // Show popup if currentUser exists but firstName is missing
    } else {
      setShowProfilePopup(false); // Hide popup if currentUser is complete
    }
  }, [currentUser]); 

  if (!isLoaded || loading) {
    return <HeroLoader />;
  }

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 bg-black opacity-90">
        <img src="/bg.jpg" className="object-cover w-full h-full" alt="Car Background" />
      </div>

      <div className={`relative mx-auto z-10 flex flex-col lg:top-0 items-center justify-center h-full text-center ${!isSignedIn ? `bg-nav` : ``} text-white px-4`}>
        {!isSignedIn ? (
          <div className="p-8 shadow-xl bg-white rounded-lg flex flex-col items-center gap-4">
            <h1 className="text-3xl font-bold text-black">Sign in to Vaahan Bazar</h1>
            <p className='text-sm text-gray-700 w-1/2'>Sign in to your account to access all the website features.</p>
            <SignInButton className="bg-blue-600 text-white rounded-xl px-4 py-2"/>
          </div>
        ) : (
          <>
            <h1 className="text-5xl font-bold mb-4">Find The Best Cars At the Best Prices</h1>
            <p className="text-2xl mb-8">for you and your family</p>

            <div className="w-full max-w-2xl relative">
              <input
                type="text"
                className="w-full p-4 pl-6 text-gray-800 focus:outline-none placeholder-large bg-white shadow-lg overflow-hidden rounded-lg"
                placeholder="Type to search cars"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SpeechToText onTranscribe={handleTranscription} />

              {showOptions && searchResults.length > 0 && (
                <div className="absolute mt-1 w-full max-w-2xl bg-white shadow-lg overflow-hidden rounded-lg z-10">
                  {searchResults.slice(0, 3).map(vehicle => (
                    <a key={vehicle._id} href={`/UsedCars/${vehicle._id}`} className="block hover:bg-gray-100">
                      <div className="flex items-center p-2 border-b">
                        <img src={vehicle.photos[0]} alt="" className="h-16 w-16 object-cover rounded" />
                        <div className="ml-3">
                          <p className="text-lg font-medium text-gray-900">{`${vehicle.make} ${vehicle.model}`}</p>
                          <p className="text-sm text-gray-600">{vehicle.year}</p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {loading && <div className="text-white mt-4">Loading search results...</div>}

            {/* Profile Completion Popup */}
            {showProfilePopup && (
              <div className="fixed inset-0 flex items-center justify-center bg-nav">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center text-gray-700">
                  <p className="text-lg font-semibold mb-4">Complete Your Profile</p>
                  <p className="text-sm mb-4">Please complete your profile to continue.</p>
                  <a href="/dashboard">
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                      onClick={() => setShowProfilePopup(false)}
                    >
                      Complete Profile
                    </button>
                  </a>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
