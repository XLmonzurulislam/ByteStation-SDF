import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { FileText, UserCheck, Shield } from "lucide-react";

const steps = [
  {
    number: 1,
    icon: <FileText className="text-5xl text-secondary" />,
    title: "Post Your Project",
    description: "Describe your security needs and requirements for ethical hackers to review."
  },
  {
    number: 2,
    icon: <UserCheck className="text-5xl text-secondary" />,
    title: "Select Your Hacker",
    description: "Browse profiles and select from our verified ethical hackers with the right skills."
  },
  {
    number: 3,
    icon: <Shield className="text-5xl text-secondary" />,
    title: "Get Results",
    description: "Receive comprehensive reports with vulnerabilities and remediation recommendations."
  }
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-dark to-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">HOW IT WORKS</h2>
          <p className="text-light-text max-w-2xl mx-auto">Simple process to get started with our ethical hacking services</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="bg-card rounded-lg p-6 text-center relative">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-secondary text-primary w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">
                {step.number}
              </div>
              <div className="mt-4 mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-light-text">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/submit-project">
            <Button className="bg-secondary text-primary hover:bg-secondary/90 font-bold px-8 py-6">
              START A PROJECT
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
