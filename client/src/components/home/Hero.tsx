import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="bg-primary clip-diagonal relative overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              <span className="text-secondary">BOOST</span> YOUR
              <br />
              SECURITY WITH EXPERT HACKERS
            </h1>
            <p className="text-light-text mb-8 text-lg max-w-lg">
              Connect with verified ethical hackers to identify vulnerabilities
              and secure your digital assets before malicious attackers find
              them.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/submit-project">
                <Button className="w-full sm:w-auto bg-secondary text-primary hover:bg-secondary/90 font-bold px-6 py-6">
                  GET STARTED
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-light-text text-light-text hover:bg-white/10 hover:text-white px-6 py-6"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl">
              <div className="bg-gray-300 rounded-lg h-80 flex items-center justify-center">
                <img
                  src="https://i.postimg.cc/V6Q7j59q/cybersecurity-concept-collage-design.jpg"
                  alt="Hacker image"
                />
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-48 h-48 bg-secondary rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-accent rounded-full opacity-20 blur-xl"></div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-dark to-transparent"></div>
    </section>
  );
};

export default Hero;
