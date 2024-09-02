import React from "react";

const Filters = ({ filters, setFilters }) => {
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFilters((prevFilters) => ({
			...prevFilters,
			[name]: value,
		}));
	};

	return (
		<div className='p-6 bg-gray-100 shadow-md rounded-lg mb-6 md:mb-0 md:h-screen mr-5'>
			<h2 className='text-xl font-semibold mb-6'>Filters</h2>

			<div className='mb-6'>
				<label className='block text-gray-700 mb-2'>Price</label>
				<input
					type='range'
					name='price'
					min='0'
					max='1000000'
					value={filters.price}
					onChange={handleChange}
					className='w-full'
				/>
				<div className='text-gray-600 mt-2'>Up to Rs. {filters.price}</div>
			</div>

			<div className='mb-6'>
				<label className='block text-gray-700 mb-2'>Car Age</label>
				<input
					type='range'
					name='carAge'
					min='0'
					max='10'
					value={filters.carAge}
					onChange={handleChange}
					className='w-full'
				/>
				<div className='text-gray-600 mt-2'>Up to {filters.carAge} years</div>
			</div>

			<div className='mb-6'>
				<label className='block text-gray-700 mb-2'>Fuel Type</label>
				<select
					name='fuelType'
					value={filters.fuelType}
					onChange={handleChange}
					className='w-full border-gray-300 rounded-md p-2'
				>
					<option value=''>Any</option>
					<option value='Petrol'>Petrol</option>
					<option value='Diesel'>Diesel</option>
					<option value='CNG'>CNG</option>
					<option value='Electric'>Electric</option>
					<option value='Hybrid'>Hybrid</option>
				</select>
			</div>

			<div className='mb-6'>
				<label className='block text-gray-700 mb-2'>Transmission</label>
				<select
					name='transmissionType'
					value={filters.transmissionType}
					onChange={handleChange}
					className='w-full border-gray-300 rounded-md p-2'
				>
					<option value=''>Any</option>
					<option value='Manual'>Manual</option>
					<option value='Automatic'>Automatic</option>
					<option value='semi-automatic'>Semi Automatic</option>
				</select>
			</div>

			<div className='mb-6'>
				<label className='block text-gray-700 mb-2'>Category</label>
				<select
					name='category'
					value={filters.category}
					onChange={handleChange}
					className='w-full border-gray-300 rounded-md p-2'
				>
					<option value=''>Any</option>
					<option value='SUV'>SUV</option>
					<option value='sedan'>Sedan</option>
					<option value='hatchback'>Hatchback</option>
					<option value='coupe'>Coupe</option>
					<option value='convertible'>Convertible</option>
					<option value='wagon'>Wagon</option>
					<option value='pickup'>Pickup</option>
					<option value='van'>Van</option>
					<option value='minivan'>Minivan</option>
					<option value='truck'>Truck</option>
				</select>
			</div>

			<div className='mb-6'>
				<label className='block text-gray-700 mb-2'>Kms</label>
				<input
					type='range'
					name='kms'
					min='0'
					max='200000'
					value={filters.kms}
					onChange={handleChange}
					className='w-full'
				/>
				<div className='text-gray-600 mt-2'>Up to {filters.kms} kms</div>
			</div>
		</div>
	);
};

export default Filters;
