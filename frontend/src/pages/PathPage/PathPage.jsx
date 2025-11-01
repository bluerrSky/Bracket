// pages/PathPage/PathPage.jsx
import { useParams } from 'react-router-dom';
import PathContent from "../../components/PathContent/PathContent";
import PageSkillTree from "../../components/PathSkillTree/PathSkillTree";
import styles from "./PathPage.module.css"

export default function PathPage(){
    // Get the 'pageName' from the URL (e.g., "DP", "Recursion")
    const { pageName } = useParams(); 

    return (
        <div className={styles.pathPageContainer}>
            <PageSkillTree/>
            {/* Pass the pageName to PathContent as a prop */}
            <PathContent topicName={pageName} />
        </div>
    )
}