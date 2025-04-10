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
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Edit, 
  Trash, 
  Eye, 
  Shield,
  Star,
  Filter,
  X
} from "lucide-react";
import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/AdminSidebar";
import type { User } from "@shared/schema";

export default function AdminHackers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [skillFilter, setSkillFilter] = useState<string | null>(null);
  const [selectedHacker, setSelectedHacker] = useState<User | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Fetch all hackers (users with userType = "hacker")
  const { data: users = [], isLoading } = useQuery<User[]>({
    queryKey: ['/api/users', { type: 'hacker' }],
    queryFn: async () => {
      const res = await fetch('/api/users?type=hacker');
      if (!res.ok) throw new Error('Failed to fetch hackers');
      return res.json();
    },
    enabled: true,
  });
  
  // Sample skills to demonstrate filtering
  const commonSkills = ["Penetration Testing", "Network Security", "Web Security", "Cryptography", "Malware Analysis"];
  
  // Filter hackers based on search term
  const filteredHackers = users.filter(hacker => {
    const matchesSearch = searchTerm === "" || 
      hacker.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hacker.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hacker.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    
    // In a real app, you would filter by skills from the backend
    // For now, we'll just pass all hackers through the skill filter
    
    return matchesSearch;
  });
  
  const openDeleteDialog = (hacker: User) => {
    setSelectedHacker(hacker);
    setIsDeleteDialogOpen(true);
  };
  
  // Placeholder for demo purposes
  const handleDeleteHacker = () => {
    console.log("Deleting hacker:", selectedHacker);
    setIsDeleteDialogOpen(false);
    // In a real app, we would call an API to delete the hacker
  };
  
  return (
    <div className="flex min-h-screen bg-slate-950">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader title="Hacker Management" />
        <main className="flex-1 p-6 overflow-auto">
          <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Ethical Hackers</h1>
                <p className="text-muted-foreground">
                  Manage and verify security professionals on the platform
                </p>
              </div>
              <Button className="sm:w-auto w-full" asChild>
                <Link href="/admin/hackers/new">
                  <Plus className="mr-2 h-4 w-4" /> Add Hacker
                </Link>
              </Button>
            </div>
            
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search hackers..."
                  className="pl-8 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Skills
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Filter by skill</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {commonSkills.map(skill => (
                      <DropdownMenuItem
                        key={skill}
                        onClick={() => setSkillFilter(skill === skillFilter ? null : skill)}
                      >
                        {skill} {skill === skillFilter && "✓"}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button 
                  variant={skillFilter ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSkillFilter(null)}
                  disabled={!skillFilter}
                >
                  <X className="mr-2 h-4 w-4" />
                  Clear Filters
                </Button>
              </div>
            </div>
            
            {/* Hackers Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Skills</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Projects</TableHead>
                    <TableHead>Verification</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    // Loading skeleton
                    Array.from({ length: 5 }).map((_, i) => (
                      <TableRow key={`loading-${i}`}>
                        {Array.from({ length: 8 }).map((_, j) => (
                          <TableCell key={`loading-cell-${i}-${j}`}>
                            <div className="h-4 w-full bg-slate-800 rounded animate-pulse" />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : filteredHackers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        No hackers found. Try adjusting your filters.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredHackers.map((hacker) => {
                      // Generate random sample data for demo
                      const rating = (3.5 + Math.random() * 1.5).toFixed(1);
                      const completedProjects = Math.floor(Math.random() * 15);
                      const verified = Math.random() > 0.3;
                      const randomSkills = commonSkills
                        .sort(() => 0.5 - Math.random())
                        .slice(0, 2 + Math.floor(Math.random() * 2));
                      
                      return (
                        <TableRow key={hacker.id}>
                          <TableCell className="font-medium">{hacker.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-medium">
                                {hacker.fullName.split(' ').map((n: string) => n[0]).join('')}
                              </div>
                              <div>
                                <div>{hacker.fullName}</div>
                                <div className="text-xs text-muted-foreground">{hacker.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1 max-w-[200px]">
                              {randomSkills.map(skill => (
                                <Badge key={skill} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              <span>{rating}/5</span>
                            </div>
                          </TableCell>
                          <TableCell>{completedProjects}</TableCell>
                          <TableCell>
                            <Badge variant={verified ? "success" : "outline"}>
                              {verified ? "Verified" : "Pending"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {hacker.createdAt ? new Date(hacker.createdAt).toLocaleDateString() : "Unknown"}
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
                                <DropdownMenuItem asChild>
                                  <Link href={`/admin/hackers/${hacker.id}`}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Profile
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link href={`/admin/hackers/${hacker.id}/edit`}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Shield className="mr-2 h-4 w-4" />
                                  {verified ? "Revoke Verification" : "Verify Hacker"}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-destructive focus:text-destructive"
                                  onClick={() => openDeleteDialog(hacker)}
                                >
                                  <Trash className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })
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
      
      {/* Delete Hacker Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Hacker</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the hacker{" "}
              <span className="font-medium">{selectedHacker?.fullName}</span>?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteHacker}>
              <Trash className="mr-2 h-4 w-4" />
              Delete Hacker
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}