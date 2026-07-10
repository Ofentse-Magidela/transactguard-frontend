import axios from "axios";
import apiClient from "./apiConfig"

export const getAllFlags = async (token) => {

  try {
    const response = await apiClient.get(`/admin/flags`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const resolveFlags = async (flagId, token) => {

  try {
    const response = await apiClient.put(`/admin/resolve/${flagId}`, null, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Full error: ", error);
    console.error("message: ", error.message)
    throw error;
  }
}