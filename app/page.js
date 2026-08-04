// Components

import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Features from "../components/Features/Features";
import About from "../components/About/About";
import MissionVision from "../components/MissionVision/MissionVision";

export default function Home() {

    return (

        <>

            <Header />

            <main>

                {/* Hero */}

                <Hero />

                {/* Features */}

                <Features />

                {/* About */}

                <About />

                {/* Mission Vision */}

                <MissionVision />

            </main>

        </>

    );

}