import CodeEditor from "../../components/Editor/Editor"
import ProblemStatement from "../../components/ProblemStatement/ProblemStatement"
import styles from "./REPL.module.css"
export default function REPL(){
    return (
        <div className={styles.REPLContainer}>
            <div className={styles.problemDesc}>
                <ProblemStatement/>
            </div>
            <div className={styles.codeEditor}>
                <CodeEditor/>
            </div>
        </div>
    )
}