import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import CodeEditor from "../../components/Editor/Editor";
import ProblemStatement from "../../components/ProblemStatement/ProblemStatement";
import styles from "./REPL.module.css";

// API call function to fetch the hint
const fetchAIHint = async ({ problemId, userCode }) => {
    const { data } = await axios.post('http://localhost:8080/get-hint',
        { problemId, userCode },
        { withCredentials: true }
    );
    return data;
};

const fetchAIResources = async ({ problemId }) => {
    const { data } = await axios.post('http://localhost:8080/get-resources',
        { problemId },
        { withCredentials: true }
    );
    return data;
};

export default function REPL() {
    const { problemID } = useParams();
    const [userCode, setUserCode] = useState(""); // State to hold code from the editor
    const [hint, setHint] = useState("");         // State to hold the AI hint text
    const [resources, setResources] = useState([]);

    const hintMutation = useMutation({
        mutationFn: fetchAIHint,
        onSuccess: (data) => {
            // ✅ INSTEAD of console.log, we now SET THE STATE
            setHint(data.hint);
        },
        onError: (error) => {
            // Also set state on error to display a message
            setHint(error.response?.data?.message || "Could not get a hint right now.");
        },
    });

    const resourcesMutation = useMutation({
        mutationFn: fetchAIResources,
        onSuccess: (data) => {
            setResources(data.resources);
        },
        onError: (error) => {
            // Handle error, maybe set a message
            console.error("Failed to fetch resources:", error);
        },
    });

    const handleGetHint = () => {
        setHint(""); // Clear any previous hint before making a new request
        hintMutation.mutate({ problemId: problemID, userCode });
    };

    const handleGetResources = () => {
        setResources([]); // Clear old resources
        resourcesMutation.mutate({ problemId: problemID });
    };

    return (
        <div className={styles.REPLContainer}>
            <div className={styles.problemDesc}>
                <ProblemStatement problemID={problemID} />
            </div>
            <div className={styles.codeEditor}>
                <CodeEditor problemID={problemID} onCodeChange={setUserCode} />

                {/* --- HINT BUTTON AND DISPLAY AREA --- */}
                <div className={styles.hintContainer}>
                    <button onClick={handleGetHint} disabled={hintMutation.isLoading}>
                        {hintMutation.isLoading ? 'Thinking...' : 'Get a Hint 💡'}
                    </button>

                    {/* This JSX conditionally renders the hint */}
                    {hintMutation.isSuccess && (
                        <p className={styles.hintText}>{hint}</p>
                    )}
                    {hintMutation.isError && (
                        <p className={styles.hintError}>{hint}</p>
                    )}
                </div>
                <div className={styles.resourcesContainer}>
                    <button onClick={handleGetResources} disabled={resourcesMutation.isLoading}>
                        {resourcesMutation.isLoading ? 'Searching...' : 'Suggest Resources 📚'}
                    </button>
                    
                    {resourcesMutation.isSuccess && (
                        <div className={styles.resourcesList}>
                            <h4>Here are some helpful resources:</h4>
                            <ul>
                                {resources.map((resource, index) => (
                                    <li key={index}>
                                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                            {resource.title}
                                        </a>
                                        <p>{resource.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}