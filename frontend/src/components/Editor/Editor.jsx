import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { useMutation } from "@tanstack/react-query";
import styles from "./Editor.module.css";

// This is an asynchronous function that will handle the API call.
// TanStack Query's useMutation hook will call this function.
const submitCodeToBackend = async ({ language, code }) => {
  // Replace this with the actual URL of your backend endpoint
  const API_ENDPOINT = "/api/submit"; 

  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ language, code }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Something went wrong");
  }

  return response.json();
};

export default function CodeEditor() {
  const [code, setCode] = useState("# Write your Python code here\nprint('Hello from the editor!')");

  // --- TanStack Query Mutation ---
  // useMutation handles the entire lifecycle of the POST request.
  const mutation = useMutation({
    mutationFn: submitCodeToBackend,
    onSuccess: (data) => {
      // This function runs if the API call is successful.
      // 'data' is the response from your backend.
      console.log("Submission successful!", data);
      // You could show a success message or the result from the backend here.
    },
    onError: (error) => {
      // This function runs if the API call fails.
      console.error("Submission error:", error.message);
      // You could show an error toast or message here.
    },
  });

  // This function is called when the submit button is clicked.
  const handleSubmit = () => {
    // We call mutation.mutate to trigger the API call.
    // The object passed here will be the argument to 'submitCodeToBackend'.
    mutation.mutate({ language: "python", code: code });
  };
  
  // A simple run function for local testing
  const runCode = () => {
    console.log("Running code locally:", code);
    alert("This is just a local run. Use 'Submit' to send to the backend. 🐍");
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
          fontSize: 16,
          minimap: { enabled: false },
        }}
      />

      {/* Display submission status */}
      <div className={styles.statusContainer}>
        {mutation.isLoading && <p>Submitting...</p>}
        {mutation.isSuccess && <p style={{color: 'green'}}>Submission successful! Check console for data.</p>}
        {mutation.isError && <p style={{color: 'red'}}>Error: {mutation.error.message}</p>}
      </div>

      <div className={styles.editorCtrlBtns}>
        <button onClick={runCode}>▶ Run</button>
        <button 
          onClick={handleSubmit} 
          disabled={mutation.isLoading} // Disable button while submitting
          style={{ marginLeft: "10px" }}
        >
          {mutation.isLoading ? "Submitting..." : "Submit Answer"}
        </button>
      </div>
    </div>
  );
}
