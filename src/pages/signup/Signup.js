import { useState } from "react";
import "./Signup.css";
export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password, displayName);
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
      <label>
        <span>Display Name</span>
        <input
          required
          value={displayName}
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </label>
      <label>
        <span>Profile Image</span>
        <input required type="file" />
      </label>
      <button className="btn">Sign up</button>
    </form>
  );
}
