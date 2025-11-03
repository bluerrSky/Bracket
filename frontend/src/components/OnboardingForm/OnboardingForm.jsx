// components/OnboardingForm/OnboardingForm.jsx
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import styles from './OnboardingForm.module.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// --- FIX 1: Import all your icons directly ---
// This lets the bundler (Vite) process them and give you the correct public URL.
// Make sure these paths and filenames match your project.
import arrayIcon from '../../assets/images/arrayIcon.png';
import recursionIcon from '../../assets/images/recursionIcon.png';
import treeIcon from '../../assets/images/treeIcon.png';
import dpIcon from '../../assets/images/dpIcon.png';
import graphIcon from '../../assets/images/graphIcon.png';
import greedyIcon from '../../assets/images/greedyIcon.png';

// --- FIX 2: Create a mapping object ---
// This connects the 'topic_name' string from your API to the imported icon.
// This is much safer than relying on array index.
//
// !!! IMPORTANT: You must make sure the keys here (e.g., 'arrays', 'recursion')
// !!! EXACTLY match the 'topic_name' values coming from your API.
const topicIcons = [
    recursionIcon,
arrayIcon,
treeIcon,
dpIcon, // Example: adjust this key if your API sends 'dp'
graphIcon,
greedyIcon
    // Add any other topics if needed
];

// We no longer need the old, fragile array
// let iconImagesArr = [ ... ]

const fetchTopics = async () => {
    const { data } = await axios.get(`${API_BASE_URL}/content/topics`, {
        withCredentials: true,
    });
    return data;
};

const submitOnboarding = async (assessments) => {
    const { data } = await axios.post(
        `${API_BASE_URL}/adaptive/onboarding`,
        { assessments },
        { withCredentials: true }
    );
    return data;
};

const skillLevels = ['None', 'Easy', 'Moderate', 'Hard'];

export default function OnboardingForm({ onPathCreated }) {
    const { data: topics, isLoading, isError } = useQuery({
        queryKey: ['topics'],
        queryFn: fetchTopics,
    });
    const [answers, setAnswers] = useState({});

    // Pre-fill answers with "None"
    useEffect(() => {
        if (topics) {
            const initialAnswers = {};
            topics.forEach(topic => {
                initialAnswers[topic.topic_name] = 'None';
            });
            setAnswers(initialAnswers);
        }
    }, [topics]);

    const mutation = useMutation({
        mutationFn: submitOnboarding,
        onSuccess: () => {
            onPathCreated(); // This refetches the path in AdaptivePathPage
        },
        onError: (error) => {
            console.error("Onboarding failed:", error);
        },
    });

    const handleAnswerChange = (topicName, level) => {
        setAnswers(prev => ({
            ...prev,
            [topicName]: level,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const assessments = Object.keys(answers).map(topic => ({
            topic: topic,
            level: answers[topic],
        }));
        mutation.mutate(assessments);
    };

    if (isLoading) return <div className={styles.loading}>Loading topics...</div>;
    if (isError) return <div className={styles.error}>Could not load topics.</div>;

    return (
        <div className={styles.formContainer}>
            <h2>Welcome! Let's build your learning path.</h2>
            <p>Tell us your current comfort level with each topic.</p>
            <form onSubmit={handleSubmit}>
                {topics && topics.map((topic, index) => ( // We don't need 'index' anymore
                    <div key={topic.topic_name} className={styles.topicRow}>
                        <div className={styles.iconAndLabel}>
                            {/* --- FIX 3: Use the mapping object to set the background --- */}
                            <div
                                className={styles.iconContainer}
                                style={{
                                    // We use the imported variable (which is a URL string)
                                    backgroundImage: `url(${topicIcons[index]})`
                                }}
                            ></div>
                            <label>{topic.title}</label>
                        </div>
                        <div className={styles.buttonGroup}>
                            {skillLevels.map(level => (
                                <button
                                    type="button"
                                    key={level}
                                    className={`${styles.skillButton} ${answers[topic.topic_name] === level ? styles.selected : ''}`}
                                    onClick={() => handleAnswerChange(topic.topic_name, level)}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
                <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={mutation.isPending}
                >
                    {mutation.isPending ? 'Generating...' : 'Create My Path'}
                </button>
            </form>
        </div>
    );
}