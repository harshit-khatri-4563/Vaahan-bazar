// vehicleApi.js

import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const CREATE_VEHICLE = process.env.NEXT_PUBLIC_CREATE_VEHICLE;
const GET_ALL_VEHICLE = process.env.NEXT_PUBLIC_GET_ALL_VEHICLE;
const GET_VEHICLE = process.env.NEXT_PUBLIC_GET_VEHICLE;
const DELETE_VEHICLE = process.env.NEXT_PUBLIC_DELETE_VEHICLE; 

export const createVehicle = async (payload) => {
  try {
    const response = await axios.post(`${BASE_URL}${CREATE_VEHICLE}`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating vehicle:', error);
    throw error; // Re-throw the error for further handling
  }
};

export const getVehicleById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}${GET_VEHICLE}/${id}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting vehicle by ID:', error);
    throw error;
  }
};

export const getAllVehicle = async () => {
  try {
    const response = await axios.get(`${BASE_URL}${GET_ALL_VEHICLE}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting all vehicles:', error);
    throw error;
  }
};

export const deleteVehicleById = async (id) => {
  try {
    console.log(`${BASE_URL}${DELETE_VEHICLE}/${id}`)
    const response = await axios.delete(`${BASE_URL}${DELETE_VEHICLE}/${id}`);
    console.log(response)
    return response.data; // Assuming the API returns some confirmation message
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    throw error;
  }
};
