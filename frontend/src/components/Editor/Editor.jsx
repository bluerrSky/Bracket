import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import styles from './Editor.module.css';
import Editor from '@monaco-editor/react';

// --- API call function for submission (no change here) ---
const submitCode = async (submissionData) => {
    const response = await fetch("http://localhost:8080/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
    });
    if (!response.ok) {
        throw new Error('Submission failed');
    }
    return response.json();
};

//  Add the new `onCodeChange` prop
export default function CodeEditor({ problemID, onCodeChange }) {
    const [code, setCode] = useState("// Write your C++ code here\n\n#include <iostream>\n\nint main() {\n    // Your code goes here\n    return 0;\n}");
    const [languageId, setLanguageId] = useState(54);

    const mutation = useMutation({
        mutationFn: submitCode,
        onSuccess: (data) => {
            console.log("Submission successful!", data);
            alert(`Verdict: ${data.verdict}`);
        },
        onError: (error) => {
            console.error("Submission error:", error);
            alert(`Error: ${error.message}`);
        },
    });

    const handleSubmit = () => {
        if (!code.trim()) {
            alert("Code cannot be empty!");
            return;
        }
        const submissionData = {
            source_code: code,
            language_id: languageId,
            problem_id: problemID,
        };
         console.log("Submitting data:", submissionData);
        mutation.mutate(submissionData);
    };

    //  This function will now handle both local state and notify the parent
    const handleEditorChange = (value) => {
        setCode(value); // Update the local state for the submit button
        onCodeChange(value); // Call the function passed from the parent (REPL.jsx)
    };

    return (
        <div className={styles.editorContainer}>
            <div className={styles.controls}>
                <span>Language: C++</span>
            </div>
            <Editor
                height="calc(100vh - 150px)"
                defaultLanguage="cpp"
                theme="vs-dark"
                value={code}
                onChange={handleEditorChange} // Use the new handler function
            />
            <div className={styles.submissionControls}>
                <button
                    onClick={handleSubmit}
                    disabled={mutation.isLoading}
                    className={styles.submitButton}
                >
                    {mutation.isLoading ? 'Submitting...' : 'Submit Code'}
                </button>
            </div>
            {mutation.isSuccess && (
                <div className={styles.results}>
                    <h3>Result</h3>
                    <pre>{JSON.stringify(mutation.data, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}