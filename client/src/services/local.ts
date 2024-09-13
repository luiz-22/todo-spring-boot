import { Task, Id } from "../types/types";
import { v4 as uuidv4 } from 'uuid';

export const addTask = (tasks: Task[], note: string): Task[] => {
  const newTask: Task = {
    id: uuidv4(),
    note,
    done: false,
  };
  return [...tasks, newTask];
};

export const toggleDone = (tasks: Task[], id: Id): Task[] => {
  return tasks.map((task) =>
    task.id === id ? { ...task, done: !task.done } : task
  );
};

export const deleteTask = (tasks: Task[], id: Id): Task[] => {
  return tasks.filter((task) => task.id !== id);
};

export const deleteCompletedTasks = (tasks: Task[]): Task[] => {
  return tasks.filter((task) => !task.done);
};

export const deleteAllTasks = (): Task[] => {
  return [];
};
