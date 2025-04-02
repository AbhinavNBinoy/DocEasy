import React from 'react';
import { FaTimes } from 'react-icons/fa';

const ViewPrescriptionModal = ({ appointment, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Prescription Details</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-gray-600">Doctor: {appointment.docData.name}</p>
            <p className="text-sm text-gray-600">Date: {appointment.slotDate}</p>
          </div>

          <div className="mb-4 bg-gray-50 p-4 rounded-lg">
            <p className="text-sm whitespace-pre-wrap">
              {appointment.textPrescription?.content || 'No prescription details available.'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-primary text-white py-2 px-4 rounded-lg transition-colors hover:bg-primary/90"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewPrescriptionModal; 