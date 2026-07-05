import axios from "axios";

export const loginUser = async (username, password) => {

  try {
    const response = await axios.post('http://localhost:8080/auth/login',
      { username, password },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Could not fetch login api: ", error.response?.data);
    throw error;
  }

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
    console.error(error.response?.data)
    throw error;
  }
};