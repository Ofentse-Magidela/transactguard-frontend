import axios from "axios";
import apiClient from "./apiConfig";

export const getBalance = async (userId, token) => {
  try {
    const response = await apiClient.get(`/user/balance/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Could not fetch balance: ", error.response?.data);
    throw error;
  }
}

export const getUserProfile = async (userId, token) => {
  try {
    const response = await apiClient.get(`/user/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Could not fetch balance: ", error.response?.data);
    throw error;
  }
}

export const updateUserProfile = async (userId, updateData, token) => {

  try {
    const response = await apiClient.put(`/user/${userId}`, updateData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Could not fetch balance: ", error.response?.data);
    throw error;
  }
}
