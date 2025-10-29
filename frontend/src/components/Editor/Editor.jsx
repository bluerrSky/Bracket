import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import styles from './Editor.module.css';
// Assuming you are using a code editor like Monaco
import Editor from '@monaco-editor/react'; 

// --- API call function for submission ---
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

export default function CodeEditor({ problemID }) {
    const [code, setCode] = useState("// Write your C++ code here\n\n#include <iostream>\n\nint main() {\n    // Your code goes here\n    return 0;\n}");
    const [languageId, setLanguageId] = useState(54); // Default to C++ (GCC 9.2.0) on Judge0

    // --- TanStack Query Mutation for submitting the code ---
    const mutation = useMutation({
        mutationFn: submitCode,
        onSuccess: (data) => {
            console.log("Submission successful!", data);
            // Here you can display the verdict (e.g., Accepted, Wrong Answer)
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

    return (
        <div className={styles.editorContainer}>
            <div className={styles.controls}>
                 {/* You can add a language selector here if you want */}
                 <span>Language: C++</span>
            </div>
            <Editor
                height="calc(100vh - 150px)" // Adjust height as needed
                defaultLanguage="cpp"
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value)}
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
             {/* Optional: Display results directly in the component */}
             {mutation.isSuccess && (
                <div className={styles.results}>
                    <h3>Result</h3>
                    <pre>{JSON.stringify(mutation.data, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}