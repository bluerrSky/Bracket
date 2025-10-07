import styles from "./test.module.css"
export default function Test(){
    return (
        <div className={styles.testFonts}>
            <div className={styles.pageHeader}>Bracket Code</div>
            <div className={styles.heading}>This is a heading in the page.</div>
            <div className={styles.content}>This is content of the website.</div>
        </div>
    )
}