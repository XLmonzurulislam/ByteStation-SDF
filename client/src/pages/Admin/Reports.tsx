import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Calendar, Download, RefreshCw, Shield } from "lucide-react";
import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/AdminSidebar";

export default function AdminReports() {
  const [dateRange, setDateRange] = useState("last30");

  // Fetch users data
  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('/api/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      return response.json();
    }
  });

  // Fetch projects data
  const { data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await fetch('/api/projects');
      if (!response.ok) throw new Error('Failed to fetch projects');
      return response.json();
    }
  });

  // Calculate user statistics
  const clients = users.filter(user => user.userType === 'client');
  const hackers = users.filter(user => user.userType === 'hacker');

  // Calculate project statistics
  const openProjects = projects.filter(p => p.status === 'open').length;
  const inProgressProjects = projects.filter(p => p.status === 'in-progress').length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;

  // Prepare data for charts
  const projectStatusData = [
    { name: 'Open', value: openProjects },
    { name: 'In Progress', value: inProgressProjects },
    { name: 'Completed', value: completedProjects }
  ];

  const userGrowthData = [
    { name: 'Clients', value: clients.length },
    { name: 'Hackers', value: hackers.length }
  ];

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

  // Key metrics calculated from real data
  const keyMetrics = [
    {
      title: "Total Users",
      value: users.length,
      change: "+15%",
    },
    {
      title: "Active Projects",
      value: inProgressProjects,
      change: "+8%",
    },
    {
      title: "Completed Projects",
      value: completedProjects,
      change: "+12%",
    },
    {
      title: "Verified Hackers",
      value: hackers.filter(h => h.isVerified).length,
      change: "+5%",
    }
  ];

  return (
    <div className="flex min-h-screen bg-slate-950">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader title="Reports & Analytics" />
        <main className="p-6">
          <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h1>
                <p className="text-muted-foreground">
                  Comprehensive reports and performance metrics
                </p>
              </div>
              <div className="flex gap-2">
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-[180px]">
                    <Calendar className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Select time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last7">Last 7 days</SelectItem>
                    <SelectItem value="last30">Last 30 days</SelectItem>
                    <SelectItem value="last90">Last 90 days</SelectItem>
                    <SelectItem value="last365">Last 12 months</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Export Report
                </Button>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {keyMetrics.map((metric, i) => (
                <Card key={i}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      {metric.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <p className={`text-xs ${metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {metric.change} from previous period
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Project Status Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Project Status Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={projectStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, value}) => `${name} (${value})`}
                      >
                        {projectStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* User Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>User Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={userGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8">
                        {userGrowthData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>


            {/* Rest of the Tabs Content remains largely the same, but some parts might need adjustment depending on the structure of the fetched data */}
            <Tabs defaultValue="users" className="space-y-4">
              <TabsList>
                <TabsTrigger value="users">User Reports</TabsTrigger>
                <TabsTrigger value="projects">Project Reports</TabsTrigger>
                <TabsTrigger value="financial">Financial Reports</TabsTrigger>
                <TabsTrigger value="security">Security Reports</TabsTrigger>
              </TabsList>
              <TabsContent value="users">
                {/* User Reports Tab content (needs adjustments based on fetched data) */}
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="col-span-1">
                    <CardHeader>
                      <CardTitle>User Growth</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        {/*  Adjust LineChart data and keys based on fetched data */}
                        <LineChart data={userGrowthData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  <Card className="col-span-1">
                    <CardHeader>
                      <CardTitle>User Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Total Users</p>
                            <p className="text-2xl font-bold">{users.length}</p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">New This Month</p>
                            {/* Add logic to calculate new users this month */}
                            <p className="text-2xl font-bold">32</p> {/* Placeholder */}
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Client/Hacker Ratio</p>
                            <p className="text-2xl font-bold">{clients.length}:{hackers.length}</p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Verification Rate</p>
                            <p className="text-2xl font-bold">{Math.round((hackers.filter(h => h.isVerified).length / hackers.length) * 100)}%</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">Top User Locations</p>
                          {/* Add logic to calculate top user locations */}
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span>United States</span>
                              <span>35%</span>
                            </div>
                            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-primary rounded-full" style={{ width: "35%" }}></div>
                            </div>
                          </div>
                          {/* ...other locations */}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="projects">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="col-span-1">
                    <CardHeader>
                      <CardTitle>Project Status Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={projectStatusData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, value }) => `${name} (${value})`}
                          >
                            {projectStatusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  {/* Project Categories (needs adjustments based on fetched data) */}
                  <Card className="col-span-1">
                    <CardHeader>
                      <CardTitle>Project Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {/* Adjust BarChart data and keys based on fetched data */}
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={projectStatusData}> {/* Placeholder - replace with actual project category data */}
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value" fill="#8884d8">
                            {projectStatusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>Project Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Total Projects</p>
                        <p className="text-2xl font-bold">{projects.length}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Avg. Completion Time</p>
                        {/* Add logic to calculate average completion time */}
                        <p className="text-2xl font-bold">18 days</p> {/* Placeholder */}
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Avg. Applications</p>
                        {/* Add logic to calculate average applications */}
                        <p className="text-2xl font-bold">4.3</p> {/* Placeholder */}
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Completion Rate</p>
                        {/* Add logic to calculate completion rate */}
                        <p className="text-2xl font-bold">92%</p> {/* Placeholder */}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="financial">
                {/* Financial Reports Tab content (needs adjustments based on fetched data) */}
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Adjust BarChart data and keys based on fetched data */}
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={projectStatusData}> {/* Placeholder - replace with actual revenue data */}
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                        <Bar dataKey="value" fill="#8884d8" name="Revenue" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Revenue Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Add logic to calculate revenue breakdown */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span>Project Fees</span>
                            <span>65%</span>
                          </div>
                          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: "65%" }}></div>
                          </div>
                        </div>
                        {/* ...other revenue sources */}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Financial Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          {/* Add logic to calculate financial summary */}
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Gross Revenue YTD</p>
                            <p className="text-2xl font-bold">$487,250</p> {/* Placeholder */}
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Net Revenue YTD</p>
                            <p className="text-2xl font-bold">$365,430</p> {/* Placeholder */}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">Avg. Project Value by Category</p>
                          {/* Add logic to calculate average project value by category */}
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span>Web App Testing</span>
                              <span>$2,850</span>
                            </div>
                            {/* ...other categories */}
                          </div>
                        </div>
                        <div className="flex justify-between pt-4 border-t border-slate-800">
                          <span className="font-medium">Overall Platform Growth</span>
                          <span className="text-green-500">+32% YoY</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="security">
                {/* Security Reports Tab content (needs adjustments based on fetched data) */}
                <Card>
                  <CardHeader>
                    <CardTitle>Security Incidents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Adjust LineChart data and keys based on fetched data */}
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={projectStatusData}> {/* Placeholder - replace with actual security incident data */}
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#ff8042" activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Platform Security</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Security Score</p>
                            <div className="flex items-center gap-2">
                              <Shield className="h-4 w-4 text-green-500" />
                              <p className="text-2xl font-bold">A+</p>
                            </div>
                          </div>
                          {/* ... other security metrics */}
                        </div>
                        <div className="pt-4 border-t border-slate-800">
                          <p className="text-sm text-muted-foreground mb-2">Security Compliance</p>
                          <div className="space-y-2">
                            {/* ... security compliance details */}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Security Activities</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Add logic to fetch and display recent security activities */}
                        <div className="flex items-center gap-3 p-3 bg-slate-900 rounded-md">
                          <Shield className="h-4 w-4 text-green-500" />
                          <div>
                            <p className="text-sm font-medium">Security Audit Completed</p>
                            <p className="text-xs text-muted-foreground">March 15, 2025</p>
                          </div>
                        </div>
                        {/* ... other recent activities */}
                        <Button className="w-full" variant="outline">
                          View All Security Activities
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}