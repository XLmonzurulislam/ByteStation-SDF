import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";

// Mock data for initial rendering
const initialHackers = [
  {
    id: 1,
    name: "Alex Morgan",
    title: "Penetration Tester",
    skills: ["Web App Security", "Cloud Security", "API Testing"],
    rating: 4.9,
    reviewCount: 128,
    available: true,
    imagePlaceholder: "AM"
  },
  {
    id: 2,
    name: "Sarah Chen",
    title: "Security Researcher",
    skills: ["Malware Analysis", "Forensics", "Threat Intel"],
    rating: 5.0,
    reviewCount: 97,
    available: true,
    imagePlaceholder: "SC"
  },
  {
    id: 3,
    name: "David Kumar",
    title: "Network Specialist",
    skills: ["Network Security", "IoT Security", "OSINT"],
    rating: 4.8,
    reviewCount: 156,
    available: true,
    imagePlaceholder: "DK"
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    title: "Code Security Expert",
    skills: ["Secure Coding", "Code Review", "SAST/DAST"],
    rating: 4.9,
    reviewCount: 82,
    available: true,
    imagePlaceholder: "ER"
  }
];

const FeaturedHackers = () => {
  // Fetch hackers from API
  const { data: hackers = initialHackers, isLoading } = useQuery({
    queryKey: ['/api/hackers/featured'],
  });

  return (
    <section className="py-16 bg-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">FEATURED HACKERS</h2>
          <p className="text-light-text max-w-2xl mx-auto">Our top-rated ethical hackers with verified skills and successful projects</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hackers.map((hacker) => (
            <div key={hacker.id} className="bg-card rounded-lg overflow-hidden transition-all duration-300 hover:border-secondary border border-transparent">
              <div className="h-40 bg-primary relative overflow-hidden">
                <div className="w-full h-full bg-primary/50 flex items-center justify-center">
                  <span className="text-light-text">Profile Background</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2 flex justify-between items-center">
                  {hacker.available && (
                    <Badge variant="outline" className="bg-green-600 text-white hover:bg-green-700">
                      Available
                    </Badge>
                  )}
                  <Badge variant="outline" className="bg-dark text-secondary hover:bg-dark/90">
                    ★ {hacker.rating} ({hacker.reviewCount})
                  </Badge>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <Avatar className="h-12 w-12 border-2 border-secondary mr-3">
                    <AvatarFallback>{hacker.imagePlaceholder}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-bold text-white">{hacker.name}</h3>
                    <p className="text-secondary text-sm">{hacker.title}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {hacker.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="bg-primary text-secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <Link href={`/hackers/${hacker.id}`}>
                  <Button variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary hover:text-primary">
                    View Profile
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/hackers">
            <Button variant="outline" className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-primary font-bold px-8 py-6">
              BROWSE ALL HACKERS
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedHackers;
