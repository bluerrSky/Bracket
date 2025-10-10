import Test from "./components/Test/test";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import IntroCards from "./components/IntroCards/IntroCards";
import "./App.css"
import { Outlet, useLocation } from "react-router";

function App(){
    const location = useLocation();
    return (
        <div className="mainContainer">
            {location.pathname === "/" ? 
            (
            <>
            <section>
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