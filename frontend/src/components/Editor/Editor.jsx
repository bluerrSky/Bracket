import React, { useState } from "react";
import Editor from "@monaco-editor/react";

export default function CodeEditor() {
  const [code, setCode] = useState("# Write code below 💖");

  const runCode = () => {
    console.log("Running code:", code);
    alert("Pretend this runs your Python code! 🐍");
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Editor
        height="300px"
        defaultLanguage="python"
        value={code}
        onChange={(value) => setCode(value)}
        theme="vs-dark"
      />
      <div style={{ display: "flex", justifyContent: "center", padding: "10px" }}>
        <button onClick={runCode}>▶ Run</button>
        <button style={{ marginLeft: "10px" }}>Submit Answer</button>
      </div>
    </div>
  );
}
