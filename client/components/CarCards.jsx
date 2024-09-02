import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { updateUser } from '@/apiCall/userApi';

const CarCards = ({ car }) => {
  const router=useRouter();
  const handleAddToWishlist = async() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser.wishlist.includes(car._id)) {
        currentUser.wishlist.push(car._id);
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
       
        const response= await updateUser(currentUser);

        alert("added to wishlist")
       
    } else {
        
    }
};


  const handleKnowMore = () => {
    router.push(`/UsedCars/${car._id}`)
    
  };

  return (
    <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-xl overflow-hidden shadow-xl m-4 border-2 py-6 ">
      <div className="relative">
        <img
          className="w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-70 object-contain"
          src={car.photos[0]} // Assuming car.photos is an array, so accessing the first photo
          alt={`${car.make} ${car.model}`}
        />
        <div className="absolute top-0 left-0 bg-gray-900 text-white text-md px-2 py-1 rounded-tr rounded-bl opacity-50">
          {car.year} {car.make} {car.model}
        </div>
      </div>
     
          <div className='px-6 py-2'>
            <div className="font-semibold text-lg sm:text-xl text-gray-800">{car.make} {car.model}</div>
            <p className="text-gray-600 text-sm sm:text-base">₹ {car.price.toLocaleString()}</p>
          </div>
          <div className="flex justify-center items-center space-x-2 px-6 pt-4 pb-2">
          <button
              onClick={handleKnowMore}
              className="bg-blue-900 hover:bg-blue-950 text-white text-center text-sm font-semibold py-2 px-16 rounded-lg mt-2 sm:mt-0 flex items-center justify-center transition duration-300 ease-in-out"
            >
             Show more
             
            </button>
            <button
              onClick={handleAddToWishlist}
              className="bg-gray-200 hover:bg-gray-300 text-sm text-gray-800 text-center font-semibold py-2 px-4 rounded-full flex items-center justify-center transition duration-300 ease-in-out"
            >
              <FontAwesomeIcon icon={faHeart}  className='hover:text-red-500 text-xl' />
              
            </button>
         
          </div>
      
    </div>
  );
};

export default CarCards;
