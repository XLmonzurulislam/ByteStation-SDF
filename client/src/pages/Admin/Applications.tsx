import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MoreVertical, 
  Eye, 
  Clock,
  CheckCircle,
  XCircle,
  Filter,
  FileText,
  Calendar,
  DollarSign,
  User
} from "lucide-react";
import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/AdminSidebar";
import type { Application, Project } from "@shared/schema";

export default function AdminApplications() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  
  // Fetch all applications (in a real app, this would paginate)
  const { data: applications = [], isLoading } = useQuery<Application[]>({
    queryKey: ['/api/applications'],
    // In a real app, this would connect to the API
    queryFn: async () => {
      // Mock data for demonstration
      return [];
    },
    enabled: true,
  });
  
  // Filter applications based on search term and status filter
  const filteredApplications = applications.filter(app => {
    const matchesSearch = searchTerm === "" || 
      app.projectId.toString().includes(searchTerm) ||
      app.hackerId.toString().includes(searchTerm);
    
    const matchesStatus = statusFilter === null || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Common application statuses for filtering
  const applicationStatuses = ["pending", "accepted", "rejected", "in-review"];
  
  // For the demo, we'll create sample data
  const sampleApplications = [
    { 
      id: 1, 
      hackerId: 4, 
      projectId: 101, 
      status: "pending", 
      hackerName: "John Doe", 
      projectTitle: "Security Audit for E-commerce Platform", 
      submittedDate: "2025-03-28", 
      amount: "$1,200"
    },
    { 
      id: 2, 
      hackerId: 7, 
      projectId: 102, 
      status: "accepted", 
      hackerName: "Alice Smith", 
      projectTitle: "Penetration Testing for Banking App", 
      submittedDate: "2025-03-25", 
      amount: "$2,500"
    },
    { 
      id: 3, 
      hackerId: 12, 
      projectId: 103, 
      status: "rejected", 
      hackerName: "Robert Johnson", 
      projectTitle: "Security Code Review", 
      submittedDate: "2025-03-20", 
      amount: "$800"
    },
    { 
      id: 4, 
      hackerId: 9, 
      projectId: 104, 
      status: "in-review", 
      hackerName: "Emily Williams", 
      projectTitle: "Vulnerability Assessment", 
      submittedDate: "2025-03-30", 
      amount: "$1,500"
    },
    { 
      id: 5, 
      hackerId: 15, 
      projectId: 105, 
      status: "pending", 
      hackerName: "Michael Brown", 
      projectTitle: "Network Security Audit", 
      submittedDate: "2025-03-29", 
      amount: "$1,800"
    }
  ];
  
  const viewApplicationDetails = (appId: number) => {
    // In a real app, you would fetch application details from API
    const app = sampleApplications.find(a => a.id === appId);
    if (app) {
      setSelectedApplication(app as unknown as Application);
      setIsViewDialogOpen(true);
    }
  };
  
  return (
    <div className="flex min-h-screen bg-slate-950">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader title="Application Management" />
        <main className="flex-1 p-6 overflow-auto">
          <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Project Applications</h1>
                <p className="text-muted-foreground">
                  Manage applications from ethical hackers for client projects
                </p>
              </div>
            </div>
            
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by project or hacker ID..."
                  className="pl-8 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {applicationStatuses.map(status => (
                  <Button 
                    key={status}
                    variant={statusFilter === status ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setStatusFilter(statusFilter === status ? null : status)}
                  >
                    {status === "pending" && <Clock className="mr-2 h-4 w-4" />}
                    {status === "accepted" && <CheckCircle className="mr-2 h-4 w-4" />}
                    {status === "rejected" && <XCircle className="mr-2 h-4 w-4" />}
                    {status === "in-review" && <Eye className="mr-2 h-4 w-4" />}
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Applications Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">ID</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Hacker</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    // Loading skeleton
                    Array.from({ length: 5 }).map((_, i) => (
                      <TableRow key={`loading-${i}`}>
                        {Array.from({ length: 7 }).map((_, j) => (
                          <TableCell key={`loading-cell-${i}-${j}`}>
                            <div className="h-4 w-full bg-slate-800 rounded animate-pulse" />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : filteredApplications.length > 0 ? (
                    filteredApplications.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell className="font-medium">{app.id}</TableCell>
                        <TableCell>{app.projectId}</TableCell>
                        <TableCell>{app.hackerId}</TableCell>
                        <TableCell>{app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "N/A"}</TableCell>
                        <TableCell>{app.priceQuote}</TableCell>
                        <TableCell>
                          <Badge variant={
                            app.status === "accepted" ? "success" : 
                            app.status === "rejected" ? "destructive" : 
                            app.status === "in-review" ? "default" : 
                            "secondary"
                          }>
                            {app.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => viewApplicationDetails(app.id)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                Accept
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <XCircle className="mr-2 h-4 w-4 text-red-500" />
                                Reject
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    // If no real data, show sample data
                    sampleApplications
                      .filter(app => {
                        return statusFilter === null || app.status === statusFilter;
                      })
                      .map((app) => (
                        <TableRow key={app.id}>
                          <TableCell className="font-medium">{app.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span>{app.projectTitle}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-xs font-medium">
                                {app.hackerName.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span>{app.hackerName}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>{app.submittedDate}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-muted-foreground" />
                              <span>{app.amount}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={
                              app.status === "accepted" ? "success" : 
                              app.status === "rejected" ? "destructive" : 
                              app.status === "in-review" ? "default" : 
                              "secondary"
                            }>
                              {app.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => viewApplicationDetails(app.id)}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                  Accept
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <XCircle className="mr-2 h-4 w-4 text-red-500" />
                                  Reject
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
            </div>
            
            {/* Pagination (simplified for demo) */}
            <div className="flex items-center justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                disabled
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="px-4"
              >
                1
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled
              >
                Next
              </Button>
            </div>
          </div>
        </main>
      </div>
      
      {/* View Application Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
            <DialogDescription>
              Review the details of this project application
            </DialogDescription>
          </DialogHeader>
          
          {selectedApplication && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Project</h3>
                  <p className="text-base">
                    {(selectedApplication as any).projectTitle || `Project #${selectedApplication.projectId}`}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                  <Badge variant={
                    selectedApplication.status === "accepted" ? "success" : 
                    selectedApplication.status === "rejected" ? "destructive" : 
                    selectedApplication.status === "in-review" ? "default" : 
                    "secondary"
                  }>
                    {selectedApplication.status}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Hacker</h3>
                  <p className="text-base flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    {(selectedApplication as any).hackerName || `Hacker #${selectedApplication.hackerId}`}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Submitted</h3>
                  <p className="text-base flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {(selectedApplication as any).submittedDate || (selectedApplication.createdAt ? new Date(selectedApplication.createdAt).toLocaleDateString() : "N/A")}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Quote</h3>
                  <p className="text-base flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    {(selectedApplication as any).amount || selectedApplication.priceQuote}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Timeframe</h3>
                  <p className="text-base">{selectedApplication.estimatedTime}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Proposal</h3>
                <div className="p-3 bg-slate-900 rounded-md border text-sm">
                  {selectedApplication.proposal}
                </div>
              </div>
              
              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Close
                </Button>
                <Button variant="destructive">
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject
                </Button>
                <Button>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Accept
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}