import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import styles from './Editor.module.css';
import Editor from '@monaco-editor/react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Ensure it exists (good practice)
if (!API_BASE_URL) {
    console.error("VITE_API_BASE_URL is not defined! API calls will fail.");
}

// Function to calculate passed test cases
const calculatePassedTestCases = (results) => {
    if (!Array.isArray(results)) {
        return "N/A";
    }
    const passed = results.filter(res => res.status === "Accepted").length;
    return `${passed} / ${results.length}`;
};

// --- New Component for the Popup ---
const SubmissionResultPopup = ({ result, onClose }) => {
    // Handle the case where the result is an error object
    const verdict = result.verdict || result.error || "Unknown Error";
    
    // Calculate passed cases only if the full results array exists
    const passedCases = calculatePassedTestCases(result.results);

    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
                <div className={styles.popupHeader}>
                    <h2>Verdict: {verdict} </h2>
                    <button onClick={onClose} className={styles.closeButton}>&times;</button>
                </div>
                
                {/* Display Passed Cases */}
                {result.results && (
                    <p className={styles.popupDetails}>
                        Total Test Cases Passed: 
                        <span className={passedCases !== result.results ? styles.fail : styles.pass}>
                             {passedCases}
                        </span>
                    </p>
                )}
                
                {result.results && result.results.length > 0 && (
                    <div className={styles.testCaseDetails}>
                        <h3>Detailed Results</h3>
                        {/* Map over the results array to display each test case */}
                        {result.results.map((testResult, index) => (
                            <div key={index} className={styles.testCaseItem}>
                                <h4 className={testResult.status === "Accepted" ? styles.pass : styles.fail}>
                                    Test Case #{index + 1}: {testResult.status}
                                </h4>
                                
                                <p><strong>Input:</strong></p>
                                <pre>{testResult.input || 'N/A'}</pre>
                                
                                <p><strong>Expected Output:</strong></p>
                                <pre>{testResult.expected_output || 'N/A'}</pre>
                                
                                {(testResult.status !== "Accepted" && testResult.stdout) && (
                                    <>
                                    <p><strong>Your Output:</strong></p>
                                    <pre className={styles.fail}>{testResult.stdout}</pre>
                                    
                                    </>
                                )}
                                
                                {testResult.error && (
                                    <>
                                    <p><strong>Runtime Error:</strong></p>
                                    <pre className={styles.fail}>{testResult.error}</pre>        
                                    </>
                                )}
                                
                            </div>
                        ))}
                    </div>
                )}

                {/* Display Run Time Error details if applicable (from your screenshot) */}
                {result.status && result.status !== "Accepted" && (
                    <p className={styles.errorDetails}>
                        **Status Detail:** {result.status}
                        <br/>
                        **Line:** {result.runtime_error?.line || 'N/A'}
                    </p>
                )}
                
                {/* Show generic error message if present */}
                {result.error && (
                     <p className={styles.errorDetails}>
                        **Details:** {result.error}
                    </p>
                )}

            </div>
        </div>
    );
};


// --- API call function for submission (no change here) ---
const submitCode = async (submissionData) => {
    const response = await fetch(`${API_BASE_URL}/submit`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include', 
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
    const [submissionResult, setSubmissionResult] = useState(null);

    const mutation = useMutation({
        mutationFn: submitCode,
        onSuccess: (data) => {
            console.log("Submission successful!", data);
            setSubmissionResult(data);
        },
        onError: (error) => {
            console.error("Submission error:", error);
            setSubmissionResult({ verdict: "Submission Failed", error: error.message });
        },
    });

    const closePopup = () => {
        setSubmissionResult(null);
        // Optionally, reset the mutation state when closing the popup
        // mutation.reset(); 
    };

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
                height="calc(100vh - 300px)"
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
                    {mutation.isPending ? 'Submitting...' : 'Submit Code'}
                </button>
            </div>
            {/* --- RENDER THE POPUP CONDITIONALLY --- */}
            {submissionResult && (
                <SubmissionResultPopup 
                    result={submissionResult} 
                    onClose={closePopup} 
                />
            )}
            {/* {mutation.isSuccess && (
                <div className={styles.results}>
                    <h3>Result</h3>
                    <pre>{JSON.stringify(mutation.data, null, 2)}</pre>
                </div>
            )} */}
        </div>
    );
}