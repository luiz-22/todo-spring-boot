import axios from 'axios';
import { Id, Task } from "../types/types";

//const BASE_URL = 'http://localhost:8080/tasks';
const BASE_URL = 'https://api-todo-sp-latest.onrender.com';

const api = axios.create({  
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export const getUserInfo = async () => {
    try {
        //const response = await api.get(`http://localhost:8080/user-info`);
        const response = await api.get(`https://api-todo-sp-latest.onrender.com/user-info`);
        return response.data;
    } catch (error) {
        console.error('Error getting user data:', error);
        throw error;
    }
};

export const getData = async (userId: Id) => {
    try {
        const response = await api.get(`${BASE_URL}/${userId}`);    
        return response.data;
    } catch (error) {
        console.error('Error getting task data:', error);
        throw error;
    }
};

export const addData = async (note: string, userId: Id) => {
    try {
        const newTask = { note, userId };
        await api.post(BASE_URL, newTask);
    } catch (error) {
        console.error('Error adding a task:', error);
        throw error;
    }
};

export const deleteData = async (id: Id) => {
    try {
        await api.delete(`${BASE_URL}/${id}`);
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
};

export const updateData = async (task: Task) => {
    try {
        const updateTask = { ...task, done: !task.done };
        await api.put(BASE_URL, updateTask);
    } catch (error) {
        console.error('Error updating a task:', error);
        throw error;
    }
};

export const deleteCompletedData = async (userId: Id) => {
    try {
        await api.delete(`${BASE_URL}/completed/${userId}`);
    } catch (error) {
        console.error('Error deleting completed tasks:', error);
        throw error;
    }
};

export const deleteAllData = async (userId: Id) => {
    try {
        await api.delete(`${BASE_URL}/all/${userId}`);
    } catch (error) {
        console.error('Error deleting tasks:', error);
        throw error;
    }
};