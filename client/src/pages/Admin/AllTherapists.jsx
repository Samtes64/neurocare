import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllTherapists = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:3003/api/therapist/alltherapists');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  return (
    <div className="App h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">List of Patients</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {patients.map((patient) => (
            <div key={patient._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-800">{patient.firstName} {patient.lastName}</h2>
                <p className="text-gray-600 mt-2">{patient.diagnosis || 'No diagnosis'}</p>
              </div>
              {/* Add additional details if needed */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllTherapists;
