import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; // 👈 IMPORT THE CONTEXT HOOK
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import IntroCards from "./components/IntroCards/IntroCards";
import styles from "./App.module.css";

function App() {
    const location = useLocation();
    // 👇 Get user and loading state from the GLOBAL context. No more useState/useEffect here.
    const { user, loading } = useAuth();

    // The loading state now comes from the context, which waits for the session check to complete.
    if (loading) {
        return <div>Loading...</div>; // Or a more sophisticated spinner component
    }

    return (
        <div className={styles.mainContainer}>
            {/* The Navbar component now receives the user from the context */}
            <Navbar user={user} />

            {/* Conditionally render home page content or child routes */}
            {location.pathname === "/" ? (
                <>
                    <section className={styles.homeSection}>
                        <Hero />
                    </section>
                    <IntroCards />
                </>
            ) : (
                // Pass the user data down to child routes (like REPL) via the Outlet's context prop
                <Outlet context={{ user }} />
            )}
        </div>
    );
}

export default App;