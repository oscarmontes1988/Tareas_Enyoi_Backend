import axios from 'axios';

const API_BASE = 'http://localhost:8000/gestor_tareas/api/v1/gestor_tareas';

// Obtener todas las tareas
export const getAllTasks = () =>
  axios.get(`${API_BASE}/`, {
    headers: { 'Content-Type': 'application/json' }
  });

// Crear una nueva tarea
export const createTask = (task) =>
  axios.post(`${API_BASE}/`, task, {
    headers: { 'Content-Type': 'application/json' }
  });

// Obtener una tarea por ID
export const getTaskById = (taskId) =>
  axios.get(`${API_BASE}/${taskId}/`, {
    headers: { 'Content-Type': 'application/json' }
  });

// Actualizar una tarea
export const updateTask = (taskId, task) =>
  axios.put(`${API_BASE}/${taskId}/`, task, {
    headers: { 'Content-Type': 'application/json' }
  });

// Eliminar una tarea
export const deleteTask = (taskId) =>
  axios.delete(`${API_BASE}/${taskId}/`, {
    headers: { 'Content-Type': 'application/json' }
  });
