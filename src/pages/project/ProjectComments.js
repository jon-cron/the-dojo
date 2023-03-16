import React, { useState } from "react";
import Avatar from "../../components/Avatar/Avatar.js";
import { timestamp } from "../../firebase/config.js";
import { useAuthContext } from "../../hooks/useAuthContext.js";
import { useFirestore } from "../../hooks/useFirestore.js";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
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
      <ul>
        {project?.comments?.length > 0 &&
          project.comments.map((c) => (
            <li key={c.id}>
              <div className="comment-author">
                <Avatar src={c.photoURL} />
                <p>{c.displayName}</p>
              </div>
              <div className="comment-date">
                {/* NOTE to reflect dates this way I used an external library. run "npm install date-fns" to do so */}
                <p>
                  {formatDistanceToNow(c.createdAt.toDate(), {
                    addSuffix: true,
                  })}
                </p>
              </div>
              <div className="comment-content">
                <p>{c.content}</p>
              </div>
            </li>
          ))}
      </ul>
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
