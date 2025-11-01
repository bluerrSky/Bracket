// components/FeedbackForm/FeedbackForm.jsx
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import styles from './FeedbackForm.module.css';
import RenderMarkdown from '../helper/markdownRenderer'; // Adjust path if needed
import { Link } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const submitFeedback = async (feedbackData) => {
    const { data } = await axios.post(
        `${API_BASE_URL}/tutorial-feedback`,
        feedbackData,
        { withCredentials: true }
    );
    return data;
};

export default function FeedbackForm({ topicName, subtopics }) {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [confusedTopic, setConfusedTopic] = useState("");
    const [showSubtopics, setShowSubtopics] = useState(false);

    const mutation = useMutation({
        mutationFn: submitFeedback,
    });

    const handleRating = (newRating) => {
        setRating(newRating);
        setShowSubtopics(newRating > 0 && newRating < 4);
        if (newRating >= 4) {
            setConfusedTopic(""); 
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({
            topic_name: topicName,
            rating: rating,
            confused_subtopic: confusedTopic
        });
    };

    return (
        <div className={styles.feedbackContainer}>
            {mutation.isSuccess ? (
                // 1. Show remediation AFTER submit
                <div className={styles.remediationBox}>
                    <h4>{mutation.data.message}</h4>
                    {mutation.data.explanation && (
                        <div className={styles.explanation}>
                            <RenderMarkdown content={mutation.data.explanation} />
                        </div>
                    )}
                    <h5>Here are some targeted problems:</h5>
                    <ul className={styles.problemList}>
                        {mutation.data.problems.map(p => (
                             <li key={p.problem_id}>
                                <Link to={`/page/${topicName}/${p.problem_id}`}>
                                    {p.title} ({p.difficulty})
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                // 2. Show the form BEFORE submit
                <form onSubmit={handleSubmit}>
                    <h4>How helpful was this tutorial?</h4>
                    <div className={styles.stars}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={star <= (hoverRating || rating) ? styles.starOn : styles.starOff}
                                onClick={() => handleRating(star)}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                            >
                                ★
                            </span>
                        ))}
                    </div>

                    {showSubtopics && (
                        <div className={styles.subtopicSelect}>
                            <label htmlFor="subtopic">What part was most confusing?</label>
                            <select
                                id="subtopic"
                                value={confusedTopic}
                                onChange={(e) => setConfusedTopic(e.targofet.value)}
                                required
                            >
                                <option value="">-- Select a subtopic --</option>
                                {(subtopics || []).map(sub => (
                                    <option key={sub} value={sub}>{sub}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <button 
                        type="submit" 
                        className={styles.submitButton}
                        disabled={rating === 0 || mutation.isPending || (showSubtopics && !confusedTopic)}
                    >
                        {mutation.isPending ? "Submitting..." : "Submit Feedback"}
                    </button>
                </form>
            )}
        </div>
    );
}