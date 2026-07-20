import { useState } from "react";
import { loginUser } from "../service/authService";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleEmailPassword = async (e) => {
    e.preventDefault();

    setLoading(true)

    try {
      const token = await loginUser(email, password);
      const decodedClaims = jwtDecode(token);

      if (decodedClaims && decodedClaims.userId && decodedClaims.roles) {
        login(token, decodedClaims.userId, decodedClaims.roles);
      }

      setEmail("");
      setPassword("");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-8 border border-slate-200">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            TransactGuard
          </h1>

          <p className="mt-2 text-slate-500">
            Secure Banking & Fraud Detection
          </p>
        </div>

        <form onSubmit={handleEmailPassword} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>

            <input
              disabled={loading}
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>

            <input
              disabled={loading}
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99]"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            Don't have an account?
            <Link
              onClick={() => navigate("/register")}
              className="ml-1 cursor-pointer font-medium text-blue-600 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;