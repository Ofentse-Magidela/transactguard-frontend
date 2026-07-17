import apiClient from "./apiConfig";

export const sendMoney = async (userId, receiverId, amount) => {
  try {
    const response = await apiClient.post(`/transact/send`,
      {
        senderID: userId,
        receiverID: receiverId,
        amount: parseFloat(amount) || 0
      }
    );
    return response.data;
  } catch (error) {
    console.log("Backend rejected transaction: ", error.response?.data);
    throw error;
  }
}

export const getTransactionHistory = async (userId) => {
  try {
    const response = await apiClient.get(`/transact/history/${userId}`);

    return response.data;
  } catch (error) {
    console.log("Backend couldn't fetch data");
    throw error;
  }
}