
import React from 'react';

const UserIcon = ({ initial }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className=" w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center">
        <span className="text-4xl text-purple-800">{initial}</span>
      </div>
    </div>
  );
};

export default UserIcon;
