import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { File, Search, Download, ExternalLink, ShieldAlert, Calendar, UserCheck, Filter, FileBarChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { queryClient } from "@/lib/queryClient";

// Type for security reports
type SecurityReport = {
  id: number;
  title: string;
  date: string;
  type: "vulnerability" | "assessment" | "pentest" | "compliance";
  severity: "critical" | "high" | "medium" | "low" | "info";
  status: "new" | "reviewed" | "fixed" | "verified";
  projectId: number;
  projectName: string;
  summary: string;
  author: string;
  downloadUrl?: string;
};

export default function SecurityReports() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedSeverity, setSelectedSeverity] = useState<string | null>(null);

  // Fetch reports (would be integrated with real API)
  const { data: reports = [], isLoading } = useQuery<SecurityReport[]>({
    queryKey: ["/api/reports"],
    queryFn: async () => {
      // This is a mock implementation - in a real application, this would call a backend API
      return [
        {
          id: 1,
          title: "Q1 Security Assessment Report",
          date: "2025-03-21",
          type: "assessment",
          severity: "medium",
          status: "reviewed",
          projectId: 101,
          projectName: "E-Commerce Platform",
          summary: "Quarterly security assessment identifying 3 medium and 5 low vulnerabilities in the authentication system.",
          author: "Alice Johnson",
          downloadUrl: "#"
        },
        {
          id: 2,
          title: "Critical API Vulnerability",
          date: "2025-03-15",
          type: "vulnerability",
          severity: "critical",
          status: "fixed",
          projectId: 101,
          projectName: "E-Commerce Platform",
          summary: "SQL injection vulnerability discovered in the product search API endpoint that could allow unauthorized data access.",
          author: "Mark Wilson",
          downloadUrl: "#"
        },
        {
          id: 3,
          title: "Payment Gateway Integration Pentest",
          date: "2025-02-28",
          type: "pentest",
          severity: "high",
          status: "new",
          projectId: 102,
          projectName: "Payment System",
          summary: "Penetration testing identified potential XSS vulnerability in the checkout form that could lead to session hijacking.",
          author: "Sam Taylor",
          downloadUrl: "#"
        },
        {
          id: 4,
          title: "AWS Infrastructure Security Assessment",
          date: "2025-02-15",
          type: "assessment",
          severity: "medium",
          status: "reviewed",
          projectId: 103,
          projectName: "Cloud Migration",
          summary: "Assessment of AWS configuration identified several IAM permission issues and S3 bucket misconfiguration risks.",
          author: "Emma Clarke",
          downloadUrl: "#"
        },
        {
          id: 5,
          title: "GDPR Compliance Audit",
          date: "2025-01-30",
          type: "compliance",
          severity: "info",
          status: "verified",
          projectId: 101,
          projectName: "E-Commerce Platform",
          summary: "Review of data handling practices against GDPR requirements. Several recommendations for improving user data management.",
          author: "James Smith",
          downloadUrl: "#"
        },
      ];
    },
    // This is just for demonstration purposes - in a real app,
    // you would want to handle errors properly and manage refetching
    retry: false,
  });

  // Filter reports based on search query and filters
  const filteredReports = reports.filter(report => {
    // Search filter
    const matchesSearch = searchQuery === "" || 
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.projectName.toLowerCase().includes(searchQuery.toLowerCase());

    // Type filter
    const matchesType = selectedType === null || report.type === selectedType;

    // Severity filter
    const matchesSeverity = selectedSeverity === null || report.severity === selectedSeverity;

    return matchesSearch && matchesType && matchesSeverity;
  });

  // Function to get severity badge variant
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <Badge variant="destructive" className="font-medium">Critical</Badge>;
      case 'high':
        return <Badge variant="destructive" className="bg-orange-600 font-medium">High</Badge>;
      case 'medium':
        return <Badge variant="outline" className="border-amber-500 bg-amber-500/20 text-amber-500 font-medium">Medium</Badge>;
      case 'low':
        return <Badge variant="outline" className="border-blue-500 bg-blue-500/20 text-blue-500 font-medium">Low</Badge>;
      case 'info':
        return <Badge variant="outline" className="border-gray-500 bg-gray-500/20 text-gray-400 font-medium">Info</Badge>;
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };

  // Function to get status badge variant
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-blue-500 font-medium">New</Badge>;
      case 'reviewed':
        return <Badge className="bg-purple-600 font-medium">Reviewed</Badge>;
      case 'fixed':
        return <Badge className="bg-green-600 font-medium">Fixed</Badge>;
      case 'verified':
        return <Badge variant="success" className="font-medium">Verified</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Function to get type icon
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'vulnerability':
        return <ShieldAlert className="h-4 w-4 mr-1" />;
      case 'assessment':
        return <FileBarChart className="h-4 w-4 mr-1" />;
      case 'pentest':
        return <UserCheck className="h-4 w-4 mr-1" />;
      case 'compliance':
        return <File className="h-4 w-4 mr-1" />;
      default:
        return <File className="h-4 w-4 mr-1" />;
    }
  };

  return (
    <div className="container py-10">
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Security Reports</h1>
          <p className="text-muted-foreground">
            View and manage security reports for your projects
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input 
              placeholder="Search reports..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select onValueChange={(value) => setSelectedType(value === "all" ? null : value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="vulnerability">Vulnerability</SelectItem>
                <SelectItem value="assessment">Assessment</SelectItem>
                <SelectItem value="pentest">Penetration Test</SelectItem>
                <SelectItem value="compliance">Compliance</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={(value) => setSelectedSeverity(value === "all" ? null : value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="info">Info</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center p-8">
              <div className="animate-pulse text-center">
                <p className="text-muted-foreground">Loading reports...</p>
              </div>
            </div>
          ) : filteredReports.length === 0 ? (
            <div className="text-center p-8 border rounded-lg border-dashed">
              <File className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium">No reports found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchQuery || selectedType || selectedSeverity ? 
                  "Try adjusting your filters or search query." : 
                  "No security reports are available for your projects yet."}
              </p>
            </div>
          ) : (
            filteredReports.map((report) => (
              <Card key={report.id} className="bg-card border-gray-700 hover:bg-gray-800/50 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="text-white flex items-center">
                        {getTypeIcon(report.type)}
                        {report.title}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <span className="flex items-center">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          {new Date(report.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                        <span>•</span>
                        <span>{report.projectName}</span>
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      {getSeverityBadge(report.severity)}
                      {getStatusBadge(report.status)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-light-text">{report.summary}</p>
                  <div className="mt-2 text-sm text-gray-400">
                    Prepared by: {report.author}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  {report.downloadUrl && (
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}