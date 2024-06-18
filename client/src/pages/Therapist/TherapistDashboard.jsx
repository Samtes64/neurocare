import React, { useEffect, useState } from "react";

import { Icon } from "@iconify/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "./components/ui/card";

import EditAppointmentEdit from "./components/editAppointement";
import FeedbackList from "./components/seemorefeedback"; // Assuming FeedbackList component is imported
import UpcomingEvents from "./components/upcoming";
import { Progress } from "./components/ui/progress";

const TherapistDashboard = () => {
  const [progress, setProgress] = useState(13);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showFeedbackList, setShowFeedbackList] = useState(false); // State for showing feedback list

  const patientsList = [
    {
      id: 1,
      name: "John Doe",
      age: 35,
      diagnosis: "Flu",
      taskType1: "Physical Exercises",
      taskType2: "Treatment Plan",
      progress: 70,
      username: "user1",
      start: "2024-05-27T18:00:00",
      end: "2024-05-29T19:35:00",
      content:
        "Provide access to a patient portal where patients can view their records, test results, and appointment schedules.",
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 42,
      diagnosis: "Hypertension",
      taskType1: "Physical Exercises",
      taskType2: "Treatment Plan",
      progress: 40,
      username: "user1",
      start: "2024-05-21T19:00:00",
      end: "2024-05-22T16:00:00",
      content:
        "Provide access to a patient portal where patients can view their records, test results, and appointment schedules.",
    },
    {
      id: 3,
      name: "Zelek Doe",
      age: 32,
      diagnosis: "Fssu",
      taskType1: "Physical Exercises",
      taskType2: "Treatment Plan",
      progress: 74,
      username: "user1",
      start: "2024-05-27T02:00:00",
      end: "2024-05-28T04:00:00",
      content:
        "Provide access to a patient portal where patients can view their records, test results, and appointment schedules.",
    },
    {
      id: 4,
      name: "Lema E",
      age: 31,
      diagnosis: "Fd5",
      taskType1: "Physical Exercises",
      taskType2: "Treatment Plan",
      taskType3: "Treatment",
      progress: 90,
      username: "user1",
      start: "2024-05-28T11:37:00",
      end: "2024-05-28T19:00:00",
      content:
        "Provide access to a patient portal where patients can view their records, test results, and appointment schedules.",
    },
    {
      id: 5,
      name: "Kebed Doe",
      age: 32,
      diagnosis: "Fmu",
      taskType1: "Physical Exercises",
      taskType2: "Treatment Plan",
      progress: 10,
      username: "user1",
      start: "2024-05-07T10:00:00",
      end: "2024-05-01T3:00:00",
      content:
        "Provide access to a patient portal where patients can view their records, test results, and appointment schedules.",
    },
    {
      id: 6,
      name: "Kebed Doe",
      age: 32,
      diagnosis: "Fku",
      taskType1: "Physical Exercises",
      taskType2: "Treatment Plan",
      progress: 40,
      username: "user1",
      start: "2024-05-11T19:00:00",
      end: "2024-05-11T16:00:00",
      content:
        "Provide access to a patient portal where patients can view their records, test results, and appointment schedules.",
    },
    // Add more patient objects here
  ];

  useEffect(() => {
    const timer = setTimeout(() => setProgress(16), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Filter patients based on search term
    const filtered = patientsList.filter((patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPatients(filtered);
  }, [searchTerm, patientsList]);

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    setIsDialogOpen(true);
  };

  const handleSave = (updatedAppointment) => {
    const updatedPatients = patientsList.map((patient) =>
      patient.id === updatedAppointment.id ? updatedAppointment : patient
    );
    console.log("Updated Patients:", updatedPatients);
    setSelectedPatient(null);
    setIsDialogOpen(false);
  };

  const toggleFeedbackList = () => {
    setShowFeedbackList(!showFeedbackList);
  };

  const handleBack = () => {
    setShowFeedbackList(false); // Hide feedback list
  };

  return (
    <div className="my-4 mx-auto max-w-screen-xl px-4">
      <div className="flex flex-wrap p-4 gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="w-[150px] border-blue-400 border-2 shadow-md p-2 rounded">
            <h4 className="text-blue-400 font-light">Number of Patients</h4>
            <h1 className="font-bold">{patientsList.length}</h1>
          </div>
          <div className="w-[180px] border-blue-400 border-2 shadow-md p-2 rounded">
            <h4 className="text-blue-400 font-light">
              Patients Assigned Tasks
            </h4>
            <h1 className="font-bold">7</h1>
          </div>
        </div>
        <div className="p-2 justify-end flex-1 mb:">
          <UpcomingEvents />
        </div>
      </div>
      <div className="flex items-center justify-between mb-4 flex-wrap">
        <div className="flex mt-[25px] space-x-2">
          <h3 className="items-center pt-2">Search patient: </h3>
          <input
            type="text"
            placeholder="Search patient..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 bg-blue-100 max-w-full md:w-[600px]"
          />
        </div>
      </div>
      <div className="flex items-center mb-4 ml-8">
        <Icon className="text-cyan-500 text-4xl" icon="ci:main-component" />
        <h3 className="text-blue-600 ml-2 font-semibold text-lg">
          Progress View of Patients
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPatients.map((item, index) => (
          <Card
            key={index}
            className="w-full p-4 bg-white shadow-md rounded-lg"
          >
            <CardHeader>
              <CardTitle>
                <div className="flex space-x-2">
                  <h5 className="text-gray-400 font-light">Name: </h5>
                  <h3>{item.name}</h3>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex space-x-2">
                <h5 className="text-gray-400 font-light">Task Type: </h5>
                <h3>{item.taskType1}</h3>
              </div>
              <div className="flex space-x-2">
                <h5 className="text-gray-400 font-light">Task Type: </h5>
                <h3>{item.taskType2}</h3>
              </div>
              <div>
                <Progress value={item.progress} />
              </div>
              <div className="flex space-x-2">
                <h5 className="text-gray-400 font-light">Time: </h5>
                <h3>{item.start}</h3>
                <button onClick={() => handleSelectPatient(item)}>
                  <Icon
                    className="text-2xl hover:text-blue-400"
                    icon="uil:edit"
                  />
                </button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <button className="bg-blue-500 text-white font-medium rounded-md shadow-sm hover:bg-blue-400 p-2">
                Send text
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex items-center mb-4 ml-8 mt-8">
        <Icon className="text-cyan-500 text-4xl" icon="ci:main-component" />
        <h3 className="text-blue-600 ml-2 font-semibold text-lg">
          Feedback of Patients
        </h3>
      </div>
      {showFeedbackList ? (
        <FeedbackList patients={patientsList} />
      ) : (
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {patientsList.slice(0, 4).map((item, index) => (
              <Card key={index} className="w-full bg-blue-200 p-4">
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{item.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-end my-4">
            <button
              className="text-blue-500 hover:underline flex items-center space-x-1"
              onClick={toggleFeedbackList}
            >
              <span>See More</span>
              <Icon className="text-xl" icon="ep:right" />
            </button>
          </div>
        </div>
      )}
      {selectedPatient && (
        <EditAppointmentEdit
          patient={selectedPatient}
          onSave={handleSave}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
      {showFeedbackList && (
        <div className="mt-4 ml-8">
          <button
            className="bg-blue-500 text-white font-medium rounded-md shadow-sm hover:bg-blue-400 p-2"
            onClick={handleBack}
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default TherapistDashboard;
