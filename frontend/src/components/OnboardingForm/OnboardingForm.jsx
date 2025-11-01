// components/OnboardingForm/OnboardingForm.jsx
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import styles from './OnboardingForm.module.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const fetchTopics = async () => {
    const { data } = await axios.get(`${API_BASE_URL}/topics`, {
        withCredentials: true,
    });
    return data;
};

const submitOnboarding = async (assessments) => {
    const { data } = await axios.post(
        `${API_BASE_URL}/onboarding`,
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
                {topics && topics.map(topic => (
                    <div key={topic.topic_name} className={styles.topicRow}>
                        <label>{topic.title}</label>
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