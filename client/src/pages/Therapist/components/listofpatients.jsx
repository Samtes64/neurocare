import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import MditAppointment from './makeAppoitement';// Import the EditAppointment component
import AssignTask from './assignTask'; // Import the AssignTask component
import { PatientsD } from './patientsData';
export default function ListOfPatients() {
 

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPatients, setFilteredPatients] = useState(PatientsD); // Initialize with all patients
  const [selectedPatients, setSelectedPatients] = useState([]); // State to track selected patients
  const [dialogType, setDialogType] = useState(null); // State to track which dialog to show

  useEffect(() => {
    // Filter patients based on search term
    const filtered = PatientsD.filter(patient =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPatients(filtered);
  }, [searchTerm]); // Only depend on searchTerm

  const handlePatientSelect = (patient) => {
    if (selectedPatients.includes(patient)) {
      setSelectedPatients(selectedPatients.filter(p => p !== patient));
    } else {
      setSelectedPatients([...selectedPatients, patient]);
    }
  };

  const openDialog = (type) => {
    setDialogType(type);
  };

  const closeDialog = () => {
    setDialogType(null);
  };

  return (
    <div className="mt-5 max-w-screen-xl mx-auto px-4">
      <div className="bg-blue-200 p-6 rounded-md shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg text-gray-700">Patient List</h3>
          </div>
          <div className="flex space-x-4">
            <button
              className={`bg-blue-500 text-white py-2 px-4 rounded-md text-lg font-medium transition-opacity duration-300 ${selectedPatients.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => openDialog('appointment')}
              disabled={selectedPatients.length === 0}
            >
              Create Appointment
            </button>
            <button
              className={`border-2 border-white py-2 px-4 rounded-md text-lg font-medium transition-opacity duration-300 ${selectedPatients.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => openDialog('task')}
              disabled={selectedPatients.length === 0}
            >
              Assign Task
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between my-6">
        <div className="flex items-center space-x-2">
          <h3 className="text-gray-700 font-medium">Search patient:</h3>
          <input
            type="text"
            placeholder="Search patient..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 lg:w-64"
          />
        </div>
        <div className="mt-4 lg:mt-0 space-x-3">
          <span className="text-gray-600 font-medium">{filteredPatients.length} Patients</span>
          <span className="text-gray-600 font-medium">{selectedPatients.length} selected</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPatients.map(patient => (
          <div
            key={patient.id}
            className={`border border-gray-300 rounded-md p-4 cursor-pointer transition-colors duration-300 ${selectedPatients.includes(patient) ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
            onClick={() => handlePatientSelect(patient)}
          >
            <h2 className="text-lg font-semibold">{patient.name}</h2>
            <p className="text-sm">{patient.age} years old</p>
            <p className="text-sm">{patient.diagnosis}</p>
          </div>
        ))}
      </div>

      <Dialog open={!!dialogType} onOpenChange={closeDialog}>
        <DialogContent>
          <DialogHeader className="bg-blue-200 p-4 rounded-t-md">
            <DialogTitle>
              <div className="flex justify-between">
                <h3 className="font-bold text-lg">{dialogType === 'appointment' ? 'Edit Appointment' : 'Assign Task'}</h3>
              </div>
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {dialogType === 'appointment' && selectedPatients.length > 0 && (
              <MditAppointment patients={selectedPatients} />
            )}
            {dialogType === 'task' && selectedPatients.length > 0 && (
              <AssignTask patients={selectedPatients} />
            )}
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}
