import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Ensure it exists (good practice)
if (!API_BASE_URL) {
    console.error("VITE_API_BASE_URL is not defined! API calls will fail.");
}
// --- API fetching function ---
const fetchProblems = async (category) => {
    const response = await fetch(`${API_BASE_URL}/problems/category/${category}`);
    console.log(response);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export default function ProblemList() {
    // Get pageName from URL to use as the category. E.g. "Dynamic Programming"
    const { pageName } = useParams(); 

    const { data: problems, isLoading, isError, error } = useQuery({
        queryKey: ['problems', pageName],
        queryFn: () => fetchProblems("Dynamic Programming"),
        enabled: !!pageName,
    });

    const styles = `
        .problemListContainer {

            margin-top: 2rem;
            background-color: #1a1a1a;
            border: 1px solid #333;
            border-radius: 8px;
            padding: 1.5rem;
        }
        .problemListTitle {
            font-size: 1.75rem;
            font-family: var(--ff-heading);
            color: #fff;
            margin-bottom: 1.5rem;
            border-bottom: 2px solid #007ACC;
            padding-bottom: 0.5rem;
        }
        .problemList {
            list-style: none;
            padding: 0;
            font-family: var(--ff-content);
            margin: 0;
        }
        .problemItem {
            background-color: #252526;
            margin-bottom: 1rem;
            border-radius: 6px;
            transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }
        .problemItem:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 15px rgba(0, 122, 204, 0.2);
        }
        .problemLink {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 1.5rem;
            text-decoration: none;
            color: #ccc;
            font-size: 1.1rem;
        }
        .problemTitle {
            color: #e5e5e5;
            font-weight: 500;
        }
        .problemDifficulty {
            padding: 0.3rem 0.8rem;
            border-radius: 15px;
            font-size: 0.9rem;
            font-weight: bold;
            color: #fff;
        }
        .difficulty-Easy { background-color: #4CAF50; }
        .difficulty-Medium { background-color: #FFC107; }
        .difficulty-Hard { background-color: #F44336; }
        .loading, .error {
            text-align: center;
            font-size: 1.2rem;
            padding: 2rem;
            color: #888;
        }
    `;

    if (isLoading) {
        return <div className="loading">Loading problems...</div>;
    }

    if (isError) {
        return <div className="error">Error: {error.message}</div>;
    }

    return (
        <div>
            <style>{styles}</style>
            <div className="problemListContainer">
                <h2 className="problemListTitle">Practice Problems</h2>
                <ul className="problemList">
                    {problems?.map(problem => (
                        <li key={problem.problem_id} className="problemItem">
                            <Link to={`/page/${pageName}/${problem.problem_id}`} className="problemLink">
                                <span className="problemTitle">{problem.title}</span>
                                <span className={`problemDifficulty difficulty-${problem.difficulty}`}>{problem.difficulty}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
