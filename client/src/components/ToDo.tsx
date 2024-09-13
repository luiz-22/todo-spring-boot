import { useState, useEffect } from "react";
import { defaultTasks } from "../services/data";
import { Id, Task } from "../types/types";
import { addTask, toggleDone, deleteTask, deleteCompletedTasks, deleteAllTasks } from "../services/local";
import { getData, addData, deleteData, updateData, deleteCompletedData, deleteAllData } from "../services/api";
import { useAuth } from '../hooks/useAuth';
import TrashIcon from "../assets/TrashIcon";

function ToDo() {
  //const [localTasks, setlocalTasks] = useState<Task[]>(defaultTasks);
  const [localTasks, setlocalTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : defaultTasks;
  });
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [task, setTask] = useState('');
  const { user } = useAuth();

  const fetchData = async () => {
    if (user) {
      const data = await getData(user.id);
      setTasks(data);
    }
  };

  useEffect(() => {
    if (user) {
      setlocalTasks(tasks);
      fetchData();
    } else {
      setTasks(localTasks);
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks, user]);

  const handleAddTask = async () => {
    if (task.trim() === '') {
      alert("The task cannot be empty.");
      return;
    }

    if (user) {
      await addData(task, user.id);
      fetchData();
    } else {
      setTasks(addTask(tasks, task));
    }

    setTask('');
  };

  const handleDeleteTask = async (id: Id) => {
    if (user) {
      await deleteData(id);
      fetchData();
    } else {
      setTasks(deleteTask(tasks, id));
    }
  };

  const handleToggleDone = async (task: Task) => {
    if (user) {
      await updateData(task);
      fetchData();
    } else {
      setTasks(toggleDone(tasks, task.id));
    }
  };

  const handleDeleteCompletedTasks = async () => {
    if (user) {
      await deleteCompletedData(user.id);
      fetchData();
    } else {
      setTasks(deleteCompletedTasks(tasks));
    }
  };

  const handleDeleteAllTasks = async () => {
    if (user) {
      await deleteAllData(user.id);
      fetchData();
    } else {
      setTasks(deleteAllTasks());
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-2">
        <button onClick={handleDeleteCompletedTasks} className="w-full">Clear Completed</button>
        <button onClick={handleDeleteAllTasks} className="w-full">Clear All</button>
      </div>

      <div className="flex items-center space-x-4 mb-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded h-10 bg-[#F4D9D0] placeholder-[#D9ABAB]"
          maxLength={100}
          placeholder="New task"
        />
        <button
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="flex justify-between items-center py-4 border-b border-[#921A40]">
            <span className="text-wrap" style={{ textDecoration: task.done ? 'line-through' : 'none' }}>
              {task.note}
            </span>
            <div className="flex">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => handleToggleDone(task)}
              />
              <div onClick={() => handleDeleteTask(task.id)} className="cursor-pointer">
                <TrashIcon />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDo;
