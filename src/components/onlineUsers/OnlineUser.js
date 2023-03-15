import "./OnlineUser.css";
import React from "react";
import { useCollection } from "../../hooks/useCollection.js";
import Avatar from "../Avatar/Avatar.js";
export default function OnlineUser() {
  const { documents, error } = useCollection("users");
  console.log(documents);
  return (
    <div className="user-list">
      <h2>Users</h2>
      {error && <div className="error">{error}</div>}
      {documents &&
        documents.map((user) => (
          <div className="user-list-item" key={user.id}>
            {user.online && <span className="online-user"></span>}
            <span>{user.displayName}</span>
            <Avatar src={user.photoURL} />
          </div>
        ))}
    </div>
  );
}
