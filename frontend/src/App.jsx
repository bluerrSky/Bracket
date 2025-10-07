import Test from "./components/Test/test";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import IntroCards from "./components/IntroCards/IntroCards";
import "./App.css"


function App(){
    return (
        <div className="mainContainer">
            <section>
                <Navbar/>
                <Hero/>
            </section>

            <IntroCards/>
        </div>
    )
}

export default App;