
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/AdminSidebar";
import type { User } from "@shared/schema";

export default function UserDetails() {
  const { id } = useParams();
  
  const { data: user, isLoading } = useQuery<User>({
    queryKey: ['user', id],
    queryFn: async () => {
      const response = await fetch(`/api/users/${id}`);
      if (!response.ok) throw new Error('Failed to fetch user');
      return response.json();
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="flex min-h-screen bg-slate-950">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader title="User Details" />
        <main className="p-6">
          <Card>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <div className="mt-1">{user.fullName}</div>
                </div>
                <div>
                  <label className="text-sm font-medium">Username</label>
                  <div className="mt-1">{user.username}</div>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <div className="mt-1">{user.email}</div>
                </div>
                <div>
                  <label className="text-sm font-medium">User Type</label>
                  <div className="mt-1">
                    <Badge>{user.userType}</Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Company</label>
                  <div className="mt-1">{user.company || 'N/A'}</div>
                </div>
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <div className="mt-1">{user.title || 'N/A'}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
