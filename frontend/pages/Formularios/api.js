import axios from 'axios';

//En este archivo colocamos todos los llamados de las apis usando axios, los cuales vamos a importar a la lista de tareas para asi mantener el código más organizado.

const API_BASE_URL = 'http://127.0.0.1:8000/listaTareas/'; // Reemplaza con la URL real de tu API de Django

export async function fetchTareas() {
  try {
    const response = await axios.get(`${API_BASE_URL}get/`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createTarea(data) {
  try {
    const response = await axios.post(`${API_BASE_URL}post/`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateTarea(id, data) {
  try {
    const response = await axios.put(`${API_BASE_URL}put/${id}/`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteTarea(id) {
  try {
    const response = await axios.delete(`${API_BASE_URL}delete/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
}