import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getTransactionHistory } from "../service/transactionService";

function Transactions() {

  const [allTransactions, setAllTransactions] = useState({ sent: [], received: [] });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const { userId } = useAuth();

  useEffect(() => {

    const fetchTransactionHistory = async () => {
      try {

        const response = await getTransactionHistory(userId);

        setAllTransactions(response);
        setLoading(false);

      } catch (error) {
        console.error("Failed to fetch transactions: ", error.response?.data);
        setLoading(false);
      }
    }

    fetchTransactionHistory();

  }, [userId]);

  const getDisplayedTransactions = () => {
    if (filter === "sent") return allTransactions.sent;
    if (filter === "received") return allTransactions.received;
    return [...allTransactions.sent, ...allTransactions.received];
  }

  if (loading) return <div>Fetching Your Transaction History</div>

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">

      <div className="max-w-5xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Transaction History
          </h1>

          <p className="mt-2 text-slate-500">
            View your incoming and outgoing transactions.
          </p>
        </div>

        <div className="flex gap-3 mb-8">

          <button
            onClick={() => setFilter("all")}
            className={`px-5 py-2 rounded-xl font-medium transition ${filter === "all"
              ? "bg-blue-600 text-white"
              : "bg-white border border-slate-200 hover:bg-slate-100"
              }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("sent")}
            className={`px-5 py-2 rounded-xl font-medium transition ${filter === "sent"
              ? "bg-blue-600 text-white"
              : "bg-white border border-slate-200 hover:bg-slate-100"
              }`}
          >
            Sent
          </button>

          <button
            onClick={() => setFilter("received")}
            className={`px-5 py-2 rounded-xl font-medium transition ${filter === "received"
              ? "bg-blue-600 text-white"
              : "bg-white border border-slate-200 hover:bg-slate-100"
              }`}
          >
            Received
          </button>

        </div>

        <div className="space-y-4">

          {getDisplayedTransactions().length === 0 ? (

            <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-8 text-center">
              <p className="text-slate-500">
                No transactions found.
              </p>
            </div>

          ) : (

            getDisplayedTransactions().map((transact) => (

              <div
                key={transact.id}
                className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 flex justify-between items-center"
              >

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Transaction #{transact.id}
                  </h2>

                  <p className="text-slate-500 mt-1">
                    {transact.timestamp}
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-lg font-bold text-slate-900">
                    R {Number(transact.amount).toFixed(2)}
                  </p>
                </div>

                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${transact.status === "SUCCESSFUL"
                      ? "bg-green-100 text-green-700"
                      : transact.status === "CANCELED"
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700"
                      }`}
                  >
                    {transact.status}
                  </span>
                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
}
export default Transactions
