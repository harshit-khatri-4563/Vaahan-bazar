// src/components/FiltersModal.js
import React from 'react';

const FiltersModal = ({ filters, setFilters, showModal, setShowModal }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className={`fixed inset-0 z-50 ${showModal ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-black opacity-50" onClick={() => setShowModal(false)}></div>
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-6">Filters</h2>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Price</label>
            <input
              type="range"
              name="price"
              min="0"
              max="1000000"
              value={filters.price}
              onChange={handleChange}
              className="w-full"
            />
            <div className="text-gray-600 mt-2">Up to Rs. {filters.price}</div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Car Age</label>
            <input
              type="range"
              name="carAge"
              min="0"
              max="10"
              value={filters.carAge}
              onChange={handleChange}
              className="w-full"
            />
            <div className="text-gray-600 mt-2">Up to {filters.carAge} years</div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Fuel Type</label>
            <select
              name="fuelType"
              value={filters.fuelType}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md p-2"
            >
              <option value="">Any</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Transmission</label>
            <select
              name="transmission"
              value={filters.transmission}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md p-2"
            >
              <option value="">Any</option>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Category</label>
            <select
              name="category"
              value={filters.category}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md p-2"
            >
              <option value="">Any</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Kms</label>
            <input
              type="range"
              name="kms"
              min="0"
              max="200000"
              value={filters.kms}
              onChange={handleChange}
              className="w-full"
            />
            <div className="text-gray-600 mt-2">Up to {filters.kms} kms</div>
          </div>
          <button
            className="mt-4 w-full bg-blue-900 text-white py-2 px-4 rounded"
            onClick={() => setShowModal(false)}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiltersModal;
