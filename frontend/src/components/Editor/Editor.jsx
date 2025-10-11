import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import styles from "./Editor.module.css"
export default function CodeEditor() {
  const [code, setCode] = useState("#Write python code below");

  const runCode = () => {
    console.log("Running code:", code);
    alert("Pretend this runs your Python code! 🐍");
  };

  return (
    <div className={styles.editorContainer}>
      <Editor
        height="70vh"
        defaultLanguage="python"
        value={code}
        onChange={(value) => setCode(value)}
        theme="vs-dark"
        className={styles.editor}
        options={{
          fontSize: 16
        }}
      />
      <div className={styles.editorCtrlBtns}>
        <button onClick={runCode}>▶ Run</button>
        <button style={{ marginLeft: "10px" }}>Submit Answer</button>
      </div>
    </div>
  );
}
