import { useState } from "react";
import "./Login.css";
import { useLogin } from "../../hooks/useLogin.js";
export default function Login() {
  const { login, isPending, error } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log({ email, password });
    login(email, password);
  };
  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Login</h2>
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
      {!isPending && <button className="btn">Login</button>}
      {isPending && (
        <button className="btn" disabled>
          logging in...
        </button>
      )}
      {error && <div className="error">{error}</div>}
    </form>
  );
}
