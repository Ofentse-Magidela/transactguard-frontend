import axios from "axios";

export const sendMoney = async (updateData, token) => {
  const response = await axios.post(`http://localhost:8080/transact/send`, updateData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
}