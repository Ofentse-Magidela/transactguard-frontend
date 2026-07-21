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
  const [errorText, setErrorText] = useState({});

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleEmailPassword = async (e) => {
    e.preventDefault();

    setLoading(true)
    setErrorText({})

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
      setErrorText(error.response?.data?.errors || {});

    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">

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
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              autoFocus
              disabled={loading}
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errorText.email) setErrorText(prev => ({ ...prev, email: undefined, form: undefined }))
              }}
              className={`w-full rounded-xl border px-4 py-3 outline-none transition disabled:bg-slate-100 
                ${errorText.email
                  ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                }`
              }
            />

            {errorText.email && (
              <p className="mt-2 text-sm text-red-600">
                {errorText.email}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>

            <input
              disabled={loading}
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (errorText.password) setErrorText(prev => ({ ...prev, password: undefined, form: undefined }))
              }}
              className={`w-full rounded-xl border px-4 py-3 outline-none transition disabled:bg-slate-100 
                ${errorText.password
                  ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                }`
              }
            />

            {errorText.password && (
              <p className="mt-2 text-sm text-red-600">
                {errorText.password}
              </p>
            )}
          </div>

          {errorText.form && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3">
              <p className="text-sm text-red-600">
                {errorText.form}
              </p>
            </div>
          )}

          <button
            disabled={loading}
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-blue-400 disabled:active:scale-100"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            Don't have an account?
            <Link
              to="/register"
              className="ml-1 font-medium text-blue-600 transition hover:underline"
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