import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function NavigationBar() {
  const { userId, logout, roles } = useAuth();

  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        <h1 className="text-2xl font-bold text-blue-600">
          TransactGuard
        </h1>

        <div className="flex items-center gap-6">

          <Link
            to="/dashboard"
            className="text-slate-600 hover:text-blue-600 font-medium transition"
          >
            Dashboard
          </Link>

          <Link
            to="/send"
            className="text-slate-600 hover:text-blue-600 font-medium transition"
          >
            Send Money
          </Link>

          <Link
            to="/transactions"
            className="text-slate-600 hover:text-blue-600 font-medium transition"
          >
            History
          </Link>

          {roles && roles.includes("ROLE_ADMIN") && (
            <Link
              to="/admin"
              className="text-slate-600 hover:text-blue-600 font-medium transition"
            >
              Admin
            </Link>
          )}

          <button
            onClick={logout}
            className="ml-4 rounded-xl bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600 transition"
          >
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
}
export default NavigationBar

