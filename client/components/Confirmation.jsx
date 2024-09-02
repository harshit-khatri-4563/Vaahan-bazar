import React from 'react';

export default function ConfirmationModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete this vehicle listing?</p>
        <div className="mt-4 flex justify-end gap-4">
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700" onClick={onConfirm}>Yes</button>
          <button className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400" onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
}
