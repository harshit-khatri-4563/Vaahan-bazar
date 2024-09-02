import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const DELETE_USER_ROUTE = process.env.NEXT_PUBLIC_DELETE_USER_ROUTE;
const UPDATE_USER_ROUTE = process.env.NEXT_PUBLIC_UPDATE_USER_ROUTE;
const GET_USER_ROUTE = process.env.NEXT_PUBLIC_GET_USER_ROUTE;
const GET_ALL_USER_ROUTE = process.env.NEXT_PUBLIC_GET_ALL_USER_ROUTE;
const CREATE_USER_ROUTE = process.env.NEXT_PUBLIC_CREATE_USER_ROUTE;


export const createUser = async (payload) => {
  try {
    console.log(payload);
    const response = await axios.post(`${BASE_URL}${CREATE_USER_ROUTE}`, payload , {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error; // Re-throw the error for further handling
  }
};
export const deleteUser = async (clerkId) => {
  try {
    const response = await axios.delete(`${BASE_URL}${DELETE_USER_ROUTE}`, {
      data: { clerkId },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error; // Re-throw the error for further handling
  }
};

export const updateUser = async ( payload) => {
  try {
    console.log(payload);
    const response = await axios.post(`${BASE_URL}${UPDATE_USER_ROUTE}`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error; // Re-throw the error for further handling
  }
};

export const getUser = async (clerkId) => {
  try {
    const response = await axios.get(`${BASE_URL}${GET_USER_ROUTE}/${clerkId}`, {
      params: { clerkId },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error; 
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}${GET_ALL_USER_ROUTE}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting all users:', error);
    throw error; // Re-throw the error for further handling
  }
};
