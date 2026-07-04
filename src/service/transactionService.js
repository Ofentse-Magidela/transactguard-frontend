import axios from "axios";

export const sendMoney = async (userId, receiverId, amount, token) => {
  try {
    const response = await axios.post(`http://localhost:8080/transact/send`,
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
    const response = await axios.get(`http://localhost:8080/transact/history/${userId}`,
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