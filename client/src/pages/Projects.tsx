import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, DollarSign, Clock, Search, Filter } from "lucide-react";

// Mock data for initial rendering
const initialProjects = [
  {
    id: 1,
    title: "Web Application Penetration Testing",
    description: "Looking for an experienced ethical hacker to perform comprehensive penetration testing on our e-commerce platform.",
    budget: "$1,500 - $2,500",
    duration: "2 weeks",
    postedDate: "2023-05-15",
    skills: ["Web Security", "OWASP Top 10", "API Testing"],
    status: "Open"
  },
  {
    id: 2,
    title: "Network Infrastructure Security Audit",
    description: "Need a thorough security audit of our network infrastructure to identify potential vulnerabilities and provide remediation recommendations.",
    budget: "$3,000 - $5,000",
    duration: "3 weeks",
    postedDate: "2023-05-12",
    skills: ["Network Security", "Firewall Configuration", "VPN Security"],
    status: "Open"
  },
  {
    id: 3,
    title: "Mobile Application Security Assessment",
    description: "Seeking a security expert to assess our iOS and Android applications for security vulnerabilities and provide remediation guidance.",
    budget: "$2,000 - $3,500",
    duration: "2-3 weeks",
    postedDate: "2023-05-10",
    skills: ["Mobile Security", "iOS Security", "Android Security"],
    status: "Open"
  },
  {
    id: 4,
    title: "Cloud Infrastructure Security Review",
    description: "Looking for an AWS security specialist to review our cloud infrastructure setup and recommend security improvements.",
    budget: "$2,500 - $4,000",
    duration: "2 weeks",
    postedDate: "2023-05-08",
    skills: ["AWS Security", "Cloud Security", "DevSecOps"],
    status: "Open"
  }
];

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Fetch projects from API
  const { data: rawProjects = [], isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await fetch('/api/projects', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      console.log('Projects data:', data);
      return data || [];
    }
  });
  
  // Format projects to ensure they have the right structure
  const projects = Array.isArray(rawProjects) ? rawProjects.map(project => ({
    id: project.id,
    title: project.title || "Untitled Project",
    description: project.description || "No description provided",
    budget: project.budget || "Budget not specified",
    duration: project.timeframe || "Timeline not specified",
    postedDate: project.createdAt ? new Date(project.createdAt).toISOString() : new Date().toISOString(),
    skills: Array.isArray(project.skills) ? project.skills : [],
    status: project.status || "Open"
  })) : [];
  
  // Filter projects based on search term
  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (Array.isArray(project.skills) && project.skills.some(skill => 
      typeof skill === 'string' && skill.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  );
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Browse Security Projects</h1>
        <p className="text-light-text max-w-2xl mx-auto">Find ethical hacking and cybersecurity projects that match your skills</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by keywords, skills or project title"
            className="pl-10 bg-card border-gray-700 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-gray-700 text-white">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Link href="/submit-project">
            <Button className="bg-secondary text-primary hover:bg-secondary/90">
              Post a Project
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isLoading ? (
          <p className="text-center text-light-text col-span-2">Loading projects...</p>
        ) : filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <Card key={project.id} className="bg-card border-gray-700 shadow-lg hover:border-secondary transition-colors">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-white">{project.title}</CardTitle>
                  <Badge variant="outline" className="bg-green-600/20 text-green-400 border-green-500">
                    {project.status}
                  </Badge>
                </div>
                <CardDescription className="text-light-text">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-light-text">
                    <DollarSign className="h-4 w-4 mr-2 text-secondary" />
                    <span>{project.budget}</span>
                  </div>
                  <div className="flex items-center text-light-text">
                    <Clock className="h-4 w-4 mr-2 text-secondary" />
                    <span>{project.duration}</span>
                  </div>
                </div>
                <div className="flex items-center text-light-text mb-4">
                  <Calendar className="h-4 w-4 mr-2 text-secondary" />
                  <span>Posted on: {new Date(project.postedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="bg-primary/50 text-secondary border-secondary/50">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/projects/${project.id}`} className="w-full">
                  <Button variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary hover:text-primary">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="text-center text-light-text col-span-2">No projects found matching your search criteria</p>
        )}
      </div>
    </div>
  );
};

export default Projects;
