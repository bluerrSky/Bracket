import { useParams } from 'react-router-dom';
import CodeEditor from "../../components/Editor/Editor";
import ProblemStatement from "../../components/ProblemStatement/ProblemStatement";
import styles from "./REPL.module.css";

export default function REPL() {
    // --- Get the problemID from the URL ---
    const { problemID } = useParams();

    return (
        <div className={styles.REPLContainer}>
            <div className={styles.problemDesc}>
                {/* --- Pass the ID to the ProblemStatement component --- */}
                <ProblemStatement problemID={problemID} />
            </div>
            <div className={styles.codeEditor}>
                {/* --- Pass the ID to the CodeEditor component --- */}
                <CodeEditor problemID={problemID} />
            </div>
        </div>
    );
}