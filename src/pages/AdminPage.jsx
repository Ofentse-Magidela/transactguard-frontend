import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getAllFlags, resolveFlags } from "../service/adminService";

function AdminPage() {
  const [allFlags, setAllFlags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchTransactionFlags = async () => {
      try {
        const response = await getAllFlags();

        setAllFlags(response);
        setLoading(false);

      } catch (error) {
        console.error("Failed to fetch flags: ", error.response?.data);
        setLoading(false);
      }

    }
    fetchTransactionFlags();

  }, [])

  const handleResolve = async (flagId) => {
    try {
      const resolve = await resolveFlags(flagId);
      setAllFlags(allFlags.filter(flag => flag.id !== flagId))

    } catch (error) {
      console.error("Flag was not resolved: ", error.response?.data)
    }

  }

  if (loading) return <div>Fetching Flagged Transactions</div>

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">

      <div className="max-w-5xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Fraud Monitoring
          </h1>

          <p className="mt-2 text-slate-500">
            Review and resolve transactions flagged by the fraud detection engine.
          </p>
        </div>

        {allFlags.length === 0 ? (

          <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-8 text-center">
            <h2 className="text-xl font-semibold text-green-600">
              ✓ No Active Fraud Flags
            </h2>

            <p className="text-slate-500 mt-2">
              All flagged transactions have been reviewed.
            </p>
          </div>

        ) : (

          <div className="space-y-5">

            {allFlags.map((flag) => (

              <div
                key={flag.id}
                className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 flex justify-between items-center"
              >

                <div>

                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-semibold">
                      FLAGGED
                    </span>

                    <span className="text-slate-500">
                      Transaction #{flag.transaction.id}
                    </span>
                  </div>

                  <h2 className="text-lg font-semibold text-slate-900">
                    {flag.reason}
                  </h2>

                  <p className="text-slate-500 mt-2">
                    Amount: <span className="font-medium">
                      R {Number(flag.transaction.amount).toFixed(2)}
                    </span>
                  </p>

                  <p className="text-slate-500">
                    Status: {flag.transaction.status}
                  </p>

                  <p className="text-slate-500">
                    Time: {flag.transaction.timestamp}
                  </p>

                </div>

                <button
                  onClick={() => handleResolve(flag.id)}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-3 rounded-xl transition"
                >
                  Resolve
                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}
export default AdminPage