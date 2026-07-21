import { useState } from "react";
import { registerUser } from "../service/authService";
import { Link, useNavigate } from "react-router-dom";

function Register() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [balance, setBalance] = useState(0.00);
  const [loading, setLoading] = useState(false)
  const [errorText, setErrorText] = useState({});

  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorText({});

    try {
      const response = await registerUser(username, email, balance, password);

      if (!response) {
        console.log("Something went wrong in registration");
        return;
      }
      setBalance(0);
      setEmail("")
      setPassword("")
      setUsername("")
      navigate("/login")

    } catch (error) {
      setErrorText(error.response?.data?.errors || {});

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Create Account
          </h1>

          <p className="mt-2 text-slate-500">
            Join TransactGuard today.
          </p>
        </div>

        <form
          onSubmit={handleRegistration}
          className="space-y-5"
        >

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Username
            </label>

            <input
              autoFocus
              disabled={loading}
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                if (errorText.username) setErrorText(prev => ({ ...prev, username: undefined }))
              }}
              className={`w-full rounded-xl border px-4 py-3 outline-none transition disabled:bg-slate-100 
                ${errorText.username
                  ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                }`
              }
            />

            {errorText.username && (
              <p className="mt-2 text-sm text-red-600">
                {errorText.username}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              disabled={loading}
              type="text"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errorText.email) setErrorText(prev => ({ ...prev, email: undefined }))
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
              placeholder="Create a password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (errorText.password) setErrorText(prev => ({ ...prev, password: undefined }))
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

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Initial Deposit
            </label>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-medium text-slate-500">
                R
              </span>

              <input
                disabled={loading}
                type="number"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200 disabled:bg-slate-100"
              />

            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            Already have an account?
            <Link
              to="/login"
              className="ml-1 font-medium text-blue-600 transition hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
export default Register