import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function NavigationBar() {
  const { userId, logout, roles } = useAuth();

  return (
    <nav>
      <div>
        <h1>TransactGuard</h1>
      </div>

      <div>
        <Link to="/send">SendMoney</Link>
        <Link to="/transactions">History</Link>
        <Link to="dashboard">Home</Link>
        {roles && roles.includes("ROLE_ADMIN") && <Link to="/admin">Admin</Link>}
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  )
}
export default NavigationBar

