import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Search, BookOpen, FileText, Video, Globe, Clock, Tag, Download, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/use-auth";

// Type for security resources
type SecurityResource = {
  id: number;
  title: string;
  type: "guide" | "tool" | "video" | "article" | "template" | "checklist";
  tags: string[];
  description: string;
  url: string;
  premium: boolean;
  author?: string;
  authorAvatar?: string;
  publishDate?: string;
  readTime?: string;
  featured?: boolean;
};

export default function SecurityResources() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  
  // Fetch resources (would be integrated with real API)
  const { data: resources = [], isLoading } = useQuery<SecurityResource[]>({
    queryKey: ["/api/resources"],
    queryFn: async () => {
      // This is a mock implementation - in a real application, this would call a backend API
      return [
        {
          id: 1,
          title: "Secure Coding Practices for Modern Web Applications",
          type: "guide",
          tags: ["coding", "web-security", "best-practices"],
          description: "A comprehensive guide covering essential secure coding practices to protect web applications from common vulnerabilities including XSS, CSRF, SQL Injection, and more.",
          url: "#",
          premium: false,
          author: "James Wilson",
          authorAvatar: "",
          publishDate: "2025-03-10",
          readTime: "15 min",
          featured: true
        },
        {
          id: 2,
          title: "OWASP Top 10 Explained",
          type: "article",
          tags: ["owasp", "vulnerabilities", "security-basics"],
          description: "Detailed breakdown of the latest OWASP Top 10 security risks with real-world examples and mitigations.",
          url: "#",
          premium: false,
          author: "Maria Garcia",
          authorAvatar: "",
          publishDate: "2025-02-24",
          readTime: "12 min"
        },
        {
          id: 3,
          title: "Advanced SQL Injection Prevention Techniques",
          type: "video",
          tags: ["sql-injection", "databases", "advanced"],
          description: "Video tutorial demonstrating advanced techniques to prevent SQL injection attacks in different database environments.",
          url: "#",
          premium: true,
          author: "Alex Johnson",
          authorAvatar: "",
          publishDate: "2025-02-15",
          readTime: "28 min"
        },
        {
          id: 4,
          title: "Security Threat Modeling Template",
          type: "template",
          tags: ["threat-modeling", "planning", "documentation"],
          description: "Ready-to-use template for conducting thorough security threat modeling sessions with your development team.",
          url: "#",
          premium: true,
          publishDate: "2025-01-20"
        },
        {
          id: 5,
          title: "Cloud Security Posture Assessment Tool",
          type: "tool",
          tags: ["cloud", "aws", "azure", "assessment"],
          description: "Automated tool to evaluate your cloud infrastructure security against industry best practices and compliance requirements.",
          url: "#",
          premium: true,
          publishDate: "2025-01-05"
        },
        {
          id: 6,
          title: "Application Security Testing Checklist",
          type: "checklist",
          tags: ["testing", "qa", "deployment"],
          description: "Comprehensive checklist to ensure you've covered all security aspects before deploying applications to production.",
          url: "#",
          premium: false,
          publishDate: "2024-12-15",
          readTime: "5 min"
        },
        {
          id: 7,
          title: "Implementing Zero Trust Architecture",
          type: "guide",
          tags: ["zero-trust", "architecture", "network-security"],
          description: "Step-by-step guide to implementing zero trust security principles in your organization's infrastructure.",
          url: "#",
          premium: true,
          author: "David Chen",
          authorAvatar: "",
          publishDate: "2024-12-01",
          readTime: "20 min"
        },
      ];
    },
    // This is just for demonstration purposes - in a real app,
    // you would want to handle errors properly and manage refetching
    retry: false,
  });

  // Filter resources based on search query and type filter
  const filteredResources = resources.filter(resource => {
    // Search filter
    const matchesSearch = searchQuery === "" || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    // Type filter
    const matchesType = selectedType === null || resource.type === selectedType;

    return matchesSearch && matchesType;
  });

  // Get featured resources
  const featuredResources = resources.filter(resource => resource.featured);

  // Group resources by type for the tabs
  const getResourcesByType = (type: string) => {
    return filteredResources.filter(resource => resource.type === type);
  };

  // Function to render resource type icon
  const getResourceTypeIcon = (type: string) => {
    switch (type) {
      case 'guide':
        return <BookOpen className="h-4 w-4" />;
      case 'article':
        return <FileText className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'tool':
        return <Globe className="h-4 w-4" />;
      case 'template':
        return <FileText className="h-4 w-4" />;
      case 'checklist':
        return <CheckCircle2 className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  // Function to get a human-readable resource type
  const getResourceTypeText = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <div className="container py-10">
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Security Resources</h1>
          <p className="text-muted-foreground">
            Browse our collection of security resources, guides, and tools
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input 
              placeholder="Search resources..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div>
            <Select onValueChange={(value) => setSelectedType(value === "all" ? null : value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="guide">Guides</SelectItem>
                <SelectItem value="article">Articles</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="tool">Tools</SelectItem>
                <SelectItem value="template">Templates</SelectItem>
                <SelectItem value="checklist">Checklists</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Featured Resources */}
        {featuredResources.length > 0 && searchQuery === "" && selectedType === null && (
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-white">Featured Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredResources.map((resource) => (
                <Card key={resource.id} className="bg-card border-gray-700 hover:bg-gray-800/50 transition-colors overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <Badge variant="outline" className="flex gap-1.5 items-center">
                        {getResourceTypeIcon(resource.type)}
                        {getResourceTypeText(resource.type)}
                      </Badge>
                      {resource.premium && (
                        <Badge className="bg-amber-500 text-black font-medium">Premium</Badge>
                      )}
                    </div>
                    <CardTitle className="text-white mt-2">{resource.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-light-text line-clamp-3">{resource.description}</p>
                    
                    {resource.tags && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {resource.tags.map((tag, i) => (
                          <Badge key={i} variant="outline" className="text-xs bg-transparent">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    {resource.author && (
                      <div className="flex items-center mt-4">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarFallback className="text-xs bg-primary text-black">
                            {resource.author.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-400">{resource.author}</span>
                        
                        {resource.publishDate && (
                          <>
                            <span className="mx-1 text-gray-500">•</span>
                            <span className="text-sm text-gray-500">
                              {new Date(resource.publishDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </>
                        )}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-secondary text-primary hover:bg-secondary/90">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Access Resource
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Resources */}
        {isLoading ? (
          <div className="flex justify-center p-8">
            <div className="animate-pulse text-center">
              <p className="text-muted-foreground">Loading resources...</p>
            </div>
          </div>
        ) : filteredResources.length === 0 ? (
          <div className="text-center p-8 border rounded-lg border-dashed">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium">No resources found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search query or filter.
            </p>
          </div>
        ) : (
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="guides">Guides</TabsTrigger>
              <TabsTrigger value="articles">Articles</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="tools">Tools & Templates</TabsTrigger>
            </TabsList>
            
            {/* All Resources Tab */}
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredResources.map((resource) => (
                  <Card key={resource.id} className="bg-card border-gray-700 hover:bg-gray-800/50 transition-colors flex flex-col">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <Badge variant="outline" className="flex gap-1.5 items-center">
                          {getResourceTypeIcon(resource.type)}
                          {getResourceTypeText(resource.type)}
                        </Badge>
                        {resource.premium && (
                          <Badge className="bg-amber-500 text-black font-medium">Premium</Badge>
                        )}
                      </div>
                      <CardTitle className="text-white mt-2">{resource.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-light-text line-clamp-3">{resource.description}</p>
                      
                      {resource.tags && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {resource.tags.map((tag, i) => (
                            <Badge key={i} variant="outline" className="text-xs bg-transparent">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center mt-4 text-sm text-gray-500">
                        {resource.publishDate && (
                          <span className="flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            {new Date(resource.publishDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        )}
                        
                        {resource.readTime && (
                          <span className="flex items-center ml-3">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            {resource.readTime}
                          </span>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          {resource.type === 'template' || resource.type === 'checklist' 
                            ? 'Download' 
                            : resource.type === 'tool' 
                              ? 'Access Tool' 
                              : 'Read More'}
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Guides Tab */}
            <TabsContent value="guides">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getResourcesByType('guide').map((resource) => (
                  <Card key={resource.id} className="bg-card border-gray-700 hover:bg-gray-800/50 transition-colors flex flex-col">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <Badge variant="outline" className="flex gap-1.5 items-center">
                          <BookOpen className="h-4 w-4" />
                          Guide
                        </Badge>
                        {resource.premium && (
                          <Badge className="bg-amber-500 text-black font-medium">Premium</Badge>
                        )}
                      </div>
                      <CardTitle className="text-white mt-2">{resource.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-light-text line-clamp-3">{resource.description}</p>
                      
                      {resource.tags && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {resource.tags.map((tag, i) => (
                            <Badge key={i} variant="outline" className="text-xs bg-transparent">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center mt-4 text-sm text-gray-500">
                        {resource.publishDate && (
                          <span className="flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            {new Date(resource.publishDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        )}
                        
                        {resource.readTime && (
                          <span className="flex items-center ml-3">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            {resource.readTime}
                          </span>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Read Guide
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Articles Tab */}
            <TabsContent value="articles">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getResourcesByType('article').map((resource) => (
                  <Card key={resource.id} className="bg-card border-gray-700 hover:bg-gray-800/50 transition-colors flex flex-col">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <Badge variant="outline" className="flex gap-1.5 items-center">
                          <FileText className="h-4 w-4" />
                          Article
                        </Badge>
                        {resource.premium && (
                          <Badge className="bg-amber-500 text-black font-medium">Premium</Badge>
                        )}
                      </div>
                      <CardTitle className="text-white mt-2">{resource.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-light-text line-clamp-3">{resource.description}</p>
                      
                      {resource.tags && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {resource.tags.map((tag, i) => (
                            <Badge key={i} variant="outline" className="text-xs bg-transparent">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      {resource.author && (
                        <div className="flex items-center mt-4">
                          <Avatar className="h-6 w-6 mr-2">
                            <AvatarFallback className="text-xs bg-primary text-black">
                              {resource.author.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-gray-400">{resource.author}</span>
                          
                          {resource.publishDate && (
                            <>
                              <span className="mx-1 text-gray-500">•</span>
                              <span className="text-sm text-gray-500">
                                {new Date(resource.publishDate).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                            </>
                          )}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Read Article
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Videos Tab */}
            <TabsContent value="videos">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getResourcesByType('video').map((resource) => (
                  <Card key={resource.id} className="bg-card border-gray-700 hover:bg-gray-800/50 transition-colors flex flex-col">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <Badge variant="outline" className="flex gap-1.5 items-center">
                          <Video className="h-4 w-4" />
                          Video
                        </Badge>
                        {resource.premium && (
                          <Badge className="bg-amber-500 text-black font-medium">Premium</Badge>
                        )}
                      </div>
                      <CardTitle className="text-white mt-2">{resource.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-light-text line-clamp-3">{resource.description}</p>
                      
                      {resource.tags && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {resource.tags.map((tag, i) => (
                            <Badge key={i} variant="outline" className="text-xs bg-transparent">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center mt-4 text-sm text-gray-500">
                        {resource.author && (
                          <span className="text-gray-400 mr-2">{resource.author}</span>
                        )}
                        
                        {resource.readTime && (
                          <span className="flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            {resource.readTime}
                          </span>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          <Video className="h-4 w-4 mr-2" />
                          Watch Video
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Tools & Templates Tab */}
            <TabsContent value="tools">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...getResourcesByType('tool'), ...getResourcesByType('template'), ...getResourcesByType('checklist')].map((resource) => (
                  <Card key={resource.id} className="bg-card border-gray-700 hover:bg-gray-800/50 transition-colors flex flex-col">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <Badge variant="outline" className="flex gap-1.5 items-center">
                          {getResourceTypeIcon(resource.type)}
                          {getResourceTypeText(resource.type)}
                        </Badge>
                        {resource.premium && (
                          <Badge className="bg-amber-500 text-black font-medium">Premium</Badge>
                        )}
                      </div>
                      <CardTitle className="text-white mt-2">{resource.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-light-text line-clamp-3">{resource.description}</p>
                      
                      {resource.tags && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {resource.tags.map((tag, i) => (
                            <Badge key={i} variant="outline" className="text-xs bg-transparent">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      {resource.publishDate && (
                        <div className="flex items-center mt-4 text-sm text-gray-500">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          {new Date(resource.publishDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          {resource.type === 'template' || resource.type === 'checklist' ? (
                            <>
                              <Download className="h-4 w-4 mr-2" />
                              Download 
                            </>
                          ) : (
                            <>
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Access Tool
                            </>
                          )}
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}