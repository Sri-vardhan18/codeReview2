import React, { useState } from 'react';
import './App.css';
import FileUpload from './FileUpload';
import CodeBox from './CodeBox';
import CommentSection from './CommentSection';

function App() {
  const [files, setFiles] = useState([]); 
  const [fileIndex, setFileIndex] = useState(null)
 
  const [comments, setComments] = useState({}); 

 
  const handleClick = (i) => {
    setFileIndex(i); 
    
  };

  
  const handleCommentSubmit = (lineIndex, comment) => {
    if (!comments[fileIndex]) {
      setComments((prev) => ({ ...prev, [fileIndex]: [] }));
    }
    setComments((prevComments) => ({
      ...prevComments,
      [fileIndex]: [
        ...prevComments[fileIndex],
        { lineIndex, comment },
      ],
    }));
  }; 

  

  return (
    <div className="container">
      <h2 style={{ textAlign: "center" }}> Code Review</h2>
      <div className="containerbox">
        <div className="sidebar">
          <FileUpload
            files={files}
            setFiles={setFiles}
            handleClick={handleClick}
          />
        </div>

        <div className="main">
          <div>
          <CodeBox file={files[fileIndex]?.content}  />
          </div>
          <div>
          
            <CommentSection
              comments={comments[fileIndex] || []}
              onCommentSubmit={handleCommentSubmit}
              file={files[fileIndex]?.content.split("\n")} 
              
            />
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
