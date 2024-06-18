import React, { useState } from 'react';
import { Icon } from '@iconify/react';
const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleAddTask = () => {
    if (!task || !date || !time) return;
    if (editId !== null) {
      const updatedTasks = tasks.map((t, index) => 
        index === editId ? { task, date, time } : t
      );
      setTasks(updatedTasks);
      setEditId(null);
    } else {
      setTasks([...tasks, { task, date, time }]);
    }
    setTask('');
    setDate('');
    setTime('');
    setIsFormVisible(false);
  };

  const handleEditTask = (index) => {
    setEditId(index);
    setTask(tasks[index].task);
    setDate(tasks[index].date);
    setTime(tasks[index].time);
    setIsFormVisible(true);
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 max-w-lg mx-auto border-cyan-400 border-2 shadow-cyan-700 shadow-md mt-[40px]" >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Todo List</h1>
        {!isFormVisible && (
          <button 
            onClick={() => setIsFormVisible(true)} 
            className="bg-blue-500 text-white p-2 rounded"
          >
            Add Task
          </button>
        )}
      </div>
      {isFormVisible && (
        <div className="mb-4 p-4 border rounded shadow">
          <input 
            type="text" 
            placeholder="Task" 
            value={task} 
            onChange={(e) => setTask(e.target.value)} 
            className="border p-2 rounded w-full mb-2"
          />
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            className="border p-2 rounded w-full mb-2"
          />
          <input 
            type="time" 
            value={time} 
            onChange={(e) => setTime(e.target.value)} 
            className="border p-2 rounded w-full mb-2"
          />
          <button 
            onClick={handleAddTask} 
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            {editId !== null ? 'Edit Task' : 'Add Task'}
          </button>
        </div>
      )}
      {tasks.length === 0 ? (
        <p>No tasks to be done.</p>
      ) : (
        <ul>
          {tasks.map((t, index) => (
            <li key={index} className="flex justify-between items-center mb-2 p-2 border rounded shadow">
              <div>
                <p className="font-bold">{t.task}</p>
                <p>{t.date} {t.time}</p>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleEditTask(index)} 
                  className="bg-yellow-500 text-white p-1 rounded"
                >
                 <Icon icon="tabler:edit" />
                </button>
                <button 
                  onClick={() => handleDeleteTask(index)} 
                  className="bg-red-500 text-white p-1 rounded"
                >
                  <Icon icon="mdi-light:delete" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
