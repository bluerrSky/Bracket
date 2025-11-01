import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import CodeEditor from "../../components/Editor/Editor";
import ProblemStatement from "../../components/ProblemStatement/ProblemStatement";
import styles from "./REPL.module.css";
import { Mirage } from 'ldrs/react'
import 'ldrs/react/Mirage.css'
import RenderMarkdown from '../../components/helper/markdownRenderer';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Ensure it exists (good practice)
if (!API_BASE_URL) {
    console.error("VITE_API_BASE_URL is not defined! API calls will fail.");
}
const Loading = () => (
    <Mirage
        size="20" // Use a small size so it fits well in a button
        speed="2.5"
        color="white" // Use a color that contrasts with your button
    />
);


// API call function to fetch the hint
const fetchAIHint = async ({ problemId, userCode }) => {
    const { data } = await axios.post(`${API_BASE_URL}/get-hint`,
        { problemId, userCode },
        { withCredentials: true }
    );
    return data;
};

const fetchAIResources = async ({ problemId }) => {
    const { data } = await axios.post(`${API_BASE_URL}/get-resources`,
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
            setHint(data.hint);
        },
        onError: (error) => {
            setHint(error.response?.data?.message || "Could not get a hint right now.");
        },
    });

    const resourcesMutation = useMutation({
        mutationFn: fetchAIResources,
        onSuccess: (data) => {
            setResources(data.resources);
        },
        onError: (error) => {
            console.error("Failed to fetch resources:", error);
        },
    });

    const handleGetHint = () => {
        setHint(""); 
        hintMutation.mutate({ problemId: problemID, userCode });
    };

    const handleGetResources = () => {
        setResources([]); 
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
                 <button onClick={handleGetHint} disabled={hintMutation.isPending}>
                        {hintMutation.isPending ? "Getting a hint...": 'Get a Hint 💡'}
                    </button>

                    {hintMutation.isSuccess && (
                        <RenderMarkdown content={hint}/>
                    )}
                    {hintMutation.isError && (
                        <p className={styles.hintError}>{hint}</p>
                    )}
                </div>

                {/* --- RESOURCES BUTTON AND DISPLAY AREA --- */}
                <div className={styles.resourcesContainer}>
                    <button onClick={handleGetResources} disabled={resourcesMutation.isPending}>
                        {resourcesMutation.isPending ? "Suggesting..." : 'Suggest Resources 📚'}
                    </button>
                    
                    {resourcesMutation.isSuccess && (
                        <div className={styles.resourcesList}>
                            <h4>Here are some helpful concepts:</h4>
                            <ul>
                                {/* --- THIS IS THE FIX --- */}
                                {resources.map((resource) => {
                                    // 1. Create a URL-safe search query
                                    const searchQuery = encodeURIComponent(`${resource.concept} tutorial`);
                                    
                                    // 2. Create the Google search URL
                                    const googleSearchUrl = `https://www.google.com/search?q=${searchQuery}`;

                                    return (
                                        // 3. Use the new "concept" as the key
                                        <li key={resource.concept}>
                                            {/* 4. Link to Google search instead of a fake URL */}
                                            <a href={googleSearchUrl} target="_blank" rel="noopener noreferrer">
                                                <strong>Learn about: {resource.concept}</strong>
                                            </a>
                                            {/* 5. Render the description (this was already correct) */}
                                            <p>{resource.description}</p>
                                        </li>
                                    );
                                })}
                                {/* --- END OF FIX --- */}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}