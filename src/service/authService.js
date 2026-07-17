import apiClient from "./apiConfig";

export const loginUser = async (username, password) => {

  try {
    const response = await apiClient.post('/auth/login',
      { username, password }
    );
    return response.data;
  } catch (error) {
    console.error("Could not fetch login api: ", error.response?.data);
    throw error;
  }

};

export const registerUser = async (username, email, balance, password) => {
  try {
    const response = await apiClient.post('/auth/register',
      {
        username,
        email,
        balance: parseFloat(balance) || 0,
        password
      }
    );
    return response.data;
  } catch (error) {
    console.error(error.response?.data)
    throw error;
  }
};