"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import {
	SignInButton,
	SignedIn,
	SignedOut,
	UserButton,
	OrganizationSwitcher,
} from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { navLinks } from "@/constant";
import { getUser } from "@/apiCall/userApi";
import { getAllVehicle } from "@/apiCall/vehicleApi";

const Navbar = () => {
	const { isSignedIn, user, isLoaded } = useUser();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [admin, setAdmin] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [showOptions, setShowOptions] = useState(false);


	useEffect(() => {
		const fetchUserData = async () => {
			if (isLoaded && isSignedIn) {
				if (
					user.organizationMemberships.length > 0 &&
					user.organizationMemberships[0].role === "org:admin"
				) {
					setAdmin(true);
				}
				try {
					const response = await getUser(user.id);
					if (response.status === "success" && response.data) {
						localStorage.setItem("currentUser", JSON.stringify(response.data));
					} else {
						localStorage.setItem("currentUser", null);
					}
				} catch (error) {
					console.error("Error fetching user data:", error);
				}
			} else {
				localStorage.setItem("currentUser", null);
			}
		};

		fetchUserData();
	}, [user, isLoaded, isSignedIn]);

	useEffect(() => {
		const handleSearch = async () => {
			try {
				if (!searchTerm.trim()) {
					setSearchResults([]);
					setShowOptions(false);
					return;
				}

				const response = await getAllVehicle();
				if (response.status === "success") {
					const filteredResults = response.data.filter((vehicle) =>
						`${vehicle.make} ${vehicle.model}`
							.toLowerCase()
							.includes(searchTerm.toLowerCase())
					);
					setSearchResults(filteredResults);
					setShowOptions(true);
				} else {
					console.error("Failed to fetch vehicles");
				}
			} catch (error) {
				console.error("Error fetching vehicles:", error);
			}
		};

		const debounceSearch = setTimeout(() => {
			handleSearch();
		}, 300); // Debounce to avoid frequent API calls

		return () => clearTimeout(debounceSearch);
	}, [searchTerm]);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	return (
		<div className='w-full h-24 p-4 lg:p-9 flex justify-between items-center relative z-50 bg-white top-0 shadow-xl'>
			<div className='flex items-center gap-4'>
				<a href='/'>
					<Image
						src='/vaahan_bazar_logo.png'
						alt='vaahan bazar logo'
						width={150}
						height={150}
						className='w-24 h-24 lg:w-40 lg:h-40'
					/>
				</a>
			</div>
			<div className='hidden lg:block'>
				<ul className='flex gap-10 font-normal'>
					{navLinks.map((link) => (
						<a
							key={link.href}
							href={link.href}
							className='navbar-link text-black font-bold px-3 py-2 rounded-md text-sm  relative'
						>
							<li>{link.name}</li>
							<span className='animated-line'></span>
						</a>
					))}
					{admin && (
						<a
							href='/Admin'
							className='navbar-link text-black font-bold px-3 py-2 rounded-md text-sm relative'
						>
							<li>Admin Panel</li>
							<span className='animated-line'></span>
						</a>
					)}
				</ul>
			</div>
			<div className='hidden lg:block w-[300px]   relative'>
				<input
					type='text'
					className='w-full p-2 pl-6 text-gray-800 border-2 bg-white shadow-sm rounded-lg'
					placeholder='Type to search cars'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				{showOptions && searchResults.length > 0 && (
					<div className='absolute mt-1 w-full max-w-2xl bg-white shadow-lg rounded-lg z-10'>
						{searchResults.slice(0, 3).map((vehicle) => (
							<a
								key={vehicle._id}
								href={`/UsedCars/${vehicle._id}`}
								className='block hover:bg-gray-100'
							>
								<div className='flex items-center p-2 border-b'>
									<img
										src={vehicle.photos[0]}
										alt=''
										className='h-16 w-16 object-cover rounded'
									/>
									<div className='ml-3'>
										<p className='text-lg font-medium text-gray-900'>{`${vehicle.make} ${vehicle.model}`}</p>
										<p className='text-sm text-gray-600'>{vehicle.year}</p>
									</div>
								</div>
							</a>
						))}
					</div>
				)}
			</div>
			<div className='flex gap-4 items-center'>
				<div className='lg:hidden flex items-center gap-4'>
					<button
						onClick={toggleMobileMenu}
						className='text-gray-500 focus:outline-none'
					>
						{isMobileMenuOpen ? (
							<FaTimes className='w-10 h-10' />
						) : (
							<HiOutlineMenuAlt3 className='w-10 h-10' />
						)}
					</button>
					<div>
						<SignedOut>
							<SignInButton className='bg-blue-600 px-4 py-2 rounded-xl hover:bg-blue-500 transition-colors text-white' />
						</SignedOut>
					</div>
				</div>
			</div>
			{isMobileMenuOpen && (
				<div className='lg:hidden absolute top-24 left-0 w-full bg-white z-50 shadow-md text-black'>
					<ul className='flex flex-col items-center gap-4 py-4'>
						{navLinks.map((link) => (
							<a
								key={link.href}
								href={link.href}
								className='navbar-link text-black font-bold px-3 py-2 text-md relative border-b-2 border-gray-900'
							>
								<li>{link.name}</li>
								<span className='animated-line'></span>
							</a>
						))}
						{admin && (
							<a
								href='/Admin'
								className='navbar-link text-black font-bold px-3 py-2 text-md relative border-b-2 border-gray-900'
							>
								<li>Admin Panel</li>
								<span className='animated-line'></span>
							</a>
						)}
						<SignedIn>
							<div className='p-2 rounded-xl border-2 border-blue-600'>
								<UserButton />
								{admin && <OrganizationSwitcher />}
							</div>
						</SignedIn>
					</ul>
				</div>
			)}
			<div className='gap-4 hidden lg:flex'>
				<h1 className='text-xl font-semibold text-black'>
					{isSignedIn && isLoaded && !admin ? `Hello, ${user.firstName}` : ``}
				</h1>
				<div>
					<SignedOut>
						<SignInButton className='bg-blue-600 px-4 py-2 rounded-xl hover:bg-blue-500 transition-colors text-white' />
					</SignedOut>
					<SignedIn>
						<div>
							{admin && <OrganizationSwitcher />}
							<UserButton />
						</div>
					</SignedIn>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
