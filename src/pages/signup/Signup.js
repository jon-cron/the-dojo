import { useState } from "react";
import "./Signup.css";
export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password, displayName, thumbnail);
  };
  const handleFileChange = (e) => {
    setThumbnail(null);
    let selected = e.target.files[0];
    console.log(selected);
    if (!selected) {
      setThumbnailError("Please select a file");
      return;
    }
    if (!selected.type.includes("image")) {
      setThumbnailError("Selected file must be a file");
      return;
    }
    if (selected.size > 100000) {
      setThumbnailError("Image size must be less than 100kb");
      return;
    }
    setThumbnailError(null);
    setThumbnail(selected);
    console.log("Thumbnail updated");
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
        <input required type="file" onChange={handleFileChange} />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </label>
      <button className="btn">Sign up</button>
    </form>
  );
}
