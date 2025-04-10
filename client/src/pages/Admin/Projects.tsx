import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Project } from "@shared/schema";
import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/AdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search, MoreVertical, Trash, Eye, CheckCircle, XCircle, CircleDot, Timer } from "lucide-react";

interface NewProjectFormData {
  title: string;
  description: string;
  budget: string;
  timeframe: string;
  requirements: string;
}

function NewProjectDialog({ onOpenChange }: { onOpenChange: (open: boolean) => void }) {
  const [formData, setFormData] = useState<NewProjectFormData>({
    title: "",
    description: "",
    budget: "",
    timeframe: "",
    requirements: ""
  });

  const { toast } = useToast();

  const createProjectMutation = useMutation({
    mutationFn: async (data: NewProjectFormData) => {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, clientId: 1 }), // Using default clientId for demo
        credentials: 'include'
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create project");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      onOpenChange(false);
      toast({
        title: "Success",
        description: "Project created successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createProjectMutation.mutate(formData);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create New Project</DialogTitle>
        <DialogDescription>Fill in the project details below</DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Budget</Label>
            <Input
              id="budget"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeframe">Timeframe</Label>
            <Input
              id="timeframe"
              value={formData.timeframe}
              onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Requirements</Label>
            <Input
              id="requirements"
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              required
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="submit" disabled={createProjectMutation.isPending}>
            {createProjectMutation.isPending ? "Creating..." : "Create Project"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

export default function AdminProjects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewProject, setViewProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedProjects, setSelectedProjects] = useState<number[]>([]);
  const [isAddingProject, setIsAddingProject] = useState(false); // State for the new project dialog

  const { toast } = useToast();

  // Fetch all projects
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["/api/projects"],
    queryFn: async () => {
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error("Failed to fetch projects");
      return res.json();
    },
  });

  // Update project status mutation
  const updateProjectStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status }),
        credentials: 'include'
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to update project status");
      }

      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      setViewProject(null); // Close the dialog after successful update
      toast({
        title: "Project updated",
        description: "The project status has been updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Delete project mutation
  const deleteProjectMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to delete project");
      }

      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({
        title: "Project deleted",
        description: "The project has been deleted successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Delete multiple projects mutation
  const deleteMultipleProjectsMutation = useMutation({
    mutationFn: async (ids: number[]) => {
      const res = await fetch(`/api/projects/bulk-delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to delete projects");
      }

      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      setSelectedProjects([]);
      toast({
        title: "Projects deleted",
        description: `${selectedProjects.length} projects have been deleted successfully`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Filter projects based on search query and active tab
  const filteredProjects = projects.filter((project: Project) => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    return matchesSearch && project.status === activeTab;
  });

  // Format date string
  const formatDate = (dateString: string | Date | null) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  // Handle selecting all projects
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProjects(filteredProjects.map((project: Project) => project.id));
    } else {
      setSelectedProjects([]);
    }
  };

  // Handle selecting a single project
  const handleSelectProject = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedProjects([...selectedProjects, id]);
    } else {
      setSelectedProjects(selectedProjects.filter(projectId => projectId !== id));
    }
  };

  // Render status badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500">Open</Badge>;
      case "in-progress":
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500">In Progress</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500">Completed</Badge>;
      case "canceled":
        return <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500">Canceled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Project detail view dialog
  const ProjectDetailDialog = ({ project }: { project: Project }) => (
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>{project.title}</DialogTitle>
        <DialogDescription>
          Project ID: {project.id}
        </DialogDescription>
      </DialogHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-sm">Status</h3>
            <div className="mt-1">{renderStatusBadge(project.status)}</div>
          </div>

          <div>
            <h3 className="font-medium text-sm">Client ID</h3>
            <p className="text-sm">{project.clientId}</p>
          </div>

          <div>
            <h3 className="font-medium text-sm">Created Date</h3>
            <p className="text-sm">{formatDate(project.createdAt)}</p>
          </div>

          <div>
            <h3 className="font-medium text-sm">Budget</h3>
            <p className="text-sm">{project.budget}</p>
          </div>

          <div>
            <h3 className="font-medium text-sm">Timeframe</h3>
            <p className="text-sm">{project.timeframe}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-sm">Description</h3>
            <p className="text-sm whitespace-pre-line">{project.description}</p>
          </div>

          <div>
            <h3 className="font-medium text-sm">Requirements</h3>
            <p className="text-sm whitespace-pre-line">{project.requirements}</p>
          </div>

          {project.additionalDetails && (
            <div>
              <h3 className="font-medium text-sm">Additional Details</h3>
              <p className="text-sm whitespace-pre-line">{project.additionalDetails}</p>
            </div>
          )}
        </div>
      </div>

      <DialogFooter className="flex items-center justify-between sm:justify-between">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => updateProjectStatusMutation.mutate({ id: project.id, status: "in-progress" })}
            disabled={project.status === "in-progress"}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Approve
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="text-red-500 border-red-500 hover:bg-red-500/10"
            onClick={() => updateProjectStatusMutation.mutate({ id: project.id, status: "canceled" })}
            disabled={project.status === "canceled"}
          >
            <XCircle className="h-4 w-4 mr-2" />
            Reject
          </Button>
        </div>

        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );

  return (
    <div className="flex h-screen bg-slate-950">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="Projects" />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-7xl">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold">Projects Management</h1>
              <Button 
                variant="destructive"
                disabled={selectedProjects.length === 0}
                onClick={() => {
                  if (confirm(`Are you sure you want to delete ${selectedProjects.length} projects?`)) {
                    deleteMultipleProjectsMutation.mutate(selectedProjects);
                  }
                }}
              >
                <Trash className="h-4 w-4 mr-2" />
                Delete Selected
              </Button>
              <Button onClick={() => setIsAddingProject(true)}>Add Project</Button>
            </div>

            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between space-y-2 md:space-y-0">
                  <CardTitle>All Projects</CardTitle>
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search projects..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs 
                  defaultValue="all" 
                  className="space-y-4"
                  onValueChange={setActiveTab}
                >
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="open">Open</TabsTrigger>
                    <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="canceled">Canceled</TabsTrigger>
                  </TabsList>
                  <TabsContent value={activeTab} className="space-y-4">
                    <Card>
                      <CardContent className="p-0">
                        <div className="rounded-md border overflow-hidden">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-12">
                                  <Checkbox 
                                    checked={selectedProjects.length > 0 && selectedProjects.length === filteredProjects.length}
                                    onCheckedChange={handleSelectAll}
                                    aria-label="Select all"
                                  />
                                </TableHead>
                                <TableHead className="w-14">ID</TableHead>
                                <TableHead className="w-64">Title</TableHead>
                                <TableHead>Client</TableHead>
                                <TableHead>Budget</TableHead>
                                <TableHead>Timeframe</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead className="w-12">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {isLoading ? (
                                <TableRow>
                                  <TableCell colSpan={9} className="text-center h-24">
                                    Loading...
                                  </TableCell>
                                </TableRow>
                              ) : filteredProjects.length === 0 ? (
                                <TableRow>
                                  <TableCell colSpan={9} className="text-center h-24">
                                    No projects found
                                  </TableCell>
                                </TableRow>
                              ) : (
                                filteredProjects.map((project: Project) => (
                                  <TableRow key={project.id}>
                                    <TableCell>
                                      <Checkbox
                                        checked={selectedProjects.includes(project.id)}
                                        onCheckedChange={(checked) => 
                                          handleSelectProject(project.id, checked as boolean)
                                        }
                                        aria-label={`Select project ${project.id}`}
                                      />
                                    </TableCell>
                                    <TableCell>{project.id}</TableCell>
                                    <TableCell>
                                      <div className="font-medium">{project.title}</div>
                                    </TableCell>
                                    <TableCell>{project.clientId}</TableCell>
                                    <TableCell>{project.budget}</TableCell>
                                    <TableCell>{project.timeframe}</TableCell>
                                    <TableCell>
                                      {renderStatusBadge(project.status)}
                                    </TableCell>
                                    <TableCell>
                                      {formatDate(project.createdAt)}
                                    </TableCell>
                                    <TableCell>
                                      <div className="flex items-center justify-end">
                                        <DropdownMenu>
                                          <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                              <MoreVertical className="h-4 w-4" />
                                              <span className="sr-only">Open menu</span>
                                            </Button>
                                          </DropdownMenuTrigger>
                                          <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => setViewProject(project)}>
                                              <Eye className="h-4 w-4 mr-2" />
                                              View Details
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                              onClick={() => updateProjectStatusMutation.mutate({ 
                                                id: project.id, 
                                                status: "open"
                                              })}
                                            >
                                              <CircleDot className="h-4 w-4 mr-2" />
                                              Set as Open
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                              onClick={() => updateProjectStatusMutation.mutate({ 
                                                id: project.id, 
                                                status: "in-progress"
                                              })}
                                            >
                                              <Timer className="h-4 w-4 mr-2" />
                                              Set In Progress
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                              onClick={() => updateProjectStatusMutation.mutate({ 
                                                id: project.id, 
                                                status: "completed"
                                              })}
                                            >
                                              <CheckCircle className="h-4 w-4 mr-2" />
                                              Set as Completed
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                              onClick={() => updateProjectStatusMutation.mutate({ 
                                                id: project.id, 
                                                status: "canceled"
                                              })}
                                            >
                                              <XCircle className="h-4 w-4 mr-2" />
                                              Set as Canceled
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                              onClick={() => {
                                                if (confirm("Are you sure you want to delete this project?")) {
                                                  deleteProjectMutation.mutate(project.id);
                                                }
                                              }}
                                              className="text-red-500"
                                            >
                                              <Trash className="h-4 w-4 mr-2" />
                                              Delete
                                            </DropdownMenuItem>
                                          </DropdownMenuContent>
                                        </DropdownMenu>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                ))
                              )}
                            </TableBody>
                          </Table>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      <Dialog open={!!viewProject} onOpenChange={(open) => !open && setViewProject(null)}>
        {viewProject && <ProjectDetailDialog project={viewProject} />}
      </Dialog>
      <Dialog open={isAddingProject} onOpenChange={setIsAddingProject}>
        <NewProjectDialog onOpenChange={setIsAddingProject} />
      </Dialog>
    </div>
  );
}