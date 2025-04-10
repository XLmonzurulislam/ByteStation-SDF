import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Zap, Search, FileText, Code, Database, Lock, Server, Smartphone, Computer, Wifi, Users } from "lucide-react";

export default function Services() {
  // Define our core services
  const coreServices = [
    {
      icon: <Search className="h-10 w-10 text-primary" />,
      title: "Vulnerability Assessment",
      description: "Comprehensive scanning and assessment to identify security weaknesses in your systems, networks, and applications.",
      benefits: ["Identify security gaps", "Risk prioritization", "Compliance support", "Detailed recommendations"]
    },
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: "Penetration Testing",
      description: "Authorized simulated attacks to identify exploitable vulnerabilities in your security defenses before malicious hackers do.",
      benefits: ["Real-world attack simulation", "Exploitation proof", "Security validation", "Remediation guidance"]
    },
    {
      icon: <Code className="h-10 w-10 text-primary" />,
      title: "Secure Code Review",
      description: "Expert analysis of your application source code to identify security flaws, vulnerabilities, and compliance issues.",
      benefits: ["Early vulnerability detection", "Secure coding practices", "Custom security patterns", "Detailed fix recommendations"]
    },
    {
      icon: <FileText className="h-10 w-10 text-primary" />,
      title: "Security Audits",
      description: "Comprehensive evaluation of your organization's security posture against industry standards and best practices.",
      benefits: ["Compliance verification", "Gap analysis", "Process improvement", "Documentation review"]
    }
  ];

  // Define specialized services
  const specializedServices = [
    {
      icon: <Database className="h-8 w-8 text-secondary" />,
      title: "Cloud Security Assessment",
      description: "Evaluate the security of your cloud infrastructure and configurations."
    },
    {
      icon: <Server className="h-8 w-8 text-secondary" />,
      title: "API Security Testing",
      description: "Identify vulnerabilities in your API endpoints and implementation."
    },
    {
      icon: <Wifi className="h-8 w-8 text-secondary" />,
      title: "Network Security",
      description: "Comprehensive analysis of your network infrastructure and security controls."
    },
    {
      icon: <Smartphone className="h-8 w-8 text-secondary" />,
      title: "Mobile App Security",
      description: "Assess the security of your mobile applications on iOS and Android platforms."
    },
    {
      icon: <Computer className="h-8 w-8 text-secondary" />,
      title: "IoT Security",
      description: "Evaluate and secure Internet of Things devices and their ecosystems."
    },
    {
      icon: <Lock className="h-8 w-8 text-secondary" />,
      title: "Encryption Review",
      description: "Analyze and improve your data encryption implementations and key management."
    },
    {
      icon: <Users className="h-8 w-8 text-secondary" />,
      title: "Social Engineering Tests",
      description: "Evaluate your staff's security awareness through simulated phishing and other tests."
    },
    {
      icon: <Shield className="h-8 w-8 text-secondary" />,
      title: "Security Training",
      description: "Custom security awareness and technical training for your development teams."
    }
  ];

  return (
    <div className="container max-w-7xl mx-auto px-4 py-10">
      {/* Hero section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Comprehensive Security Services
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Our ethical hackers provide a full range of cybersecurity services to protect your business from evolving threats.
        </p>
      </div>

      {/* Core services section */}
      <section className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {coreServices.map((service, index) => (
            <Card key={index} className="border border-slate-800 bg-slate-900/60">
              <CardHeader>
                <div className="mb-4">{service.icon}</div>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
                <CardDescription className="text-base mt-2">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <h4 className="font-medium mb-2 text-sm uppercase tracking-wide text-muted-foreground">Key Benefits</h4>
                <ul className="space-y-2">
                  {service.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start">
                      <div className="mr-2 mt-1">
                        <Shield className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/submit-project">
                    Request This Service
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Specialized services section */}
      <section className="mb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">Specialized Security Services</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our security experts can help with specific technologies and domains
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specializedServices.map((service, index) => (
            <Card key={index} className="border border-slate-800 bg-slate-900/60">
              <CardHeader className="pb-3">
                <div className="mb-2">{service.icon}</div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA section */}
      <section className="rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to secure your business?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Our ethical hackers are standing by to help you identify and address security vulnerabilities before they can be exploited.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/submit-project">
              Submit a Project
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/contact">
              Contact Our Team
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}