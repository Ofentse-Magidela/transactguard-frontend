import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getAllFlags, resolveFlags } from "../service/adminService";

function AdminPage() {
  const [allFlags, setAllFlags] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {

    const fetchTransactionFlags = async () => {
      try {
        console.log("token: ", token)
        const response = await getAllFlags(token);

        setAllFlags(response);
        setLoading(false);

      } catch (error) {
        console.error("Failed to fetch flags: ", error.response?.data);
        setLoading(false);
      }

    }
    fetchTransactionFlags();

  }, [token])

  const handleResolve = async (flagId) => {
    try {
      const resolve = await resolveFlags(flagId, token);
      setAllFlags(allFlags.filter(flag => flag.id !== flagId))

    } catch (error) {
      console.error("Flag was not resolved: ", error.response?.data)
    }

  }

  if (loading) return <div>Fetching Flagged Transactions</div>

  return (
    <div>
      <h1>Flagged Transactions</h1>

      <div>
        {allFlags.map(flag => (
          <div key={flag.id}>
            <p>Reason: {flag.reason}</p>
            <p>Transaction: {flag.transaction.id}</p>
            <button onClick={() => handleResolve(flag.id)}>Resolve</button>
          </div>
        ))}
      </div>

    </div>
  )
}
export default AdminPage