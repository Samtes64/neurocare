import React, { useState } from "react";
import Modal from "../components/Modal";

const initialDailyTasks = [
  // { id: 1, task: "Morning Exercise", completed: false, assignedBy: "system" },
  // { id: 2, task: "Read a Book", completed: false, assignedBy: "system" },
];

const initialTherapistTasks = [
  {
    id: 1,
    task: "Attend Therapy Session",
    completed: false,
    assignedBy: "therapist",
  },
  {
    id: 2,
    task: "Complete Homework Assignment",
    completed: false,
    assignedBy: "therapist",
  },
];

const Todos = () => {
  const [dailyTasks, setDailyTasks] = useState(initialDailyTasks);
  const [therapistTasks, setTherapistTasks] = useState(initialTherapistTasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [taskType, setTaskType] = useState("daily");

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleTaskCompletion = (taskType, taskId) => {
    if (taskType === "daily") {
      setDailyTasks(
        dailyTasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      );
    } else {
      setTherapistTasks(
        therapistTasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      );
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r  p-4">
      <h1 className="text-4xl font-bold text-center mb-8 ">
        My Tasks
      </h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 bg-white shadow-lg rounded-lg p-6 border-[1px]">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">
            Daily Tasks
          </h2>
          <ul className="space-y-4">
            {dailyTasks.length === 0 ? (
              <li className="p-4 border rounded-lg bg-blue-100 text-blue-700">
                No daily tasks available.
              </li>
            ) : (
              dailyTasks.map((task) => (
                <li
                  key={task.id}
                  className={`p-4 border rounded-lg cursor-pointer hover:shadow-xl transition-shadow duration-300 ${
                    task.completed ? "bg-green-100 line-through" : "bg-white"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span onClick={() => handleTaskClick(task)}>
                      {task.task}
                    </span>
                    <button
                      onClick={() => handleTaskCompletion("daily", task.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      {task.completed ? "Undo" : "Complete"}
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="flex-1 bg-white shadow-lg rounded-lg p-6 border-[1px]">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">
            Therapist Assigned Tasks
          </h2>
          <ul className="space-y-4">
          {therapistTasks.length === 0 ? (
              <li className="p-4 border rounded-lg bg-blue-100 text-blue-700">
                No assigned Tasks for today
              </li>
            ) : (
              therapistTasks.map(task => (
                <li key={task.id} className={`p-4 border rounded-lg cursor-pointer hover:shadow-xl transition-shadow duration-300 ${task.completed ? 'bg-green-100 line-through' : 'bg-white'}`}>
                  <div className="flex justify-between items-center">
                    <span onClick={() => handleTaskClick(task)}>{task.task}</span>
                    <button
                      onClick={() => handleTaskCompletion('therapist', task.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      {task.completed ? 'Undo' : 'Complete'}
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
      {/* <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">Add New Task</h2>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <input
            type="text"
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            placeholder="New task"
            className="border rounded-lg p-2 flex-1"
          />
          <select
            value={taskType}
            onChange={e => setTaskType(e.target.value)}
            className="border rounded-lg p-2"
          >
            <option value="daily">Daily Task</option>
            <option value="therapist">Therapist Assigned Task</option>
          </select>
          <button
            onClick={handleNewTask}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add Task
          </button>
        </div>
      </div> */}
      {isModalOpen && <Modal task={selectedTask} onClose={handleModalClose} />}
    </div>
  );
};

export default Todos;
