import { useState } from "react"; // 👈 Import useState
import styles from "./Navbar.module.css"
import { useAuth } from "../../context/AuthContext"; 
import { Link, useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query";
import useOnlineCounter from "../../hooks/useOnlineCounter"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

// API function to call the /logout endpoint (no change)
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
    const { user, logout } = useAuth(); 
    const navigate = useNavigate(); 
    const onlineCount = useOnlineCounter();

    // --- 1. Add state for mobile menu ---
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const logoutMutation = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            console.log("Logout successful");
            logout(); 
            navigate('/'); 
            setIsMenuOpen(false); // 👈 Close menu on logout
        },
        onError: (error) => {
            console.error("Logout failed:", error.message);
            logout();
            navigate('/');
            setIsMenuOpen(false); // 👈 Close menu on error
        }
    });

    const handleLogout = () => {
        logoutMutation.mutate();
    };

    // --- 2. Toggle function for the hamburger ---
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Helper to close menu on link click
    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <div className={styles.navbar}>
            <div className={styles.leftNav}>
                <Link to="/" onClick={closeMenu}> {/* 👈 Close menu on logo click */}
                    <div className={styles.logo}>
                        <span className={styles.logoFragOne}>Bracket</span>
                        <span className={styles.logoFragTwo}>Code</span>
                    </div>
                </Link>
            </div>
            
            {/* --- 3. Right nav is now a wrapper --- */}
            <div className={styles.rightNav}>
                
                {/* --- 4. This is the new hamburger button --- */}
                <button className={styles.hamburger} onClick={toggleMenu} aria-label="Toggle menu">
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                </button>

                {/* --- 5. This is the original nav, now for desktop only --- */}
                <div className={styles.desktopNav}>
                    <div className={styles.totalOnline}>
                        {onlineCount} online
                    </div>
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
                                className={styles.logoutButton}
                            >
                                {logoutMutation.isPending ? "..." : "Logout"}
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className={styles.loginButton}>
                            Login / Sign Up
                        </Link>
                    )}
                </div>

                {/* --- 6. This is the new mobile menu dropdown --- */}
                {/* It's built separately for easier styling */}
                <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
                    <div className={styles.totalOnline}>
                        {onlineCount} online
                    </div>
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
                                className={styles.logoutButton}
                            >
                                {logoutMutation.isPending ? "..." : "Logout"}
                            </button>
                        </>
                    ) : (
                        <Link to="/login" onClick={closeMenu} className={styles.loginButton}>
                            Login / Sign Up
                        </Link>
                    )}
                </div>

            </div>
        </div>
    )
}