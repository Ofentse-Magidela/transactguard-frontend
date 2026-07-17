import apiClient from "./apiConfig"

export const getAllFlags = async () => {

  try {
    const response = await apiClient.get(`/admin/flags`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const resolveFlags = async (flagId) => {

  try {
    const response = await apiClient.put(`/admin/resolve/${flagId}`, null);
    return response.data;
  } catch (error) {
    console.error("Full error: ", error);
    console.error("message: ", error.message)
    throw error;
  }
}