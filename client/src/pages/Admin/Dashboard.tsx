import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "wouter";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/AdminSidebar";

interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  userType: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  status: string;
  budget: string;
}

function ProjectDetailDialog({ project }: { project: Project }) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <div className="grid gap-4 py-4">
        <div>
          <h3 className="font-medium mb-2">{project.title}</h3>
          <p className="text-sm text-muted-foreground">{project.description}</p>
        </div>
        <div>
          <p className="text-sm font-medium mb-1">Status</p>
          <p className="text-sm text-muted-foreground">{project.status}</p>
        </div>
        <div>
          <p className="text-sm font-medium mb-1">Budget</p>
          <p className="text-sm text-muted-foreground">{project.budget}</p>
        </div>
      </div>
    </DialogContent>
  );
}

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data: users = [] } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('/api/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      return response.json();
    },
  });

  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await fetch('/api/projects');
      if (!response.ok) throw new Error('Failed to fetch projects');
      return response.json();
    },
  });

  const navigate = (path: string) => {
    window.location.href = path;
  };

  const createUser = async (userType: 'client' | 'hacker') => {
    navigate(`/admin/users/new?type=${userType}`);
  };

  const hackers = users.filter(user => user.userType === 'hacker');
  const clients = users.filter(user => user.userType === 'client');

  const showProjectDetails = (project: Project) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-slate-950">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader title="Dashboard" />
        <main className="p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{users.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Hackers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{hackers.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{clients.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{projects.length}</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="projects" className="mt-6">
            <TabsList>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="hackers">Hackers</TabsTrigger>
            </TabsList>

            <TabsContent value="projects" className="space-y-4">
              <div className="flex justify-between items-center">
                <Input 
                  placeholder="Search projects..." 
                  className="max-w-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button onClick={() => navigate('/admin/projects/new')}>
                  Add Project
                </Button>
              </div>

              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <Card key={project.id} className="cursor-pointer" onClick={() => showProjectDetails(project)}>
                    <CardHeader>
                      <CardTitle>{project.title}</CardTitle>
                      <CardDescription>{project.status}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                      <Badge className="mt-2">{project.budget}</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="users" className="space-y-4">
              <div className="flex justify-between items-center">
                <Input 
                  placeholder="Search users..." 
                  className="max-w-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button onClick={() => createUser('client')}>
                  Add User
                </Button>
              </div>

              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {clients.map((user) => (
                  <Card key={user.id}>
                    <CardHeader>
                      <CardTitle>{user.fullName}</CardTitle>
                      <CardDescription>{user.email}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Badge>{user.userType}</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="hackers" className="space-y-4">
              <div className="flex justify-between items-center">
                <Input 
                  placeholder="Search hackers..." 
                  className="max-w-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button onClick={() => createUser('hacker')}>
                  Add Hacker
                </Button>
              </div>

              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {hackers.map((hacker) => (
                  <Card key={hacker.id}>
                    <CardHeader>
                      <CardTitle>{hacker.fullName}</CardTitle>
                      <CardDescription>{hacker.email}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Badge>Hacker</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedProject && <ProjectDetailDialog project={selectedProject} />}
      </Dialog>
    </div>
  );
}