import apiClient from "./apiConfig";

export const getBalance = async (userId) => {
  try {
    const response = await apiClient.get(`/user/balance/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Could not fetch balance: ", error.response?.data);
    throw error;
  }
}

export const getUserProfile = async (userId) => {
  try {
    const response = await apiClient.get(`/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Could not fetch balance: ", error.response?.data);
    throw error;
  }
}

export const updateUserProfile = async (userId, updateData) => {

  try {
    const response = await apiClient.put(`/user/${userId}`, updateData);
    return response.data;
  } catch (error) {
    console.error("Could not fetch balance: ", error.response?.data);
    throw error;
  }
}
