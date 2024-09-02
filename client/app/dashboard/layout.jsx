'use client'
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaUser, FaList, FaHeart } from 'react-icons/fa'; // Import necessary icons

export default function Layout({ children }) {
  const links = [
    { name: 'My Profile', href: '/dashboard', icon: <FaUser className="inline-block" /> },
    { name: 'My Listings', href: '/dashboard/mylistings', icon: <FaList className="inline-block " /> },
    { name: 'Wishlist', href: '/dashboard/wishlist', icon: <FaHeart className="inline-block " /> },
  ];

  const pathname = usePathname();

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
  
      <div className="w-full flex-none md:w-64 bg-blue-900">
        <div className="p-4  ">
          <nav className="space-y-2 max-md:flex max-md:justify-around ">
            {links.map((link, index) => (
              <Link key={index} href={link.href} className={clsx(
                ' py-4 px-6 rounded-lg text-white hover:bg-blue-950 transition duration-300 flex items-center ',
                {
                  'bg-blue-950': pathname === link.href,
                }
              )}>
              
                 
                  <span className="hidden md:flex items-center">
                    {link.icon}
                    <span className="ml-2">{link.name}</span>
                  </span>
                  <span className="md:hidden">{link.icon}</span>
               
              </Link>
            ))}
          </nav>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12 overflow-scroll">
        {children}
      </div>
    </div>
  );
}
