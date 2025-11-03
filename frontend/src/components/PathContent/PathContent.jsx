// components/PathContent/PathContent.jsx
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import styles from "./PathContent.module.css";
import RenderMarkdown from "../helper/markdownRenderer";
import ProblemList from "../ProblemList/ProblemList";
import FeedbackForm from '../FeedbackForm/FeedbackForm'; 

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// API function to fetch the tutorial
const fetchTutorial = async (topicName) => {
    const { data } = await axios.get(`${API_BASE_URL}/content/tutorial/${topicName}`, {
        withCredentials: true,
    });
    return data;
};

// Accept 'topicName' as a prop
export default function PathContent({ topicName }){
    
    // Fetch the dynamic tutorial content based on the topicName
    const { data: tutorial, isLoading, isError } = useQuery({
        queryKey: ['tutorial', topicName],
        queryFn: () => fetchTutorial(topicName),
    });

    // Add loading and error states
    if (isLoading) {
        return (
            <div className={styles.pathContentContainer}>
                <div className={styles.pathTitle}>Loading Tutorial...</div>
            </div>
        );
    }

    if (isError || !tutorial) {
        return (
            <div className={styles.pathContentContainer}>
                <div className={styles.pathTitle}>Error: Tutorial not found</div>
                <p className={styles.tutorialContent}>Could not find a tutorial for "{topicName}".</p>
            </div>
        );
    }

    // Render the dynamic content
    return (
        <div className={styles.pathContentContainer}>
            <div className={styles.pathTitle}>
                {tutorial.title}
            </div>
            <div className={styles.contentSections}>
                <div className={styles.introSection}>
                    {/* <div className={styles.sectionTitle}>
                        Introduction to {tutorial.topic_name}
                    </div> */}
                    {/* Render content from the database */}
                    <RenderMarkdown content={tutorial.content} />
                    
                    {/* --- THIS IS THE CHANGE --- */}
                    {/* Pass the topicName prop to ProblemList */}
                    <ProblemList topicName={topicName} />
                    {/* ------------------------- */}
                    
                    <hr className={styles.divider} /> 
                    <FeedbackForm 
                        topicName={tutorial.topic_name} 
                        subtopics={tutorial.subtopics} 
                    />
                </div>
            </div>
        </div>
    );
}