import React from 'react';

function FileUpload({ files, setFiles, handleClick }) {
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
      <ul>
        {files.map((file, i) => (
          <li key={i} onClick={() => handleClick(i)}>
            {file.name}
          </li>
        ))}
      </ul>
    </>
  );
}

export default FileUpload;
