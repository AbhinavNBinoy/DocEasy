import React, { useState } from 'react';
import { FaCloudUploadAlt, FaFileImage, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';

const DoctorPrescriptionUpload = ({ appointment, onClose, onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const { backendUrl, token } = useContext(AppContext);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB');
        return;
      }
      
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Only JPG, PNG, and PDF files are allowed');
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file first');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('prescription', selectedFile);
    formData.append('appointmentId', appointment._id);
    formData.append('isDoctor', true);

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/upload-prescription`,
        formData,
        {
          headers: {
            token,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (data.success) {
        toast.success('Prescription uploaded successfully!');
        onUploadSuccess();
        onClose();
      } else {
        toast.error(data.message || 'Failed to upload prescription');
      }
    } catch (error) {
      console.error('Error uploading prescription:', error);
      toast.error(error.response?.data?.message || 'Failed to upload prescription. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Upload Prescription</h2>
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

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              id="prescription-upload"
              accept="image/*,.pdf"
              onChange={handleFileSelect}
              className="hidden"
              disabled={isUploading}
            />
            <label
              htmlFor="prescription-upload"
              className={`cursor-pointer flex flex-col items-center ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <FaCloudUploadAlt className="text-4xl text-primary mb-4" />
              <p className="text-gray-600 mb-2">
                {selectedFile ? selectedFile.name : 'Click to upload prescription'}
              </p>
              <p className="text-sm text-gray-500">
                Supported formats: JPG, PNG, PDF (Max 5MB)
              </p>
            </label>
          </div>

          {preview && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Preview</h3>
              <div className="border rounded-lg p-4">
                {selectedFile?.type.startsWith('image/') ? (
                  <img
                    src={preview}
                    alt="Prescription preview"
                    className="max-h-64 mx-auto"
                  />
                ) : (
                  <div className="flex items-center justify-center p-4">
                    <FaFileImage className="text-4xl text-primary" />
                    <span className="ml-2">PDF Document</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className={`mt-6 w-full bg-primary text-white py-2 px-4 rounded-lg transition-colors ${
              !selectedFile || isUploading
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-primary/90'
            }`}
          >
            {isUploading ? 'Uploading...' : 'Upload Prescription'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorPrescriptionUpload; 