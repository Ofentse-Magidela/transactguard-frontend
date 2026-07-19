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

    setLoading(true);

    const updateData = {};

    if (username !== null) updateData.username = username;
    if (email !== null) updateData.email = email;
    if (password !== null) updateData.password = password;

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
    <div>
      <h1>Update Information</h1>

      <form onSubmit={handleSave}>

        <div>
          <label>Username</label>

          <input
            disabled={loading}
            type="text"
            placeholder="Choose a username"
            value={username ?? ""}
            onChange={(e) => setUsername(e.target.value === "" ? null : e.target.value)}
          />
        </div>

        <div>
          <label>Email</label>

          <input
            disabled={loading}
            type="email"
            placeholder="you@example.com"
            value={email ?? ""}
            onChange={(e) => setEmail(e.target.value === "" ? null : e.target.value)}
          />
        </div>

        <div>
          <label>Password</label>

          <input
            disabled={loading}
            type="password"
            placeholder="Create a password"
            value={password ?? ""}
            onChange={(e) => setPassword(e.target.value === "" ? null : e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  )
}

export default UpdateUser
