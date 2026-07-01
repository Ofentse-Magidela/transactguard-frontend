import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBalance, getUserProfile } from "../service/userService";

function Dashboard() {

  const [profile, setProfile] = useState(null);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

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

  }, [])

  if (loading) return <div>Loading secure account metrics dashboard</div>;

  return (

    <div>
      <h1>TransactGuard Dashboard</h1>
      <h2>Welcome Back, {profile?.username || "User"}!</h2>
      <p>Account Profile ID: #{profile.id}</p>

      <div>
        <h4>Available Balance</h4>
        <p>R {balance.toFixed(2)}</p>
      </div>
    </div>
  );
}
export default Dashboard
