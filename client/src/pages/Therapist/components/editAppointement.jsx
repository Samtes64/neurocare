import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog"

const EditAppointmentEdit = ({ patient, onSave, isOpen, onClose }) => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (patient) {
      setStart(patient.start || '');
      setEnd(patient.end || '');
      setContent(patient.content || '');
    }
  }, [patient]);

  const handleSave = () => {
    if (patient) {
      const updatedAppointment = { ...patient, start, end, content };
      onSave(updatedAppointment);
    }
  };

  if (!patient) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
        <DialogHeader>
          <DialogTitle>
            <h2 className="text-xl font-bold mb-4">Edit Appointment for {patient.name}</h2>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="start">
              Start Date & Time
            </label>
            <input
              type="datetime-local"
              id="start"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="end">
              End Date & Time
            </label>
            <input
              type="datetime-local"
              id="end"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
              Details
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default EditAppointmentEdit;
