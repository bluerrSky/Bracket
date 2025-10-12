import { useQuery } from "@tanstack/react-query";
import RenderMarkdown from "../helper/markdownRenderer";
import styles from "./ProblemStatement.module.css";

// --- API fetching function ---
const fetchProblem = async (problemID) => {
    const response = await fetch(`http://localhost:8080/problems/${problemID}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

// --- Accept problemID as a prop ---
export default function ProblemStatement({ problemID }) {
    // --- Use TanStack Query to fetch data ---
    const { data: problem, isLoading, isError, error } = useQuery({
        queryKey: ['problem', problemID], // A unique key for this query
        queryFn: () => fetchProblem(problemID),
        enabled: !!problemID, // Only run the query if problemID exists
    });

    if (isLoading) {
        return <div className={styles.probStatementContainer}>Loading problem...</div>;
    }

    if (isError) {
        return <div className={styles.probStatementContainer}>Error: {error.message}</div>;
    }

    // --- Render the fetched problem ---
    return (
        <div className={styles.probStatementContainer}>
            <h2 className={styles.probTitle}>{problem?.title}</h2>
            <div className={styles.meta}>
                <span>Difficulty: {problem?.difficulty}</span>
                <span>Time Limit: {problem?.time_limit}s</span>
                <span>Memory Limit: {problem?.memory_limit / 1024} MB</span>
            </div>
            <RenderMarkdown content={problem?.description || ''} />
        </div>
    );
}