// pages/AdaptivePathPage/AdaptivePathPage.jsx
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import PathDashboard from '../../components/PathDashboard/PathDashboard';
import OnboardingForm from '../../components/OnboardingForm/OnboardingForm';
import styles from './AdaptivePathPage.module.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const fetchLearningPath = async () => {
    const { data } = await axios.get(`${API_BASE_URL}/adaptive/get-path`, {
        withCredentials: true,
    });
    return data;
};

export default function AdaptivePathPage() {
    const { data: path, isLoading, isError, refetch } = useQuery({
        queryKey: ['learningPath'],
        queryFn: fetchLearningPath,
        retry: false,
    });

    if (isLoading) {
        return <div className={styles.loading}>Loading Your Path...</div>;
    }
    if (isError) {
        return <div className={styles.error}>Could not fetch your path. Please log in.</div>;
    }

    return (
        <div className={styles.container}>
            {path && path.length > 0 ? (
                <PathDashboard path={path} onPathUpdate={refetch} />
            ) : (
                <OnboardingForm onPathCreated={refetch} />
            )}
        </div>
    );
}