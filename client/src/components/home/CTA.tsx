import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">READY TO SECURE YOUR BUSINESS?</h2>
        <p className="text-light-text max-w-2xl mx-auto mb-8">
          Join hundreds of companies that trust HackerHire to connect them with the best ethical hackers to protect their digital assets.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/submit-project">
            <Button className="bg-secondary text-primary hover:bg-secondary/90 font-bold px-8 py-6">
              POST A PROJECT
            </Button>
          </Link>
          <Link href="/hackers">
            <Button variant="outline" className="border-2 border-light-text text-light-text hover:bg-white/10 font-bold px-8 py-6">
              BROWSE HACKERS
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
