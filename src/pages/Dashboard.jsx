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
      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900">
            Welcome back, {profile?.username} 👋
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your account and monitor your finances.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 p-7 text-white shadow-lg">

            <p className="text-blue-100 text-sm uppercase tracking-wide">
              Available Balance
            </p>

            <h2 className="mt-4 text-5xl font-bold">
              R {balance.toFixed(2)}
            </h2>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-md lg:col-span-2">

            <h2 className="mb-6 text-xl font-semibold text-slate-900">
              Account Information
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <p className="text-sm text-slate-500">
                  Username
                </p>

                <p className="mt-1 text-lg font-semibold text-slate-900">
                  {profile?.username}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  User ID
                </p>

                <p className="mt-1 text-lg font-semibold text-slate-900">
                  #{profile?.id}
                </p>
              </div>

              <div className="md:col-span-2">
                <p className="text-sm text-slate-500">
                  Email
                </p>

                <p className="mt-1 text-lg font-semibold text-slate-900 break-all">
                  {profile?.email}
                </p>
              </div>

            </div>

          </div>

        </div>

        <div className="mt-10">

          <h2 className="mb-5 text-xl font-semibold text-slate-900">
            Quick Actions
          </h2>

          <div className="grid gap-5 md:grid-cols-2">

            <button
              onClick={handleTransaction}
              className="rounded-2xl bg-blue-600 p-6 text-left text-white shadow-md transition hover:bg-blue-700 hover:-translate-y-0.5"
            >
              <h3 className="text-lg font-semibold">
                Send Money
              </h3>

              <p className="mt-2 text-sm text-blue-100">
                Transfer funds securely to another account.
              </p>
            </button>

            <button
              onClick={() => navigate("/transactions")}
              className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-md transition hover:bg-slate-100 hover:-translate-y-0.5"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                Transaction History
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Review your recent incoming and outgoing transactions.
              </p>
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}
export default Dashboard
