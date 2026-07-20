import { useState } from "react";
import { updateUserProfile } from "../service/userService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


function UpdateUser() {

  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false)

  const { userId } = useAuth();
  const navigate = useNavigate();
  const updateData = { username, email, password };

  const handleSave = async (e) => {
    e.preventDefault();

    if (username === null && email === null && password === null) {
      console.log("Please update at least one field.");
      return;
    }

    setLoading(true)

    try {

      await updateUserProfile(userId, updateData);

      setEmail(null);
      setPassword(null);
      setUsername(null);
      navigate("/dashboard");

    } catch (error) {
      console.error(error.response?.data)
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-6 py-10">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Account Settings
          </h1>

          <p className="mt-2 text-slate-500">
            Update your account information below.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-md">

          <div className="border-b border-slate-200 px-8 py-6">
            <h2 className="text-xl font-semibold text-slate-900">
              Profile Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Leave any field empty if you don't want to change it.
            </p>
          </div>

          <form
            onSubmit={handleSave}
            className="space-y-6 p-8"
          >

            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Username
              </label>

              <input
                disabled={loading}
                type="text"
                placeholder="Choose a username"
                value={username ?? ""}
                onChange={(e) =>
                  setUsername(
                    e.target.value === "" ? null : e.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200 disabled:bg-slate-100"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Email
              </label>

              <input
                disabled={loading}
                type="email"
                placeholder="you@example.com"
                value={email ?? ""}
                onChange={(e) =>
                  setEmail(
                    e.target.value === "" ? null : e.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200 disabled:bg-slate-100"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-slate-700">
                New Password
              </label>

              <input
                disabled={loading}
                type="password"
                placeholder="Enter a new password"
                value={password ?? ""}
                onChange={(e) =>
                  setPassword(
                    e.target.value === "" ? null : e.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200 disabled:bg-slate-100"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
}

export default UpdateUser
