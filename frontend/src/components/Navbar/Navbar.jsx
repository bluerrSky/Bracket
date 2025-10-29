import styles from "./Navbar.module.css"
import DarkThemeIcon from "../Icons/darkThemeIcon"
import { useAuth } from "../../context/AuthContext"; 
import { Link } from "react-router-dom"
export default function Navbar(){
    const { user } = useAuth(); 

    return (
        <div className={styles.navbar}>
            <div className={styles.leftNav}>
                <Link to="/">
                    <div className={styles.logo}>
                        <span className={styles.logoFragOne}>Bracket</span>
                        <span className={styles.logoFragTwo}>Code</span>
                    </div>
                </Link>
            </div>
            <div className={styles.centerNav}>
            </div>
            <div className={styles.rightNav}>
                {user && (
                <div>Battle</div>
                )}
                <div className={styles.totalOnline}>1 online</div>
                <div className={styles.themeToggle}>
                    <DarkThemeIcon/>
                </div>
                {user && (
                    <div className={styles.profileButton}>
                        <div className={styles.avatar}></div>
                        <div className={styles.name}>
                            {user.username} {/* Display the dynamic username */}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}