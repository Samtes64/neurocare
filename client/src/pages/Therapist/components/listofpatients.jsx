import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import MditAppointment from "./makeAppoitement"; // Import the EditAppointment component
import AssignTask from "./assignTask"; // Import the AssignTask component
import { getPatientsForTherapist } from "../../../api"; // Import the API function
import { DialogDescription } from "@radix-ui/react-dialog";
import AddAppointment from "./AddAppointment";

export default function ListOfPatients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState([]); // Original list of patients
  const [filteredPatients, setFilteredPatients] = useState([]); // State for filtered patients
  const [selectedPatients, setSelectedPatients] = useState([]); // State to track selected patients
  const [dialogType, setDialogType] = useState(null); // State to track which dialog to show
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("fittrack-app-token");

  useEffect(() => {
    const fetchPatients = async () => {
      if (!token) {
        setError("No authentication token found.");
        setLoading(false);
        return;
      }

      try {
        const response = await getPatientsForTherapist(token);
        setPatients(response.data.data); // Store the original list of patients
        setFilteredPatients(response.data.data); // Initialize filteredPatients
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [token]);

  useEffect(() => {
    // Filter patients based on search term
    const filtered = patients.filter((patient) =>
      patient.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPatients(filtered);
  }, [patients, searchTerm]); // Update filteredPatients whenever patients or searchTerm change

  const handlePatientSelect = (patient) => {
    if (selectedPatients.includes(patient)) {
      setSelectedPatients(selectedPatients.filter((p) => p !== patient));
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="mt-5 max-w-screen-xl mx-auto px-4">
      <div className="bg-blue-200 p-6 rounded-md shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg text-gray-700">Patient List</h3>
          </div>
          <div className="flex space-x-4">
            <button
              className={`bg-blue-500 text-white py-2 px-4 rounded-md text-lg font-medium transition-opacity duration-300 ${
                selectedPatients.length === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => openDialog("appointment")}
              disabled={selectedPatients.length === 0}
            >
              Create Appointment
            </button>
            <button
              className={`border-2 border-white py-2 px-4 rounded-md text-lg font-medium transition-opacity duration-300 ${
                selectedPatients.length === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => openDialog("task")}
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
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 lg:w-64 bg-slate-200"
          />
        </div>
        <div className="mt-4 lg:mt-0 space-x-3">
          <span className="text-gray-600 font-medium">{filteredPatients.length} Patients</span>
          <span className="text-gray-600 font-medium">{selectedPatients.length} selected</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPatients.map((patient) => (
          <div
            key={patient._id}
            className={`border border-gray-300 rounded-md p-4 cursor-pointer transition-colors duration-300 ${
              selectedPatients.includes(patient._id) ? "bg-blue-500 text-white" : "bg-white text-gray-700"
            }`}
            onClick={() => handlePatientSelect(patient._id)}
          >
            <h2 className="text-lg font-semibold">{patient.firstName + " " + patient.lastName}</h2>
            {/* Include other patient details here */}
          </div>
        ))}
      </div>

      <Dialog open={!!dialogType} onOpenChange={closeDialog}>
        <DialogContent>
          <DialogHeader className="bg-blue-200 p-4 rounded-t-md">
            <DialogTitle>
              <div className="flex justify-between">
                <h3 className="font-bold text-lg">
                  {dialogType === "appointment" ? "" : "Assign Task"}
                </h3>
              </div>
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {dialogType === "appointment" && selectedPatients.length > 0 && (
              <AddAppointment patients={selectedPatients} />
            )}
            {dialogType === "task" && selectedPatients.length > 0 && (
              <AssignTask patients={selectedPatients} />
            )}
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}
