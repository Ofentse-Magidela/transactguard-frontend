import { useState } from "react";
import { registerUser } from "../service/authService";
import { Navigate, useNavigate } from "react-router-dom";

function Register() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [balance, setBalance] = useState(0.00);

  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

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
      console.error(error.response?.data)
    }
  }

  return (

    <div>
      <h2>Account Registration</h2>

      <form onSubmit={handleRegistration}>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div>
          <input
            type="number"
            placeholder="Balance"
            value={balance}
            onChange={e => setBalance(e.target.value)}
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  )
}
export default Register