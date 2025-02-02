import React  from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";


function CodeBox({ file }) {


  return (
    <div className="codemirror-container">
      <CodeMirror
        value={file || ""}
        height="400px"
        extensions={[javascript()]}
        readOnly={true}
        basicSetup={{ lineNumbers: true }}
        className="code-editor"
        // editorView={editorRef}
      />
      
      
    </div>
  );
}

export default CodeBox;
