import About from "../components/About/About"
import Banner from "../components/Banner/Banner"
import Commitment from "../components/Commitment/Commitment"
import Header from "../components/Header/Header"
import Team from "../components/Team/Team"
import Footer  from "../components/Footer/Footer"


const LandingPage = () => {
    return (
        <>
            <section className="gradient-bg">
                <Header />
                <Banner />
            </section>
            <About />
            <Team />
            <Commitment />
            <Footer />
            <section />

        </>
    )
}

export default LandingPage