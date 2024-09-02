// SellerPopupCard.jsx
import React from 'react';
import PropTypes from 'prop-types';

const SellerPopupCard = ({ sellerDetails, onClose }) => {
  const { firstName, lastName, email, phoneNo, address, photo } = sellerDetails;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
      <div className="bg-white rounded-lg p-8 max-w-md z-50 overflow-y-auto relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-red-500">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex justify-center mb-4">
          <img
            src={photo || '/default-profile-image.jpg'} // Default profile image URL or placeholder
            alt={`${firstName}'s profile`}
            className="rounded-full w-20 h-20"
          />
        </div>
        <h2 className="text-2xl font-semibold mb-4">{firstName} {lastName}</h2>
        <p className="text-lg text-gray-700 mb-2">{email}</p>
        <p className="text-lg text-gray-700 mb-2">{phoneNo}</p>
        <p className="text-lg text-gray-700">{`${address.street}, ${address.city}, ${address.state} ${address.zip}, ${address.country}`}</p>
        
      </div>
    </div>
  );
};

SellerPopupCard.propTypes = {
  sellerDetails: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phoneNo: PropTypes.string.isRequired,
    address: PropTypes.shape({
      street: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      zip: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    }).isRequired,
    photo: PropTypes.string, // Profile image URL
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SellerPopupCard;
