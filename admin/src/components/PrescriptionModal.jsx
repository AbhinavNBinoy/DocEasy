import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import { DoctorContext } from '../context/DoctorContext';
import { useContext } from 'react';

const PrescriptionModal = ({ appointment, onClose, onSaveSuccess }) => {
  const [prescription, setPrescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { backendUrl } = useContext(AppContext);
  const { dToken } = useContext(DoctorContext);

  useEffect(() => {
    // Load existing prescription if available
    if (appointment.textPrescription?.content) {
      setPrescription(appointment.textPrescription.content);
    }
  }, [appointment]);

  const handleSave = async () => {
    if (!prescription.trim()) {
      toast.error('Please enter a prescription');
      return;
    }

    setIsSaving(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/save-prescription`,
        { 
          appointmentId: appointment._id,
          prescription: prescription.trim()
        },
        {
          headers: { dtoken: dToken }
        }
      );

      if (data.success) {
        toast.success('Prescription saved successfully!');
        onSaveSuccess();
        onClose();
      } else {
        toast.error(data.message || 'Failed to save prescription');
      }
    } catch (error) {
      console.error('Error saving prescription:', error);
      toast.error(error.response?.data?.message || 'Failed to save prescription. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Add Prescription</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-gray-600">Patient: {appointment.userData.name}</p>
            <p className="text-sm text-gray-600">Date: {appointment.slotDate}</p>
          </div>

          <div className="mb-4">
            <textarea
              value={prescription}
              onChange={(e) => setPrescription(e.target.value)}
              placeholder="Enter prescription details..."
              className="w-full h-64 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isSaving}
            />
          </div>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`w-full bg-primary text-white py-2 px-4 rounded-lg transition-colors ${
              isSaving
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-primary/90'
            }`}
          >
            {isSaving ? 'Saving...' : 'Save Prescription'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionModal; 