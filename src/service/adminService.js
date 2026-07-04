import axios from "axios";
export const getAllFlags = async (token) => {

  try {
    const response = await axios.get(`http://localhost:8080/admin/flags`, {
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
    const response = await axios.put(`http://localhost:8080/admin/resolve/${flagId}`, null, {
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