import React from 'react';

const ContactSection = () => {
  return (
    <div className="flex flex-col items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Still have questions?</h2>
      <p className="text-lg text-gray-600 mb-8">Contact us for more information or assistance</p>
      <div className="flex flex-col md:flex-row justify-around w-full max-w-4xl space-y-6 md:space-y-0 md:space-x-6">
        <div className="flex flex-col items-center text-center">
          <div className="text-2xl font-semibold text-gray-900">Email</div>
          <div className="text-lg text-gray-600">For any enquiries</div>
          <div className="text-blue-500">Hello@gmail.com</div>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="text-2xl font-semibold text-gray-900">Live Chat</div>
          <div className="text-lg text-gray-600">Chat with our support team for immediate assistance</div>
          <div className="text-blue-500">Start new chat</div>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="text-2xl font-semibold text-gray-900">Phone</div>
          <div className="text-lg text-gray-600">Call us for any questions or concerns</div>
          <div className="text-blue-500">+91864656556</div>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="text-2xl font-semibold text-gray-900">Office</div>
          <div className="text-lg text-gray-600">Visit our office for in-person assistance</div>
          <div className="text-blue-500">123 / Gurugram near DLF Cyberpark</div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
