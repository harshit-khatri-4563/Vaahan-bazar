import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="max-w-sm h-96 bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden mb-6 animate-pulse">
      <div className="w-full h-48 bg-gray-300"></div> {/* Placeholder for image */}
      <div className="p-4">
        <div className="h-4 bg-gray-300 w-3/4 mb-2"></div> {/* Placeholder for title */}
        <div className="h-3 bg-gray-300 w-1/2 mb-2"></div> {/* Placeholder for details line 1 */}
        <div className="h-3 bg-gray-300 w-1/3"></div> {/* Placeholder for details line 2 */}
        <div className="h-8 bg-gray-300 w-1/2 mt-4"></div> {/* Placeholder for price */}
        <div className="h-10 bg-blue-900 w-full mt-4 rounded"></div> {/* Placeholder for button */}
      </div>
    </div>
  );
};

export default SkeletonCard;