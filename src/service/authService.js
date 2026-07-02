import axios from "axios";

export const loginUser = async (username, password) => {

  const response = await axios.post('http://localhost:8080/auth/login',
    { username, password });
  return response.data;

};

export const registerUser = async (username, email, balance, password) => {
  try {
    const response = await axios.post('http://localhost:8080/auth/register',
      {
        username,
        email,
        balance: parseFloat(balance) || 0,
        password
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Service : ", error.response?.data)
    throw error;
  }
};