import { useState } from "react"
import { loginUser } from "../service/authService";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernamePassword = async (e) => {
    e.preventDefault();
    try {
      const token = await loginUser(username, password);
      localStorage.getItem("token", token);
      console.log("Login successful.Token saved");

      setUsername("");
      setPassword("");

    } catch (err) {

    }
  }

  return (
    <div>
      <h2>Account Login</h2>

      <form onSubmit={handleUsernamePassword}>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)} />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)} />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  )
}
export default Login