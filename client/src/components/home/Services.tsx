import { Link } from "wouter";
import {
  Bug,
  UserCheck,
  Shield,
  Code,
  Network,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: <Network className="text-xl" />,
    title: "Network Penetration Testing",
    description:
      "Simulating advanced attacks on your network infrastructure to uncover security gaps and vulnerabilities.",
  },
  {
    icon: <UserCheck className="text-xl" />,
    title: "Application Security Audits",
    description:
      "In-depth scanning of your web and mobile applications to detect and resolve security flaws that could be exploited.",
    highlight: true,
  },
  {
    icon: <Shield className="text-xl" />,
    title: "Phishing Simulation & Training",
    description:
      "Testing your team’s vulnerability to phishing attacks, followed by training to mitigate risks from such tactics.",
  },
  {
    icon: <Code className="text-xl" />,
    title: "Wireless Network Security Assessment",
    description:
      "Evaluating the security of your wireless networks to prevent unauthorized access and data leakage",
  },
  {
    icon: <Network className="text-xl" />,
    title: "Cloud Security Review",
    description:
      "Comprehensive analysis of cloud infrastructure and services to ensure they are securely configured and protected from threats.",
  },
  {
    icon: <UserCheck className="text-xl" />,
    title: "Data Recovery & Protection",
    description:
      "Restoring lost or compromised data and securing it against future risks and breaches.",
    highlight: true,
  },
];

const Services = () => {
  return (
    <section id="services" className="py-16 bg-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            OUR SERVICES
          </h2>
          <p className="text-light-text max-w-2xl mx-auto">
            Professional ethical hacking services to protect your digital assets
            and infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`service-card ${
                service.highlight
                  ? "bg-accent rounded-lg p-6 transition-all duration-300 hover:border-secondary border border-transparent"
                  : "bg-card rounded-lg p-6 transition-all duration-300 hover:border-secondary border border-transparent"
              }`}
            >
              <div
                className={`flex items-center justify-center w-12 h-12 bg-primary rounded-lg mb-4 ${service.highlight ? "text-white" : "text-secondary"}`}
              >
                {service.icon}
              </div>
              <h3
                className={`text-xl font-bold ${service.highlight ? "text-white" : "text-secondary"} mb-2`}
              >
                {service.title}
              </h3>
              <p
                className={service.highlight ? "text-white" : "text-light-text"}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
