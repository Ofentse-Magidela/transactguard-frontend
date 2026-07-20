import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBalance, getUserProfile } from "../service/userService";
import { useAuth } from "../context/AuthContext";

function Dashboard() {

  const [profile, setProfile] = useState(null);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { userId } = useAuth();

  useEffect(() => {

    const fetchDashboardData = async () => {

      const [profileData, balanceData] = await Promise.all([
        getUserProfile(userId),
        getBalance(userId)
      ]);

      setProfile(profileData);
      setBalance(balanceData);
      setLoading(false);
    }

    fetchDashboardData();

  }, [userId])

  const handleTransaction = () => {
    navigate("/send")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-6xl mx-auto p-8 animate-pulse">

          <div className="mb-8">
            <div className="h-9 w-80 rounded bg-slate-200"></div>
            <div className="mt-3 h-5 w-56 rounded bg-slate-200"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
              <div className="h-4 w-28 rounded bg-slate-200"></div>
              <div className="mt-4 h-10 w-40 rounded bg-slate-200"></div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
              <div className="h-5 w-40 rounded bg-slate-200 mb-5"></div>

              <div className="space-y-4">
                <div className="h-4 w-60 rounded bg-slate-200"></div>
                <div className="h-4 w-40 rounded bg-slate-200"></div>
                <div className="h-4 w-72 rounded bg-slate-200"></div>
              </div>
            </div>

          </div>

          <div className="mb-4">
            <div className="h-7 w-40 rounded bg-slate-200"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="h-16 rounded-xl bg-slate-200"></div>
            <div className="h-16 rounded-xl bg-slate-200"></div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      <div className="max-w-6xl mx-auto p-8">

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            Welcome Back, {profile?.username} 👋
          </h2>

          <p className="text-slate-500 mt-2">
            Here's an overview of your account.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">

          <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6">
            <p className="text-slate-500 text-sm">
              Current Balance
            </p>

            <h2 className="text-4xl font-bold text-blue-600 mt-3">
              R {balance.toFixed(2)}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6">

            <h3 className="font-semibold text-slate-900 mb-4">
              Account Information
            </h3>

            <p className="text-slate-600">
              Username: <span className="font-medium">{profile?.username}</span>
            </p>

            <p className="text-slate-600 mt-2">
              User ID: #{profile?.id}
            </p>

            <p className="text-slate-600 mt-2">
              Email: {profile?.email}
            </p>

          </div>

        </div>

        <h3 className="text-xl font-semibold text-slate-900 mb-4">
          Quick Actions
        </h3>

        <div className="grid md:grid-cols-3 gap-4">

          <button
            onClick={handleTransaction}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-5 font-semibold transition"
          >
            Send Money
          </button>

          <button
            onClick={() => navigate("/transactions")}
            className="bg-white border border-slate-200 rounded-xl p-5 hover:bg-slate-100 transition"
          >
            View Transactions
          </button>

        </div>

      </div>

    </div>
  );
}
export default Dashboard
