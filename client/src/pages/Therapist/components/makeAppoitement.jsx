import React, { useState } from 'react';
import axios from 'axios';
import { Calendar } from './ui/calendar';

const MditAppointment = ({ patient }) => {
  // const [startTime, setStartTime] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [error, setError] = useState('');
  const [date, setDate] = useState(new Date());

  const handleSubmit = async (event) => {
    event.preventDefault();
    
      try {
        const response = await axios.post('/api/appointments/create', {
          
          dateTime,
          appointmentDateTime: dateTime, // Convert date to ISO string format
        });

        console.log('Appointment created:', response.data);
        alert('Appointment created successfully!');
      } catch (error) {
        console.error('Error creating appointment:', error);
        alert('Failed to create appointment');
      }
    
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* <div>
        <label htmlFor="start-time" className="block text-sm font-medium text-gray-700">
          Start Time
        </label>
        <input
          type="time"
          id="start-time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div> */}
      <div>
        <label htmlFor="end-time" className="block text-sm font-medium text-gray-700">
          End Time
        </label>
        <input
          type="time"
          id="end-time"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <div className="flex flex-col sm:flex-col">
        <div className="w-full ">
          <Calendar mode="single" selected={date} onSelect={setDate} className="mt-1 rounded-md border" />
        </div>
        <div className="w-full ">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4 sm:mt-0"
          >
            Set
          </button>
        </div>
      </div>
    </form>
  );
};

export default MditAppointment;
