import React, { useState } from "react";
import { timestamp } from "../../firebase/config.js";
import { useAuthContext } from "../../hooks/useAuthContext.js";
import { useFirestore } from "../../hooks/useFirestore.js";
export default function ProjectComments({ project }) {
  const { updateDocument, response } = useFirestore("projects");
  const [newComment, setNewComment] = useState("");
  const { user } = useAuthContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.floor(Math.random() * 100000),
    };
    await updateDocument(project.id, {
      comments: [...project.comments, commentToAdd],
    });
    if (!response.error) {
      setNewComment("");
    }
  };
  return (
    <div className="project-comments">
      <h4>Project Comments</h4>
      <form onSubmit={handleSubmit} className="add-comment">
        <label>
          <span>Add Comment</span>
          <textarea
            required
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
            value={newComment}
          />
        </label>
        <button className="btn">Comment</button>
      </form>
    </div>
  );
}
