import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
import {
  Search,
  MoreVertical,
  Eye,
  Trash,
  Mail,
  MailOpen,
  Clock,
  CheckCheck,
  Reply,
  User,
  X
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/AdminSidebar";
import type { ContactMessage } from "@shared/schema";

export default function AdminMessages() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<boolean | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Fetch all contact messages
  const { data: messages = [], isLoading } = useQuery<ContactMessage[]>({
    queryKey: ['/api/contact-messages'],
    // In a real app, this would connect to the API
    queryFn: async () => {
      // Mock data for demonstration
      return [];
    },
    enabled: true,
  });
  
  // Filter messages based on search term and read status
  const filteredMessages = messages.filter(message => {
    const matchesSearch = searchTerm === "" || 
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === null || message.isRead === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Sample data for the demonstration
  const sampleMessages = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      subject: "Question about security services",
      message: "Hello, I'm interested in your penetration testing services for my e-commerce website. Could you provide me with more information about your pricing and process?",
      createdAt: "2025-03-30T14:25:00Z",
      isRead: false
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "+1 (555) 987-6543",
      subject: "Partnership opportunity",
      message: "Hi, I represent a cybersecurity firm and we're looking to partner with ethical hackers for a large government project. Would love to discuss potential collaboration.",
      createdAt: "2025-03-29T09:15:00Z",
      isRead: true
    },
    {
      id: 3,
      name: "Michael Wong",
      email: "m.wong@example.com",
      phone: "+1 (555) 555-5555",
      subject: "Urgent security vulnerability",
      message: "I believe I've found a critical vulnerability in your platform. Please contact me as soon as possible to discuss the details securely.",
      createdAt: "2025-03-30T17:05:00Z",
      isRead: false
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      phone: "+1 (555) 222-3333",
      subject: "Hacker verification query",
      message: "I submitted my verification documents 2 weeks ago but haven't heard back. Could you please check the status of my application? My username is ethical_emily.",
      createdAt: "2025-03-28T11:30:00Z",
      isRead: true
    },
    {
      id: 5,
      name: "Robert Martinez",
      email: "robert.m@example.com",
      phone: "+1 (555) 444-7777",
      subject: "Payment issue",
      message: "I completed a project last week but haven't received the payment yet. The project ID is #P-2025-789. Please help resolve this issue.",
      createdAt: "2025-03-30T08:45:00Z",
      isRead: false
    }
  ];
  
  const viewMessage = (messageId: number) => {
    // In a real app, you would fetch message details from API
    const message = sampleMessages.find(m => m.id === messageId);
    if (message) {
      setSelectedMessage(message as unknown as ContactMessage);
      setIsViewDialogOpen(true);
    }
  };
  
  const deleteMessage = (messageId: number) => {
    // In a real app, you would fetch message details from API
    const message = sampleMessages.find(m => m.id === messageId);
    if (message) {
      setSelectedMessage(message as unknown as ContactMessage);
      setIsDeleteDialogOpen(true);
    }
  };
  
  const handleDeleteMessage = () => {
    console.log("Deleting message:", selectedMessage?.id);
    setIsDeleteDialogOpen(false);
    // In a real app, you would call an API to delete the message
  };
  
  const markAsRead = (messageId: number) => {
    console.log("Marking message as read:", messageId);
    // In a real app, you would call an API to mark the message as read
  };
  
  return (
    <div className="flex min-h-screen bg-slate-950">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader title="Contact Messages" />
        <main className="flex-1 p-6 overflow-auto">
          <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
                <p className="text-muted-foreground">
                  Manage contact form submissions and inquiries
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <MailOpen className="mr-2 h-4 w-4" />
                  Mark All as Read
                </Button>
              </div>
            </div>
            
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search messages..."
                  className="pl-8 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  variant={statusFilter === false ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setStatusFilter(statusFilter === false ? null : false)}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Unread
                </Button>
                <Button 
                  variant={statusFilter === true ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setStatusFilter(statusFilter === true ? null : true)}
                >
                  <CheckCheck className="mr-2 h-4 w-4" />
                  Read
                </Button>
              </div>
            </div>
            
            {/* Messages Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">ID</TableHead>
                    <TableHead>Sender</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Received</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    // Loading skeleton
                    Array.from({ length: 5 }).map((_, i) => (
                      <TableRow key={`loading-${i}`}>
                        {Array.from({ length: 6 }).map((_, j) => (
                          <TableCell key={`loading-cell-${i}-${j}`}>
                            <div className="h-4 w-full bg-slate-800 rounded animate-pulse" />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : filteredMessages.length > 0 ? (
                    filteredMessages.map((message) => (
                      <TableRow key={message.id}>
                        <TableCell className="font-medium">{message.id}</TableCell>
                        <TableCell>{message.name}</TableCell>
                        <TableCell>{message.subject}</TableCell>
                        <TableCell>{message.createdAt ? new Date(message.createdAt).toLocaleDateString() : "N/A"}</TableCell>
                        <TableCell>
                          <Badge variant={message.isRead ? "outline" : "default"}>
                            {message.isRead ? "Read" : "Unread"}
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
                              <DropdownMenuItem onClick={() => viewMessage(message.id)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Message
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Reply className="mr-2 h-4 w-4" />
                                Reply
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => markAsRead(message.id)}>
                                <MailOpen className="mr-2 h-4 w-4" />
                                Mark as Read
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-destructive focus:text-destructive"
                                onClick={() => deleteMessage(message.id)}
                              >
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    // If no real data, show sample data
                    sampleMessages
                      .filter(message => {
                        return statusFilter === null || message.isRead === statusFilter;
                      })
                      .map((message) => (
                        <TableRow key={message.id} className={!message.isRead ? "bg-primary/5" : ""}>
                          <TableCell className="font-medium">{message.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-xs font-medium">
                                {message.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <div className={!message.isRead ? "font-medium" : ""}>
                                  {message.name}
                                </div>
                                <div className="text-xs text-muted-foreground">{message.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className={!message.isRead ? "font-medium" : ""}>
                            {message.subject}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {message.createdAt ? new Date(message.createdAt).toLocaleString() : "N/A"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={message.isRead ? "outline" : "default"} className="gap-1">
                              {message.isRead ? (
                                <>
                                  <MailOpen className="h-3 w-3" />
                                  Read
                                </>
                              ) : (
                                <>
                                  <Mail className="h-3 w-3" />
                                  Unread
                                </>
                              )}
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
                                <DropdownMenuItem onClick={() => viewMessage(message.id)}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Message
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Reply className="mr-2 h-4 w-4" />
                                  Reply
                                </DropdownMenuItem>
                                {!message.isRead && (
                                  <DropdownMenuItem onClick={() => markAsRead(message.id)}>
                                    <MailOpen className="mr-2 h-4 w-4" />
                                    Mark as Read
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  className="text-destructive focus:text-destructive"
                                  onClick={() => deleteMessage(message.id)}
                                >
                                  <Trash className="mr-2 h-4 w-4" />
                                  Delete
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
      
      {/* View Message Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
            <DialogDescription>
              Contact message information
            </DialogDescription>
          </DialogHeader>
          
          {selectedMessage && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-sm font-medium">
                  {(selectedMessage as any).name.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-medium">{(selectedMessage as any).name}</h3>
                  <p className="text-sm text-muted-foreground">{(selectedMessage as any).email}</p>
                </div>
                <Badge className="ml-auto" variant={(selectedMessage as any).isRead ? "outline" : "default"}>
                  {(selectedMessage as any).isRead ? "Read" : "Unread"}
                </Badge>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Subject</h3>
                <p className="text-base">{(selectedMessage as any).subject}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Message</h3>
                <div className="p-3 bg-slate-900 rounded-md border text-sm">
                  {(selectedMessage as any).message}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
                  <p className="text-base">{(selectedMessage as any).phone || "Not provided"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Received</h3>
                  <p className="text-base">
                    {(selectedMessage as any).createdAt ? new Date((selectedMessage as any).createdAt).toLocaleString() : "N/A"}
                  </p>
                </div>
              </div>
              
              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Close
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={() => {
                    setIsViewDialogOpen(false);
                    setIsDeleteDialogOpen(true);
                  }}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </Button>
                <Button>
                  <Reply className="mr-2 h-4 w-4" />
                  Reply
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete Message Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Message</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this message from{" "}
              <span className="font-medium">{(selectedMessage as any)?.name}</span>?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteMessage}>
              <Trash className="mr-2 h-4 w-4" />
              Delete Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}