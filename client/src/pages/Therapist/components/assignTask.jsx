import React, { useState } from 'react';
import { DatePickerWithRange } from "../components/ui/datepicker";

const AssignTask = () => {
  const [taskName, setTaskName] = useState('');
  const [taskType, setTaskType] = useState([]);
  const [taskDuration, setTaskDuration] = useState('fixed');
  const [taskDescription, setTaskDescription] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  const handleTaskTypeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setTaskType([...taskType, value]);
    } else {
      setTaskType(taskType.filter(type => type !== value));
    }
  };

  const handleDurationChange = (e) => {
    setTaskDuration(e.target.value);
    setShowCalendar(e.target.value === 'fixed');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform further actions here, such as submitting the form data
    console.log({
      taskName,
      taskType,
      taskDuration,
      taskDescription
    });
    // Reset form fields
    setTaskName('');
    setTaskType([]);
    setTaskDuration('fixed');
    setTaskDescription('');
    setShowCalendar(false);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="p-4 border border-gray-400 rounded-md max-w-md w-full">
        <h1 className="text-xl font-bold mb-4">Assign Task</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="taskName" className="block font-semibold">Task Name:</label>
            <input
              type="text"
              id="taskName"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 w-full"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Type of Task:</label>
            <div className="flex flex-wrap">
              {/* Checkbox inputs */}
              <label className="mr-4">
                <input
                  type="checkbox"
                  value="Physical exercise"
                  checked={taskType.includes('Physical exercise')}
                  onChange={handleTaskTypeChange}
                  className="mr-1"
                />
                Physical Exercise
              </label>
              <label className="mr-4">
              <input
                type="checkbox"
                value="Self-care"
                checked={taskType.includes('Self-care')}
                onChange={handleTaskTypeChange}
                className="mr-1"
              />
              Self-care
            </label>
            <label className="mr-4">
              <input
                type="checkbox"
                value="Adaptive techniques"
                checked={taskType.includes('Adaptive techniques')}
                onChange={handleTaskTypeChange}
                className="mr-1"
              />
              Adaptive Techniques
            </label>
            <label className="mr-4">
              <input
                type="checkbox"
                value="Lifestyle change"
                checked={taskType.includes('Lifestyle change')}
                onChange={handleTaskTypeChange}
                className="mr-1"
              />
              Lifestyle Change
            </label>
            <label>
              <input
                type="checkbox"
                value="Cognitive therapy"
                checked={taskType.includes('Cognitive therapy')}
                onChange={handleTaskTypeChange}
                className="mr-1"
              />
              Cognitive Therapy
            </label>
              {/* Add other checkbox inputs */}
            </div>
          </div>
          <div>
            <label className="block font-semibold">How Long Does the Task Take:</label>
            <div className="flex flex-wrap">
              {/* Radio inputs */}
              <label className="mr-4">
                <input
                  type="radio"
                  value="fixed"
                  checked={taskDuration === 'fixed'}
                  onChange={handleDurationChange}
                  className="mr-1"
                />
                Fixed
              </label>
              <label>
                <input
                  type="radio"
                  value="lifetime"
                  checked={taskDuration === 'lifetime'}
                  onChange={handleDurationChange}
                  className="mr-1"
                />
                Lifetime
              </label>
            </div>
          </div>
          {showCalendar && (
            <div>
              <DatePickerWithRange />
            </div>
          )}
          <div>
            <label htmlFor="taskDescription" className="block font-semibold">Description:</label>
            <textarea
              id="taskDescription"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 w-full resize-none"
              rows={4}
            />
          </div>
          <div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">Done</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignTask;
