
import React, { useState } from 'react';
function CommentSection({ comments, onCommentSubmit, selectedFile, file }) {
  const [comment, setComment] = useState(""); 
  console.log(selectedFile,"select")

  const handleCommentSubmit = () => {
    if (comment && selectedFile !== null) {
      onCommentSubmit(selectedFile, comment);  
      setComment(""); 
    }
  };

  return (
    <div className="comment-section">
      <div style={{width:'100%' }}>
  
        <input
          type="text"
          style={{width:'80%', marginRight:'10px', padding:'10px' }}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add comment..."
           
        /> 
        <button onClick={handleCommentSubmit} disabled={!file}>Add</button>
      </div>

      <div className="output">
        
        {comments
          .filter((comment) => comment.fileIndex === selectedFile) 
          .map((comment, i) => (
            <li key={i} className="comment">
              {comment.comment}
            </li>
          ))}
      </div>
    </div>
  );
} 

export default CommentSection