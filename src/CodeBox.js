import React, { useEffect, useRef, useState } from "react";
import { EditorView, Decoration, WidgetType } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { basicSetup } from "codemirror";
import "./App.css";

function CodeBox({ file, handleCommentSubmit }) {
  const editorRef = useRef(null);
  const [popup, setPopup] = useState({
    visible: false,
    line: null,
    comment: "",
  });

  class PlusIconWidget extends WidgetType {
    constructor(line) {
      super();
      this.line = line;
    }

    toDOM(view) {
      let button = document.createElement("span");
      button.textContent = "+";
      button.className = "plus-icon";
      button.onclick = (e) => {
        e.stopPropagation();
        setPopup({ visible: true, line: this.line, comment: "" });
      };
      return button;
    }
  }

  const plusIconPlugin = EditorView.decorations.compute([], (state) => {
    let widgets = [];
    for (let i = 1; i <= state.doc.lines; i++) {
      let deco = Decoration.widget({
        widget: new PlusIconWidget(i),
        side: 1,
      });
      widgets.push(deco.range(state.doc.line(i).to));
    }
    return Decoration.set(widgets);
  });

  useEffect(() => {
    if (editorRef.current) {
      const state = EditorState.create({
        doc: file || "",
        extensions: [
          basicSetup,
          javascript(),
          plusIconPlugin,
          EditorView.editable.of(false),
        ],
      });

      const view = new EditorView({
        state,
        parent: editorRef.current,
      });

      return () => view.destroy();
    }
  }, [file]);

  return (
    <div className="codemirror-container">
      <div ref={editorRef} className="code-editor"></div>

      {popup.visible && (
        <div className="popup">
          <div className="popupbody">
            <textarea
              value={popup.comment} 
              onChange={(e) => setPopup({ ...popup, comment: e.target.value })}
              placeholder={`Comment on line ${popup.line}`} 
              style={{width:'95%', borderRadius:'5px', padding:'5px', margin:'5px', marginTop:'40px'}}
            /> 
            <div style={{display:'flex', flexDirection:'row', gap:'5px', marginLeft:'5px'}}> 

            <button
              onClick={() =>
                setPopup({ visible: false, line: null, comment: "" })
              }
            >
              Close
            </button>
            <button
              onClick={() => {
                handleCommentSubmit(popup.line, popup.comment);
                setPopup({ visible: false, line: null, comment: "" });
              }}
            >
              Add
            </button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}

export default CodeBox;
