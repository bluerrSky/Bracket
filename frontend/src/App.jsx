import Test from "./components/Test/test";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import IntroCards from "./components/IntroCards/IntroCards";
import { Outlet, useLocation } from "react-router";
import styles from "./App.module.css"
function App(){
    const location = useLocation();
    return (
        <div className={styles.mainContainer}>
            {location.pathname === "/" ? 
            (
            <>
            <section className={styles.homeSection}>
                <Navbar/>
                <Hero/>
            </section>
            <IntroCards/>
            </>)
            :
            <>
            <Navbar/>
            <Outlet/>
            </>
        }


            
        </div>
    )
}

export default App;