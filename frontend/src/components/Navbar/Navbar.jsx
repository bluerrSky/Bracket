import styles from "./Navbar.module.css"
// import DarkThemeIcon from "../Icons/darkThemeIcon" // (Keep if you use it)
import { useAuth } from "../../context/AuthContext"; 
import { Link, useNavigate } from "react-router-dom" // Import useNavigate
import { useMutation } from "@tanstack/react-query"; // Import useMutation
import useOnlineCounter from "../../hooks/useOnlineCounter"

// Get the API URL from environment variables, just like in Signup.jsx
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

// API function to call the /logout endpoint
const logoutUser = async () => {
    const response = await fetch(`${API_BASE_URL}/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Logout failed.");
    }
    return data;
};


export default function Navbar(){
    // Get both 'user' and 'logout' function from the context
    const { user, logout } = useAuth(); 
    const navigate = useNavigate(); 
    const onlineCount = useOnlineCounter();

    // Create the mutation for logging out
    const logoutMutation = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            console.log("Logout successful");
            logout(); // Clear user from global state
            navigate('/'); // Redirect to homepage
        },
        onError: (error) => {
            console.error("Logout failed:", error.message);
            // As a fallback, log the user out on the client anyway
            logout();
            navigate('/');
        }
    });

    // Click handler for the logout button
    const handleLogout = () => {
        logoutMutation.mutate();
    };

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
                
                <div className={styles.totalOnline}>
                    {onlineCount} online
                </div>
                
                {/* <div className={styles.themeToggle}>
                    <DarkThemeIcon/>
                </div> */}
                
                {/* Show Profile + Logout button if user is logged in,
                  OR a Login link if they are not.
                */}
                {user ? (
                    <>
                        <div className={styles.profileButton}>
                            <div className={styles.avatar}></div>
                            <div className={styles.name}>
                                {user.username}
                            </div>
                        </div>
                        <button 
                            onClick={handleLogout} 
                            disabled={logoutMutation.isPending}
                            className={styles.logoutButton} // You'll need to add this style
                        >
                            {logoutMutation.isPending ? "..." : "Logout"}
                        </button>
                    </>
                ) : (
                    <Link to="/login" className={styles.loginButton}> {/* You'll need to style this */}
                        Login / Sign Up
                    </Link>
                )}
            </div>
        </div>
    )
}