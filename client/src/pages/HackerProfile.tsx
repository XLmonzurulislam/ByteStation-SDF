import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter 
} from "@/components/ui/card";
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Star, 
  MapPin, 
  Clock, 
  CreditCard, 
  Shield, 
  Award, 
  Calendar, 
  MessageSquare 
} from "lucide-react";

// Mock data for initial rendering
const initialHackerProfile = {
  id: 1,
  name: "Alex Morgan",
  title: "Senior Penetration Tester",
  location: "San Francisco, CA",
  hourlyRate: "$120/hr",
  availability: "20 hrs/week",
  memberSince: "January 2020",
  verified: true,
  rating: 4.9,
  completedProjects: 78,
  description: "Experienced ethical hacker with over 8 years of experience in penetration testing, vulnerability assessment, and security consulting. Specialized in web application security, network security, and cloud infrastructure security. Certified OSCP, CEH, and AWS Security Specialist.",
  skills: [
    "Web Application Security",
    "Network Penetration Testing",
    "API Security",
    "Cloud Security (AWS, Azure)",
    "Mobile Application Security",
    "Source Code Review",
    "Social Engineering"
  ],
  certifications: [
    "Offensive Security Certified Professional (OSCP)",
    "Certified Ethical Hacker (CEH)",
    "AWS Security Specialist",
    "SANS GIAC Web Application Penetration Tester (GWAPT)"
  ],
  recentProjects: [
    {
      id: 101,
      title: "E-commerce Platform Security Assessment",
      description: "Performed comprehensive security assessment of a large e-commerce platform. Identified and helped remediate 12 critical vulnerabilities.",
      date: "April 2023"
    },
    {
      id: 102,
      title: "Banking Application Penetration Test",
      description: "Conducted thorough penetration testing of a mobile banking application. Found and helped fix multiple authentication and API security issues.",
      date: "February 2023"
    },
    {
      id: 103,
      title: "Cloud Infrastructure Security Review",
      description: "Reviewed AWS infrastructure security for a healthcare startup. Provided detailed recommendations to improve security posture.",
      date: "December 2022"
    }
  ],
  reviews: [
    {
      id: 201,
      clientName: "David Wilson",
      clientCompany: "TechSolutions Inc.",
      rating: 5,
      comment: "Alex was exceptional. His thorough penetration testing uncovered several critical vulnerabilities that our internal team missed. The report was detailed and actionable, and he was always available to explain findings and assist with remediation.",
      date: "May 2023"
    },
    {
      id: 202,
      clientName: "Jennifer Lee",
      clientCompany: "FinSecure",
      rating: 5,
      comment: "Working with Alex was a great experience. He has deep knowledge of security best practices and was able to quickly identify weaknesses in our application. Highly recommended!",
      date: "March 2023"
    },
    {
      id: 203,
      clientName: "Michael Brown",
      clientCompany: "HealthData Systems",
      rating: 4.5,
      comment: "Alex provided comprehensive security testing for our healthcare platform. His expertise in HIPAA compliance and security was invaluable. The only reason for not giving a full 5 stars is that the project took a bit longer than expected, but the quality of work was top-notch.",
      date: "January 2023"
    }
  ]
};

const HackerProfile = () => {
  const { id } = useParams();
  const [, navigate] = useLocation();
  
  // Fetch hacker profile data from API
  const { data: hacker = initialHackerProfile, isLoading, error } = useQuery({
    queryKey: [`/api/hackers/${id}`],
  });
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-light-text">Loading hacker profile...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-red-500">Error loading profile</p>
        <Button onClick={() => navigate('/hackers')} className="mt-4">
          Back to Hackers
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left column: Profile info */}
        <div className="md:col-span-1">
          <Card className="bg-card border-gray-700 sticky top-8">
            <CardHeader className="text-center">
              <Avatar className="h-24 w-24 mx-auto border-2 border-secondary">
                <AvatarFallback>{hacker.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-white mt-4">{hacker.name}</CardTitle>
              <CardDescription className="text-secondary">{hacker.title}</CardDescription>
              
              <div className="flex justify-center items-center mt-2">
                <Star className="text-yellow-400 h-4 w-4 mr-1" />
                <span className="text-white mr-1">{hacker.rating}</span>
                <span className="text-light-text">({hacker.completedProjects} projects)</span>
              </div>
              
              {hacker.verified && (
                <Badge variant="outline" className="bg-primary text-secondary border-secondary mt-2">
                  <Shield className="h-3 w-3 mr-1" /> Verified
                </Badge>
              )}
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <div className="flex items-center text-light-text">
                  <MapPin className="h-4 w-4 mr-2 text-secondary" />
                  <span>{hacker.location}</span>
                </div>
              </div>
              
              <div className="flex justify-between">
                <div className="flex items-center text-light-text">
                  <CreditCard className="h-4 w-4 mr-2 text-secondary" />
                  <span>{hacker.hourlyRate}</span>
                </div>
              </div>
              
              <div className="flex justify-between">
                <div className="flex items-center text-light-text">
                  <Clock className="h-4 w-4 mr-2 text-secondary" />
                  <span>{hacker.availability}</span>
                </div>
              </div>
              
              <div className="flex justify-between">
                <div className="flex items-center text-light-text">
                  <Calendar className="h-4 w-4 mr-2 text-secondary" />
                  <span>Member since {hacker.memberSince}</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col gap-3">
              <Button className="w-full bg-secondary text-primary hover:bg-secondary/90">
                <MessageSquare className="h-4 w-4 mr-2" /> 
                Contact
              </Button>
              <Button variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary hover:text-primary">
                Invite to Project
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Right column: Tabs with different sections */}
        <div className="md:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList className="bg-card border-gray-700 mb-6">
              <TabsTrigger value="overview" className="data-[state=active]:bg-secondary data-[state=active]:text-primary">Overview</TabsTrigger>
              <TabsTrigger value="projects" className="data-[state=active]:bg-secondary data-[state=active]:text-primary">Projects</TabsTrigger>
              <TabsTrigger value="reviews" className="data-[state=active]:bg-secondary data-[state=active]:text-primary">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <Card className="bg-card border-gray-700 mb-6">
                <CardHeader>
                  <CardTitle className="text-white">About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-light-text">{hacker.description}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-card border-gray-700 mb-6">
                <CardHeader>
                  <CardTitle className="text-white">Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {hacker.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="bg-primary/20 text-secondary border-secondary/50">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {hacker.certifications.map((cert, index) => (
                      <li key={index} className="flex items-start">
                        <Award className="h-5 w-5 mr-2 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-light-text">{cert}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="projects">
              <Card className="bg-card border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Recent Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {hacker.recentProjects.map((project) => (
                      <div key={project.id} className="border-b border-gray-700 pb-6 last:border-0 last:pb-0">
                        <h3 className="text-white font-bold mb-2">{project.title}</h3>
                        <p className="text-light-text mb-2">{project.description}</p>
                        <div className="flex items-center text-light-text text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-secondary" />
                          <span>{project.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews">
              <Card className="bg-card border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Client Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {hacker.reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-700 pb-6 last:border-0 last:pb-0">
                        <div className="flex items-center mb-2">
                          <div className="flex mr-2">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${
                                  i < Math.floor(review.rating) 
                                    ? 'text-yellow-400' 
                                    : i < review.rating 
                                      ? 'text-yellow-400/50' 
                                      : 'text-gray-500'
                                }`} 
                                fill={i < Math.floor(review.rating) ? 'currentColor' : 'none'}
                              />
                            ))}
                          </div>
                          <span className="text-white">{review.rating.toFixed(1)}</span>
                        </div>
                        <p className="text-light-text mb-3">"{review.comment}"</p>
                        <div className="flex justify-between text-sm">
                          <div className="text-white font-semibold">
                            {review.clientName} <span className="text-secondary font-normal">({review.clientCompany})</span>
                          </div>
                          <div className="text-light-text">{review.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default HackerProfile;
