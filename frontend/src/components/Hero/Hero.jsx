import styles from "./Hero.module.css"
import { Link } from "react-router-dom"
import HeroImg from "../../assets/images/heroImg.jpg"
import HeroImg2 from "../../assets/images/heroImg2.png"
export default function Hero(){
    return (
        <div className={styles.Hero}>
            <div className={styles.heroContent}>
                <div className={styles.heroTitle}>
                    <span className={styles.frag-1}>Code. </span>
                    <span className={styles.frag-2}>Compete. </span>
                    <span className={styles.frag-3}>Conquer. </span>
                </div>
                <div className={styles.ctaText}>
                    Step into the arena and challenge coders in real-time battles.
                </div>

                <div className={styles.ctaBtns}>
                    <button>Start Tutorial</button>
                    <Link to="login"><button>Sign up</button></Link>
                </div>

            </div>
            <div className={styles.HeroImg}>
                {/* <img src={HeroImg2} alt="" /> */}
            </div>
        </div>
    )
}