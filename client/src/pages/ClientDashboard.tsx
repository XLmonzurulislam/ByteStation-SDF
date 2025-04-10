import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import {
  Clock,
  User,
  FileText,
  Shield,
  Activity,
  Bell,
  Settings,
  ExternalLink,
  ChevronRight
} from "lucide-react";

// Mock data for initial rendering
const initialDashboardData = {
  user: {
    name: "John Doe",
    company: "Acme Corporation",
    email: "john@acmecorp.com",
    avatar: "JD"
  },
  stats: {
    activeProjects: 3,
    completedProjects: 5,
    pendingReports: 2,
    securityScore: 78
  },
  activeProjects: [
    {
      id: 1,
      title: "Web Application Security Audit",
      status: "In Progress",
      progress: 65,
      hacker: {
        id: 101,
        name: "Alex Morgan",
        avatar: "AM"
      },
      dueDate: "2023-06-15",
      budget: "$2,500"
    },
    {
      id: 2,
      title: "Network Infrastructure Assessment",
      status: "In Progress",
      progress: 40,
      hacker: {
        id: 102,
        name: "Sarah Chen",
        avatar: "SC"
      },
      dueDate: "2023-06-22",
      budget: "$3,200"
    },
    {
      id: 3,
      title: "Mobile App Penetration Test",
      status: "Just Started",
      progress: 10,
      hacker: {
        id: 103,
        name: "David Kumar",
        avatar: "DK"
      },
      dueDate: "2023-07-05",
      budget: "$1,800"
    }
  ],
  notifications: [
    {
      id: 1,
      message: "Alex Morgan submitted a report for Web Application Security Audit",
      time: "2 hours ago",
      read: false
    },
    {
      id: 2,
      message: "Sarah Chen requested access to development environment",
      time: "6 hours ago",
      read: false
    },
    {
      id: 3,
      message: "Project 'Network Infrastructure Assessment' is 40% complete",
      time: "1 day ago",
      read: true
    },
    {
      id: 4,
      message: "New vulnerability found in Web Application Security Audit",
      time: "2 days ago",
      read: true
    }
  ]
};

const ClientDashboard = () => {
  // Fetch dashboard data
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['/api/client/dashboard'],
    queryFn: async () => {
      const response = await fetch('/api/client/dashboard', {
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }
      return response.json();
    }
  });
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-light-text">Loading dashboard...</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Client Dashboard</h1>
          <p className="text-light-text">Welcome back, {dashboardData.user.name}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link href="/submit-project">
            <Button className="bg-secondary text-primary hover:bg-secondary/90">
              Post New Project
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-card border-gray-700">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-light-text">Active Projects</p>
                <h3 className="text-3xl font-bold text-white">{dashboardData.stats.activeProjects}</h3>
              </div>
              <div className="bg-primary/40 p-3 rounded-full">
                <FileText className="h-6 w-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-gray-700">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-light-text">Completed Projects</p>
                <h3 className="text-3xl font-bold text-white">{dashboardData.stats.completedProjects}</h3>
              </div>
              <div className="bg-primary/40 p-3 rounded-full">
                <Shield className="h-6 w-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-gray-700">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-light-text">Pending Reports</p>
                <h3 className="text-3xl font-bold text-white">{dashboardData.stats.pendingReports}</h3>
              </div>
              <div className="bg-primary/40 p-3 rounded-full">
                <Clock className="h-6 w-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-gray-700">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-light-text">Security Score</p>
                <h3 className="text-3xl font-bold text-white">{dashboardData.stats.securityScore}/100</h3>
              </div>
              <div className="bg-primary/40 p-3 rounded-full">
                <Activity className="h-6 w-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Projects */}
        <div className="lg:col-span-2">
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex justify-between items-center">
                <span>Active Projects</span>
                <Link href="/projects" className="text-secondary text-sm flex items-center">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {dashboardData.activeProjects.map((project) => (
                  <div key={project.id} className="border-b border-gray-700 pb-6 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-white font-bold">{project.title}</h3>
                      <Badge 
                        variant="outline" 
                        className={`
                          ${project.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400 border-blue-500/50' : 
                            project.status === 'Just Started' ? 'bg-orange-500/20 text-orange-400 border-orange-500/50' : 
                            'bg-green-500/20 text-green-400 border-green-500/50'}
                        `}
                      >
                        {project.status}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarFallback>{project.hacker.avatar}</AvatarFallback>
                        </Avatar>
                        <Link href={`/hackers/${project.hacker.id}`}>
                          <span className="text-secondary text-sm">{project.hacker.name}</span>
                        </Link>
                      </div>
                      <div className="text-light-text text-sm">
                        Due: {new Date(project.dueDate).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm mb-2">
                      <span className="text-light-text">Progress: {project.progress}%</span>
                      <span className="text-light-text">Budget: {project.budget}</span>
                    </div>
                    
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-secondary h-2 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/submit-project" className="w-full">
                <Button className="w-full bg-secondary text-primary hover:bg-secondary/90">
                  Start New Project
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* User Card */}
          <Card className="bg-card border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Avatar className="h-16 w-16 mr-4">
                  <AvatarFallback>{dashboardData.user.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-white font-bold">{dashboardData.user.name}</h3>
                  <p className="text-secondary">{dashboardData.user.company}</p>
                  <p className="text-light-text text-sm">{dashboardData.user.email}</p>
                </div>
              </div>
              <div className="mt-4">
                <Link href="/profile/settings">
                  <Button variant="outline" className="w-full border-gray-700 text-light-text hover:bg-gray-700">
                    <Settings className="h-4 w-4 mr-2" /> Account Settings
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          {/* Notifications */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex justify-between items-center">
                <span>Notifications</span>
                <Badge variant="outline" className="bg-primary text-secondary border-secondary">
                  {dashboardData.notifications.filter(n => !n.read).length} New
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`border-l-2 pl-3 py-1 ${
                      notification.read ? 'border-gray-700' : 'border-secondary'
                    }`}
                  >
                    <p className={`${notification.read ? 'text-light-text' : 'text-white'}`}>
                      {notification.message}
                    </p>
                    <p className="text-gray-500 text-xs">{notification.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/notifications" className="w-full">
                <Button variant="outline" className="w-full border-gray-700 text-light-text hover:bg-gray-700">
                  <Bell className="h-4 w-4 mr-2" /> View All Notifications
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          {/* Quick Links */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Quick Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link href="/projects" className="flex items-center text-light-text hover:text-secondary py-2">
                  <FileText className="h-4 w-4 mr-3" /> My Projects
                </Link>
                <Link href="/reports" className="flex items-center text-light-text hover:text-secondary py-2">
                  <Shield className="h-4 w-4 mr-3" /> Security Reports
                </Link>
                <Link href="/hackers" className="flex items-center text-light-text hover:text-secondary py-2">
                  <User className="h-4 w-4 mr-3" /> Find Hackers
                </Link>
                <Link href="/resources" className="flex items-center text-light-text hover:text-secondary py-2">
                  <ExternalLink className="h-4 w-4 mr-3" /> Security Resources
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
