import styles from "./PathSkillTree.module.css";

export default function PageSkillTree() {
    return (
        <div className={styles.skillTreeContainer}>
            <div className={styles.skillTree}></div>

            <div className={`${styles.skill} ${styles['skill-1']}`}>
                <div className={styles.skillLabel}>Introduction to DP</div>
            </div>

            <div className={`${styles.skill} ${styles['skill-2']}`}>
                <div className={styles.skillLabel}>Overlap Subproblems</div>
            </div>

            <div className={`${styles.skill} ${styles['skill-3']}`}>
                <div className={styles.skillLabel}>Optimal Substructure</div>
            </div>

            <div className={`${styles.skill} ${styles['skill-4']}`}>
                <div className={styles.skillLabel}>DP problems</div>
            </div>

            <div className={styles.skillMeter}>
                <div className={styles.meterValue}>
                    10%
                </div>
            </div>
        </div>
    );
}