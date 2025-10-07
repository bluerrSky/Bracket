import styles from "./Navbar.module.css"
import DarkThemeIcon from "../Icons/darkThemeIcon"
export default function Navbar(){
    return (
        <div className={styles.navbar}>
            <div className={styles.leftNav}>
                <div className={styles.logo}>
                    <span className={styles.logoFragOne}>Bracket</span>
                    <span className={styles.logoFragTwo}>Code</span>
                </div>
            </div>
            <div className={styles.centerNav}>
            </div>
            <div className={styles.rightNav}>
                <div className={styles.totalOnline}>158 online</div>
                <div className={styles.themeToggle}>
                    <DarkThemeIcon/>
                </div>
                <div className={styles.profileButton}>
                    <div className={styles.avatar}></div>
                    <div className={styles.name}>
                        TestUser
                    </div>
                </div>
            </div>
            
        </div>
    )
}

