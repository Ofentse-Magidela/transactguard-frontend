import { useState } from "react"
import { sendMoney } from "../service/transactionService";
import { useAuth } from "../context/AuthContext";

function SendMoney() {

  const [receiverId, setReceiverId] = useState("");
  const [amount, setAmount] = useState("");

  const { token, userId } = useAuth();

  const handleTransaction = async (e) => {
    e.preventDefault();
    try {
      const response = await sendMoney(userId, receiverId, amount, token);

      if (!response) {
        console.log("frontend: response not what is expected");
        return;
      }
      setReceiverId("");
      setAmount("");
    } catch (error) {
      console.error(error.response?.data)
    }
  }

  return (
    <div>
      <form onSubmit={handleTransaction}>
        <div>
          <input
            type="number"
            placeholder="Receiver's ID"
            value={receiverId}
            onChange={e => setReceiverId(e.target.value)}
          />
        </div>

        <div>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </div>

        <div>
          <button type="submit">Send</button>
        </div>

      </form>
    </div>
  );

}
export default SendMoney