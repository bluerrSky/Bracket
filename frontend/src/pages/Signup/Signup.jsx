
import styles from "./Signup.module.css"
export default function SignUp(){
    return (
    <div className={styles.mainContainer}>
        <div className={styles.signContainer}>
            <div className={styles.left}></div>
            <div className={styles.right}>
            <div className={styles.formHeader}>Create an account</div>

            <form action="">
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Enter your password" />
                <button type="submit">Create account</button>
            </form>
            </div>
        </div>
    </div>

    )
}