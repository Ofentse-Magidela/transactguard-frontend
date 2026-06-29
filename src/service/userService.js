import axios from "axios";

export const getBalance = async (userId, token) => {
  const response = await axios.get(`http://localhost:8080/user/balance/${userId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
}

export const getUserProfile = async (userId, token) => {
  const response = await axios.get(`http://localhost:8080/user/${userId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
}

export const updateUserProfile = async (userId, updateData, token) => {
  const response = await axios.put(`http://localhost:8080/user/${userId}`, updateData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
}
