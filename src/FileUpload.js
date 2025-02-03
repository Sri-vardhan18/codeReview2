import React from 'react';

function FileUpload({ files, setFiles, handleClick, fileIndex }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFiles([...files, { content: reader.result, name: file.name }]); 
      };
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      <input
        type="file"
        accept=".txt,.json,.js"
        onChange={handleFileChange}
        multiple
      />
      <ul style={{cursor:'pointer'}}>
        {files.map((file, i) => (
          <li key={i} onClick={() => handleClick(i)} 
          style={{
            backgroundColor: i === fileIndex ? 'rgba(0, 0, 0, 0.8)' : 'transparent', 
            padding: '8px',
            margin: '4px 0',
            borderRadius:'5px', 
            color:i === fileIndex ? 'white' : 'black',
          }}>
            {file.name}
          </li>
        ))}
      </ul>
    </>
  );
}

export default FileUpload;
