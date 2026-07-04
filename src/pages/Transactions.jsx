import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getTransactionHistory } from "../service/transactionService";

function Transactions() {

  const [allTransactions, setAllTransactions] = useState({ sent: [], received: [] });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const { token, userId } = useAuth();

  useEffect(() => {

    const fetchTransactionHistory = async () => {
      try {

        const response = await getTransactionHistory(userId, token);

        if (!response) {
          console.log("Corrupted response");
          return;
        }
        setAllTransactions(response);
        setLoading(false);


      } catch (error) {
        console.error("Failed to fetch transactions: ", error.response?.data);
        setLoading(false);
      }
    }

    fetchTransactionHistory();

  }, [userId, token]);

  const getDisplayedTransactions = () => {
    if (filter === "sent") return allTransactions.sent;
    if (filter === "received") return allTransactions.received;
    return [...allTransactions.sent, ...allTransactions.received];
  }

  if (loading) return <div>Fetching Your Transaction History</div>

  return (
    <div>
      <h1>Transaction History</h1>

      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("sent")}>Sent</button>
        <button onClick={() => setFilter("received")}>Received</button>
      </div>

      <div>
        {getDisplayedTransactions().map(transact => (
          <div key={transact.id}>
            <p>Amount: R{transact.amount}</p>
            <p>Status: {transact.status}</p>
            <p>Date: {transact.timestamp}</p>
          </div>
        ))}
      </div>

    </div>
  )
}
export default Transactions
