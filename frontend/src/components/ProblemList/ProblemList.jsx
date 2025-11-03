// components/ProblemList/ProblemList.jsx
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './ProblemList.module.css'; // This will be the new CSS file

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// API function to fetch problems for a specific category
const fetchProblems = async (category) => {
    // This API endpoint is from your backend 'indController.js'
const { data } = await axios.get(
        `${API_BASE_URL}/content/problems/category/${category}`,
        { withCredentials: true } // <-- ADD THIS LINE
    );
    console.log(data);
    return data;
};

export default function ProblemList({ topicName }) {
    // Fetch problems for the *specific* topic
    const { data: problems, isLoading, isError } = useQuery({
        queryKey: ['problems', topicName],
        queryFn: () => fetchProblems(topicName),
        retry: false,
    });

    if (isLoading) {
        return <div className={styles.loading}>Loading problems...</div>;
    }

    if (isError || !problems || problems.message) {
        return (
            <div className={styles.problemListContainer}>
                <h3 className={styles.listTitle}>Practice Problems</h3>
                <div className={styles.error}>
                    {problems?.message || `No problems found for ${topicName}.`}
                </div>
            </div>
        );
    }

    return (
        <div className={styles.problemListContainer}>
            <h3 className={styles.listTitle}>Practice Problems</h3>
            <ul className={styles.list}>
                {problems.map(problem => (
                    <Link 
                            to={`/page/${problem.category}/${problem.problem_id}`} 
                            className={styles.solveButton}
                        >
                    <li key={problem.problem_id} className={problem.solved ? `${styles.solved}` : `${styles.notSolved}`}>
                        <div className={styles.problemInfo}>

                            <span className={styles.title}>{problem.title}</span>
                            <span className={`${styles.difficulty} ${styles[problem.difficulty?.toLowerCase()]}`}>
                                {problem.difficulty}
                            </span>
                        </div>

                    </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
}