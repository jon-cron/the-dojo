import { useState } from "react";
import "./Login.css";
import { useLogin } from "../../hooks/useLogin.js";
export default function Login() {
  const { login, isPending } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };
  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Sign up</h2>
      <label>
        <span>Email</span>
        <input
          required
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        <span>Password</span>
        <input
          required
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      {!isPending && <button className="btn">Sign up</button>}
      {isPending && (
        <button className="btn" disabled>
          loading...
        </button>
      )}
    </form>
  );
}
