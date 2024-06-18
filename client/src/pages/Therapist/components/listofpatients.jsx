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
    <div className='mt-5 max-w-screen-xl mx-auto'>
      <div className='bg-blue-200 p-4 rounded-md '>
        <div className='flex items-center justify-between '>
          <div>
            <h3 className=' font-light text-sm md:font-bold md:text-lg'>Patient List</h3>
          </div>
          <div className="flex space-x-4 mb-4 ">
            <button
              className={`bg-blue-500 text-white p-0 md:p-2 rounded-md text-sm  md:text-lg ${selectedPatients.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => openDialog('appointment')}
              disabled={selectedPatients.length === 0}
            >
              Create Appointment
            </button>
            <button
              className={`  border-white border-2 rounded-md  p-0 md:p-2 text-sm  md:text-lg ${selectedPatients.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => openDialog('task')}
              disabled={selectedPatients.length === 0}
            >
              Assign Task
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
        <div className='flex mt-[12px] mb-4 lg:mb-0'>
          <h3>Search patient: </h3>
          <input
            type="text"
            placeholder="Search patient..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 lg:w-64"
          />
        </div>
        <div className=' space-x-3'>
          <span className="text-gray-600 ">{filteredPatients.length} Patients</span>
          <span className="text-gray-600">{selectedPatients.length} selected</span>

        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPatients.map(patient => (
          <div
            key={patient.id}
            className={`border border-gray-300 rounded-md p-4 cursor-pointer ${selectedPatients.includes(patient) ? 'bg-blue-500 text-white' : ''}`}
            onClick={() => handlePatientSelect(patient)}
          >
            <h2 className="text-lg font-semibold">{patient.name}</h2>
            <p>{patient.age} years old</p>
            <p>{patient.diagnosis}</p>
          </div>
        ))}
      </div>

      <Dialog open={!!dialogType} onOpenChange={closeDialog}>
        <DialogContent>
          <DialogHeader className='bg-blue-200 p-4 rounded-md mt-2'>
            <DialogTitle>
              <div className='flex space-x-32'>
                <div>
                  <h3>{dialogType === 'appointment' ? 'Edit Appointment' : 'Assign Task'}</h3> 
                </div>
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
