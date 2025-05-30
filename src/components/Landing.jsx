import HeroSection from "./Landing/HeroSection";
import CTASection from "./Landing/CTASection";

const Landing = () => {
    return (
        <>
            <div className="max-w-7xl mx-auto pt-20 px-6">
                <HeroSection/>
            </div>
            <CTASection/>
        </>
    );
}

export default Landing;