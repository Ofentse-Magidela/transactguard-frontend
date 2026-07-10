import axios from "axios";
import apiClient from "./apiConfig";

export const sendMoney = async (userId, receiverId, amount, token) => {
  try {
    const response = await apiClient.post(`/transact/send`,
      {
        senderID: userId,
        receiverID: receiverId,
        amount: parseFloat(amount) || 0
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.log("Backend rejected transaction: ", error.response?.data);
    throw error;
  }
}

export const getTransactionHistory = async (userId, token) => {
  try {
    const response = await apiClient.get(`/transact/history/${userId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );

    return response.data;
  } catch (error) {
    console.log("Backend couldn't fetch data");
    throw error;
  }
}