import React, { useState } from 'react';
import { Calendar } from "./ui/calendar";

export default function MditAppointment({ patient }) {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState('');
  const [date, setDate] = useState(new Date());

  const handleSubmit = (event) => {
    event.preventDefault();
    if (endTime <= startTime) {
      setError('End time must be after start time');
    } else {
      setError('');
      alert(`Start Time: ${startTime}, End Time: ${endTime}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="start-time" className="block text-sm font-medium text-gray-700">Start Time</label>
        <input
          type="time"
          id="start-time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="end-time" className="block text-sm font-medium text-gray-700">End Time</label>
        <input
          type="time"
          id="end-time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-1/2">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="mt-1 rounded-md border"
          />
        </div>
        <div className="w-full sm:w-1/2">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4 sm:mt-0"
          >
            Change
          </button>
        </div>
      </div>
    </form>
  );
}
