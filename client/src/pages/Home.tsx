import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import HowItWorks from "@/components/home/HowItWorks";
import FeaturedHackers from "@/components/home/FeaturedHackers";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import CTA from "@/components/home/CTA";

const Home = () => {
  return (
    <div>
      <Hero />
      <Services />
      <HowItWorks />
      <FeaturedHackers />
      <Testimonials />
      <FAQ />
      <CTA />
    </div>
  );
};

export default Home;
