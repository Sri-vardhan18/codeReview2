import React, { useState } from "react";

function CommentSection({ comments, onCommentSubmit, selectedFile, file }) {
  const [comment, setComment] = useState("");
  const [lineNumber, setLineNumber] = useState(""); 

  const handleCommentSubmit = () => {
    if (comment && selectedFile !== null) {
      onCommentSubmit(parseInt(lineNumber, 10), comment);
      setComment("");
      setLineNumber("");
    }
  };

  return (
    <div className="comment-section">
      <div style={{ width: "100%" }}>
        <input
          type="text"
          style={{ width: "50%", marginRight: "10px", padding: "10px" }}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add comment..."
        />
        <button onClick={handleCommentSubmit} disabled={!file}>
          Add
        </button>
      </div>

      <div className="output">
        {comments.map((comment, i) => (
          <li key={i} className="comment">
            {comment.lineIndex ? (
              <>
                <strong>Line {comment.lineIndex}:</strong> {comment.comment}
              </>
            ) : (
              comment.comment
            )}
          </li>
        ))}
      </div>
    </div>
  );
}

export default CommentSection;
