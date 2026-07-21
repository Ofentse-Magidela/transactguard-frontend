import { useState, useRef } from "react"
import { sendMoney } from "../service/transactionService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function SendMoney() {

  const [receiverId, setReceiverId] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorText, setErrorText] = useState({})
  const redirectTimeout = useRef(null);

  const navigate = useNavigate();

  const { userId } = useAuth();

  const handleTransaction = async (e) => {
    e.preventDefault();
    setErrorText({});

    setLoading(true)
    try {
      await sendMoney(userId, receiverId, amount);

      setSuccess(true);

      setReceiverId("");
      setAmount("");

      redirectTimeout.current = setTimeout(() => {
        navigate("/dashboard");
      }, 5000);
    } catch (error) {
      setErrorText(error.response?.data?.errors || {});
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-6 py-10">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Transfer Money
          </h1>

          <p className="mt-2 text-slate-500">
            Send funds securely to another TransactGuard account.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-md">

          <div className="border-b border-slate-200 px-8 py-6">
            <h2 className="text-xl font-semibold text-slate-900">
              New Transfer
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Double-check the recipient ID and transfer amount before submitting.
            </p>
          </div>

          {success ? (
            <div className="p-10 text-center">

              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <span className="text-3xl">✅</span>
              </div>

              <h2 className="text-2xl font-bold text-slate-900">
                Money Sent Successfully
              </h2>

              <p className="mt-2 text-slate-500">
                Your transfer has been completed successfully.
              </p>

              <p className="mt-6 text-sm text-slate-400">
                Redirecting to your dashboard...
              </p>

              <button
                onClick={() => {
                  clearTimeout(redirectTimeout.current);
                  setSuccess(false)
                }}
                className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Stay On Page
              </button>

            </div>
          ) : (
            <form
              onSubmit={handleTransaction}
              className="space-y-6 p-8"
            >

              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Recipient ID
                </label>

                <input
                  disabled={loading}
                  type="number"
                  placeholder="Enter recipient ID"
                  value={receiverId}
                  onChange={(e) => {
                    setReceiverId(e.target.value);
                    if (errorText.receiverID) setErrorText(prev => ({ ...prev, receiverID: undefined }))
                  }}
                  className={`w-full rounded-xl border px-4 py-3 outline-none transition disabled:bg-slate-100 
                    ${errorText.receiverID
                      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                    }`
                  }
                />

                {errorText.receiverID && (
                  <p className="mt-2 text-sm text-red-600">
                    {errorText.receiverID}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Transfer Amount (ZAR)
                </label>

                <div className="relative">
                  <span className="absolute left-4 inset-y-0 flex items-center text-slate-500 font-medium">
                    R
                  </span>

                  <input
                    disabled={loading}
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      if (errorText.amount) setErrorText(prev => ({ ...prev, amount: undefined }))
                    }}
                    className={`w-full rounded-xl border pl-10 pr-4 py-3 outline-none transition disabled:bg-slate-100 
                      ${errorText.amount
                        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                        : "border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                      }`
                    }
                  />
                </div>
                {errorText.amount && (
                  <p className="mt-2 text-sm text-red-600">
                    {errorText.amount}
                  </p>
                )}
              </div>

              <div className="rounded-xl bg-slate-100 p-4">
                <p className="text-sm text-slate-600">
                  Transfers are processed immediately. Ensure the recipient ID is
                  correct before sending funds.
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  disabled={loading}
                  type="submit"
                  className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
                >
                  {loading ? "Sending..." : "Send Money"}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );

}
export default SendMoney