import React, { useEffect, useState } from 'react';
import { PatientsD } from './patientsData';

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const filteredEvents = PatientsD.filter(event => {
      const endDateTime = new Date(event.end).getTime();
      const currentDateTime = new Date().getTime();
      const remainingTime = endDateTime - currentDateTime;
      const remainingHours = remainingTime / (1000 * 60 * 60);
      return remainingHours < 24 && remainingHours > 0;
    });

    setEvents(filteredEvents);
  }, []);

  const getTimeDifference = (startDate, endDate) => {
    const now = new Date();
    const eventStartDate = new Date(startDate);
    const eventEndDate = new Date(endDate);

    if (now < eventStartDate) {
      const diff = eventStartDate - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours}h ${minutes}m`;
    } else if (now >= eventStartDate && now <= eventEndDate) {
      return "Now";
    } else {
      return null; // Event has ended
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h1 className="text-2xl font-bold text-cyan-600 border-b-2 border-cyan-600 pb-2">Upcoming Events</h1>
      <ul className="mt-4 space-y-4">
        {events.map((event) => {
          const isHappeningNow = new Date(event.start) <= new Date() && new Date() <= new Date(event.end);
          return (
            <li
              key={event.id}
              className={`p-4 flex justify-between items-center rounded-lg shadow-md ${isHappeningNow ? 'bg-blue-500 text-white' : 'bg-gray-50'}`}
            >
              <div>
                <p className="font-semibold text-lg">{event.username}</p>
                <p className="text-sm text-gray-500">{new Date(event.start).toLocaleString()}</p>
                <p className="text-sm text-gray-600">{event.diagnosis}</p>
              </div>
              <div className="text-right">
                {isHappeningNow ? (
                  <span className="inline-block px-3 py-1 bg-red-600 text-white rounded-full text-xs font-medium">Happening Now</span>
                ) : (
                  <span className="text-sm text-gray-700">{getTimeDifference(event.start, event.end)}</span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UpcomingEvents;
