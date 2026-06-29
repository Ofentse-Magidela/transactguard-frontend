import axios from "axios";

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post('http://localhost:8080/auth/login', { username, password });

    return response.data;
  } catch (error) {
    throw error;
  }
};