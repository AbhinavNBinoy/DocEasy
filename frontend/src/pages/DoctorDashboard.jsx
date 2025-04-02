import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import DoctorPrescriptionUpload from '../components/DoctorPrescriptionUpload';

const DoctorDashboard = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showPrescriptionUpload, setShowPrescriptionUpload] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/appointments`, {
        headers: { token }
      });
      setAppointments(data.appointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Failed to fetch appointments');
    }
  };

  const handleCompleteAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/complete-appointment`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success('Appointment completed successfully');
        fetchAppointments();
      }
    } catch (error) {
      console.error('Error completing appointment:', error);
      toast.error('Failed to complete appointment');
    }
  };

  const handleUploadPrescription = (appointment) => {
    setSelectedAppointment(appointment);
    setShowPrescriptionUpload(true);
  };

  const handlePrescriptionUploadSuccess = () => {
    fetchAppointments();
  };

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold mb-6">Doctor Dashboard</h1>
      
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div key={appointment._id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{appointment.userData.name}</h3>
                <p className="text-gray-600">Date: {appointment.slotDate}</p>
                <p className="text-gray-600">Time: {appointment.slotTime}</p>
              </div>
              
              <div className="flex gap-2">
                {!appointment.isCompleted && (
                  <button
                    onClick={() => handleCompleteAppointment(appointment._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Complete
                  </button>
                )}
                
                {appointment.isCompleted && !appointment.prescription && (
                  <button
                    onClick={() => handleUploadPrescription(appointment)}
                    className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
                  >
                    Upload Prescription
                  </button>
                )}
                
                {appointment.prescription && (
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">Prescription Uploaded</span>
                    <button
                      onClick={() => handleUploadPrescription(appointment)}
                      className="text-primary hover:text-primary/80"
                    >
                      Update
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showPrescriptionUpload && selectedAppointment && (
        <DoctorPrescriptionUpload
          appointment={selectedAppointment}
          onClose={() => {
            setShowPrescriptionUpload(false);
            setSelectedAppointment(null);
          }}
          onUploadSuccess={handlePrescriptionUploadSuccess}
        />
      )}
    </div>
  );
};

export default DoctorDashboard; 