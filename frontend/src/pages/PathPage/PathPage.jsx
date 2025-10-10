import PathContent from "../../components/PathContent/PathContent";
import PageSkillTree from "../../components/PathSkillTree/PathSkillTree";
import styles from "./PathPage.module.css"

export default function PathPage(){
    return (
        <div className={styles.pathPageContainer}>
            <PageSkillTree/>
            <PathContent/>
        </div>
    )
}