import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; // 👈 IMPORT THE CONTEXT HOOK
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import IntroCards from "./components/IntroCards/IntroCards";
import styles from "./App.module.css";

// App.jsx (Simplified Rendering)
// ... (other imports) ...

function App() {
    const location = useLocation();
    const { user, loading } = useAuth();

    // The loading check remains for the initial session verification
    if (loading) {
        return <div>Loading...</div>; 
    }

    // Render Navbar (it handles user state internally)
    return (
        <div className={styles.mainContainer}>
            <Navbar /> 

            {/* Conditionally render home page content or child routes via Outlet */}
            {/* The root route ("/") is where you render the Hero/Cards */}
            {location.pathname === "/" ? (
                <>
                    <section className={styles.homeSection}>
                        <Hero />
                    </section>
                    <IntroCards />
                </>
            ) : (
                // All other children (protected or not) render here via the RouterProvider setup
                <Outlet context={{ user }} /> 
            )}
        </div>
    );
}

export default App;