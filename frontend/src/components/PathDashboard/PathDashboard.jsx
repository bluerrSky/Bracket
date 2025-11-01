// components/PathDashboard/PathDashboard.jsx
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './PathDashboard.module.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const generateNewPath = async () => {
    const { data } = await axios.post(`${API_BASE_URL}/generate-path`, {}, {
        withCredentials: true,
    });
    return data;
};

export default function PathDashboard({ path, onPathUpdate }) {
    
    const mutation = useMutation({
        mutationFn: generateNewPath,
        onSuccess: () => {
            onPathUpdate();
        },
        onError: (error) => {
            console.error("Failed to generate new path:", error);
        },
    });

    return (
        <div className={styles.pathContainer}>
            <div className={styles.header}>
                <h2>Your Adaptive Path</h2>
                <button 
                    onClick={() => mutation.mutate()}
                    disabled={mutation.isPending}
                    className={styles.regenButton}
                >
                    {mutation.isPending ? 'Generating...' : 'Suggest New Problems'}
                </button>
            </div>

            <ul className={styles.problemList}>
                {path.map((problem) => (
                    <li key={problem.problem_id} className={styles.problemItem}>
                        <div className={styles.problemInfo}>
                            <span className={`${styles.difficulty} ${styles[problem.difficulty?.toLowerCase()]}`}>
                                {problem.difficulty}
                            </span>
                            {/* This links to your EXISTING tutorial page */}
                            <Link to={`/page/${problem.category}`} className={styles.categoryLink}>
                                Read Tutorial: {problem.category}
                            </Link>
                            <span className={styles.title}>{problem.title}</span>
                        </div>
                        <div className={styles.actions}>
                            <span className={`${styles.status} ${styles[problem.status?.toLowerCase()]}`}>
                                {problem.status}
                            </span>
                            {/* This links to your EXISTING REPL page */}
                            <Link to={`/page/${problem.category}/${problem.problem_id}`} className={styles.solveButton}>
                                Solve
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}