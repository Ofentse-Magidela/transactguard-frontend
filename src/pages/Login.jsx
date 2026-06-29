import { useState } from "react";
import { loginUser } from "../service/authService";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleUsernamePassword = async (e) => {
    e.preventDefault();

    const token = await loginUser(username, password);
    localStorage.setItem("token", token);

    const decodedClaims = jwtDecode(token);

    if (decodedClaims && decodedClaims.userId) {
      localStorage.setItem("userId", decodedClaims.userId);
      console.log("Saved userId in browser memory")
    } else {
      console("UserId not valid or is absent")
    }
    console.log("Token saved, authentication secure. Redirecting user");


    setUsername("");
    setPassword("");

    navigate("/dashboard");

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