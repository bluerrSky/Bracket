import styles from "./Hero.module.css"
import { Link } from "react-router-dom"
// import HeroImg from "../../assets/images/heroImg.jpg"
// import HeroImg2 from "../../assets/images/heroImg2.png"
import { useAuth } from "../../context/AuthContext"; //

export default function Hero(){
    const { user } = useAuth(); //

    return (
        <div className={styles.Hero}>
            <div className={styles.heroContent}>
                <div className={styles.heroTitle}>
                    <span className={styles['frag-1']}>Code. </span>
                    <span className={styles['frag-2']}>Compete. </span>
                    <span className={styles['frag-3']}>Conquer. </span>
                </div>
                <div className={styles.ctaText}>
                    Step into the arena and challenge coders in real-time battles.
                </div>

                <div className={styles.ctaBtns}>

                    {/* This is your original logged-out logic (unchanged) */}
                    {!user && (
                        <Link to="/login"><button>Start Tutorial</button></Link>
                    )}
                    
                    {/* This is your original logged-in logic (unchanged) */}
                    {user && (
                        <Link to="path"><button>Start Tutorial</button></Link>
                    )}

                    {/* This is your original logged-out logic (unchanged) */}
                    {!user && (
                        <Link to="login"><button>Login</button></Link>
                    )}

                    {/* --- THIS IS THE NEW BUTTON (Only shows if logged in) --- */}
                    {user && (
                        <Link to="my-path">
                            <button className={styles.btnSecondary}>My Adaptive Path</button>
                        </Link>
                    )}
                    {/* ---------------------------------------------------- */}
                </div>

            </div>
            <div className={styles.HeroImg}>
                {/* <img src={HeroImg2} alt="" /> */}
            </div>
        </div>
    )
}