import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { getAssignedTasksForPatient } from "../api";

const initialDailyTasks = [
  // { id: 1, task: "Morning Exercise", completed: false, assignedBy: "system" },
  // { id: 2, task: "Read a Book", completed: false, assignedBy: "system" },
];

const Todos = () => {
  const [dailyTasks, setDailyTasks] = useState(initialDailyTasks);
  const [therapistTasks, setTherapistTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const token = localStorage.getItem("fittrack-app-token");

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

  const refreshTasks = async () => {
    try {
      const response = await getAssignedTasksForPatient(token);
      setTherapistTasks(response.data);
    } catch (error) {
      console.error("Error fetching therapist assigned tasks:", error);
    }
  };

  useEffect(() => {
    refreshTasks();
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-r p-4">
      <h1 className="text-4xl font-bold text-center mb-8">My Tasks</h1>
      {successMessage && (
        <div className="text-center mb-4 text-green-500 font-semibold">
          {successMessage}
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 bg-white shadow-lg rounded-lg p-6 border-[1px]">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Daily Tasks</h2>
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
                    <span
                      onClick={() => !task.completed && handleTaskClick(task)}
                    >
                      {task.task}
                    </span>
                    <button
                      onClick={() => handleTaskCompletion("daily", task.id)}
                      className="text-blue-500 hover:text-blue-700"
                      disabled={task.completed}
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
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Therapist Assigned Tasks</h2>
          <ul className="space-y-4">
            {therapistTasks.length === 0 ? (
              <li className="p-4 border rounded-lg bg-blue-100 text-blue-700">
                No assigned tasks for today.
              </li>
            ) : (
              therapistTasks.map((task) => (
                <li
                  key={task._id}
                  className={`p-4 border rounded-lg cursor-pointer hover:shadow-xl transition-shadow duration-300 ${
                    task.status === "Completed" ? "bg-green-100 line-through" : "bg-white"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span
                      onClick={() =>
                        task.status !== "Completed" && handleTaskClick(task)
                      }
                    >
                      {task.treatment.treatmentName}
                    </span>
                    <button
                      onClick={() => handleTaskCompletion("therapist", task._id)}
                      className="text-blue-500 hover:text-blue-700"
                      disabled={task.status === "Completed"}
                    >
                      {task.status === "Completed" ? "Completed" : "Not Completed"}
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          task={selectedTask}
          onClose={handleModalClose}
          onTaskCompleted={() => {
            refreshTasks();
            setSuccessMessage("Task completed successfully!");
            setTimeout(() => setSuccessMessage(""), 3000); // Hide success message after 3 seconds
          }}
        />
      )}
    </div>
  );
};

export default Todos;
