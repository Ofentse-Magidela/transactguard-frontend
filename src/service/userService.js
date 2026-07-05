import axios from "axios";

export const getBalance = async (userId, token) => {
  try {
    const response = await axios.get(`http://localhost:8080/user/balance/${userId}`, {
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
    const response = await axios.get(`http://localhost:8080/user/${userId}`, {
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
    const response = await axios.put(`http://localhost:8080/user/${userId}`, updateData, {
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
