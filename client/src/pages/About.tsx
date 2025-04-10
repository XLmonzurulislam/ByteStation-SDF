import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock, Clock, UserCheck, Zap, Award } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Integrity",
      description: "We maintain the highest ethical standards in all our operations, ensuring transparency and honesty in every interaction."
    },
    {
      icon: <Lock className="h-10 w-10 text-primary" />,
      title: "Confidentiality",
      description: "We treat all client information with the utmost discretion and implement rigorous data protection practices."
    },
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: "Excellence",
      description: "We are committed to delivering exceptional quality in our security services through continuous improvement and innovation."
    },
    {
      icon: <UserCheck className="h-10 w-10 text-primary" />,
      title: "Trust",
      description: "We build lasting relationships with our clients based on reliability, accountability, and consistent delivery of valuable results."
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: "Responsiveness",
      description: "We recognize the urgency of security concerns and provide timely, effective solutions to protect our clients."
    },
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      title: "Expertise",
      description: "We maintain a team of highly skilled professionals with cutting-edge knowledge of cybersecurity technologies and practices."
    }
  ];

  return (
    <div className="container max-w-7xl mx-auto px-4 py-10">
      {/* Hero section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          About SecureHack
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Connecting businesses with ethical hackers to build a more secure digital world
        </p>
      </section>

      {/* Mission section */}
      <section className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg mb-4 text-muted-foreground">
              SecureHack was founded with a clear mission: to bridge the gap between businesses needing cybersecurity expertise and ethical hackers with the skills to protect them.
            </p>
            <p className="text-lg mb-6 text-muted-foreground">
              We believe in creating a safer digital environment by facilitating collaboration between organizations and security professionals in an ethical, transparent, and effective manner.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>Protecting businesses from cyber threats</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>Supporting ethical hacker community growth</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>Advocating for responsible security practices</span>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-8 rounded-lg border border-slate-700">
            <h3 className="text-2xl font-bold mb-4">Our Impact</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">1,500+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">500+</div>
                <div className="text-sm text-muted-foreground">Verified Hackers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">2,800+</div>
                <div className="text-sm text-muted-foreground">Vulnerabilities Fixed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">98%</div>
                <div className="text-sm text-muted-foreground">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values section */}
      <section className="mb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">Our Core Values</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            These principles guide everything we do at SecureHack
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <Card key={index} className="border border-slate-800 bg-slate-900/60">
              <CardContent className="pt-6">
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Team section */}
      <section className="mb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">Leadership Team</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Meet the dedicated professionals leading our cybersecurity mission
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "Alex Johnson",
              title: "Founder & CEO",
              image: "AJ",
              bio: "Former cybersecurity consultant with 15+ years of experience protecting Fortune 500 companies."
            },
            {
              name: "Sophia Chen",
              title: "CTO",
              image: "SC",
              bio: "Renowned security researcher and former lead at a major tech company's security division."
            },
            {
              name: "Marcus Williams",
              title: "Head of Hacker Relations",
              image: "MW",
              bio: "Ethical hacker with numerous CVEs to his name and a passion for building the security community."
            },
            {
              name: "Elena Rodriguez",
              title: "Client Success Director",
              image: "ER",
              bio: "Expert in helping businesses navigate complex security challenges with practical solutions."
            },
            {
              name: "David Kim",
              title: "Lead Security Architect",
              image: "DK",
              bio: "Specialist in designing comprehensive security frameworks and compliance programs."
            },
            {
              name: "Olivia Parker",
              title: "Operations Director",
              image: "OP",
              bio: "Experienced professional ensuring smooth execution of all security engagements and processes."
            }
          ].map((member, index) => (
            <Card key={index} className="border border-slate-800 bg-slate-900/60 overflow-hidden">
              <div className="h-36 bg-gradient-to-r from-slate-800 to-slate-900 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center text-2xl font-bold text-white">
                  {member.image}
                </div>
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-sm text-primary mb-3">{member.title}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA section */}
      <section className="rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Join Our Security Mission</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Whether you're a business looking to enhance your security or an ethical hacker wanting to make an impact, we welcome you to be part of our community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/submit-project">
              Post a Security Project
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/join-hacker">
              Join as an Ethical Hacker
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}