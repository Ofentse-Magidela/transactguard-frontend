import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBalance, getUserProfile } from "../service/userService";
import { useAuth } from "../context/AuthContext";

function Dashboard() {

  const [profile, setProfile] = useState(null);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { token, userId, logout } = useAuth();

  useEffect(() => {

    if (!token || !userId) {
      navigate("/login");
      return;
    }

    const fetchDashboardData = async () => {

      const [profileData, balanceData] = await Promise.all([
        getUserProfile(userId, token),
        getBalance(userId, token)
      ]);

      setProfile(profileData);
      setBalance(balanceData);
      setLoading(false);
    }

    fetchDashboardData();

  }, [token, userId, navigate])

  const handleDashboardLogout = () => {
    logout();
    navigate("/login");
  }

  if (loading) return <div>Loading secure account metrics dashboard</div>;

  return (

    <div>
      <div>
        <h1>TransactGuard Dashboard</h1>
        <button onClick={handleDashboardLogout}> Logout </button>
      </div>

      <h2>Welcome Back, {profile?.username || "User"}!</h2>
      <p>Account Profile ID: #{profile?.id}</p>
      <p>Available Balance: R {balance ? balance.toFixed(2) : "0.00"}</p>
    </div>
  );
}
export default Dashboard
