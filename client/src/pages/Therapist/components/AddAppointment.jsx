// AddAppointment.js

import React, { useState } from 'react';
import { createAppointment } from '../../../api';

const AddAppointment = ({ patients }) => {
  const [appointmentDetails, setAppointmentDetails] = useState({
    date: '',
    time: '',
  });

  const token = localStorage.getItem("fittrack-app-token");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const appointmentData={
      appointmentDateTime:appointmentDetails,
      patientIds:patients
    }
    console.log('Form submitted with:', appointmentData);
    const response = await createAppointment(token,appointmentData)
    
    console.log('Task created:', response.data); // Log the response data if needed

    // You can add logic here to send data to API or perform other actions
    // For demonstration, let's clear the form after submission
    setAppointmentDetails({
      date: '',
      time: '',
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAppointmentDetails({
      ...appointmentDetails,
      [name]: value,
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8 max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={appointmentDetails.date}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time:</label>
          <input
            type="time"
            id="time"
            name="time"
            value={appointmentDetails.time}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md text-lg font-medium transition duration-300 ease-in-out mt-4 w-full"
        >
          Create Appointment
        </button>
      </form>
    </div>
  );
};

export default AddAppointment;
