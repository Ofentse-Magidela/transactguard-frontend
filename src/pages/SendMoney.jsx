import { useState } from "react"
import { sendMoney } from "../service/transactionService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function SendMoney() {

  const [receiverId, setReceiverId] = useState("");
  const [amount, setAmount] = useState("");

  const navigate = useNavigate();

  const { userId } = useAuth();

  const handleTransaction = async (e) => {
    e.preventDefault();
    try {
      const response = await sendMoney(userId, receiverId, amount);

      setReceiverId("");
      setAmount("");
      navigate("/dashboard");
    } catch (error) {
      console.error(error.response?.data)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center items-center px-4">

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 p-8">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Send Money
          </h1>

          <p className="mt-2 text-slate-500">
            Transfer funds securely to another account.
          </p>
        </div>

        <form onSubmit={handleTransaction} className="space-y-6">

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Receiver ID
            </label>

            <input
              type="number"
              placeholder="Enter receiver's ID"
              value={receiverId}
              onChange={(e) => setReceiverId(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Amount (ZAR)
            </label>

            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
          >
            Send Money
          </button>

        </form>

      </div>

    </div>
  );

}
export default SendMoney