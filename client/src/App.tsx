import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import HackerProfile from "@/pages/HackerProfile";
import ClientDashboard from "@/pages/ClientDashboard";
import SubmitProject from "@/pages/SubmitProject";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import NotFound from "@/pages/not-found";
import ComingSoon from "@/pages/ComingSoon";
import Hackers from "@/pages/Hackers";
import Services from "@/pages/Services";
import About from "@/pages/About";
import UserSettings from "@/pages/UserSettings";
import SecurityReports from "@/pages/SecurityReports";
import SecurityResources from "@/pages/SecurityResources";
import ProjectDetails from "@/pages/ProjectDetails";

// Admin components
import AdminDashboard from "@/pages/Admin/Dashboard";
import AdminUsers from "@/pages/Admin/Users";
import AdminLogin from "@/pages/Admin/Login";
import AdminHackers from "@/pages/Admin/Hackers";
import AdminProjects from "@/pages/Admin/Projects";
import AdminApplications from "@/pages/Admin/Applications";
import AdminMessages from "@/pages/Admin/Messages";
import AdminReports from "@/pages/Admin/Reports";
import AdminSettings from "@/pages/Admin/Settings";
import NewUser from "@/pages/Admin/NewUser";
import UserDetails from "@/pages/Admin/UserDetails"; // Added import
import EditUser from "@/pages/Admin/EditUser"; // Added import

// Auth context
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute, AdminRoute } from "@/lib/protected-route";

function Router() {
  const [location] = useLocation();

  // Check if current path is an admin route
  const isAdminRoute = location.startsWith("/admin");

  // If it's an admin route, don't render header and footer
  if (isAdminRoute) {
    return (
      <main className="min-h-screen">
        <Switch>
          <Route path="/admin/login" component={AdminLogin} />
          <AdminRoute path="/admin/dashboard" component={AdminDashboard} />
          <AdminRoute path="/admin/users" component={AdminUsers} />
          <AdminRoute path="/admin/projects" component={AdminProjects} />
          <AdminRoute path="/admin/hackers" component={AdminHackers} />
          <AdminRoute path="/admin/applications" component={AdminApplications} />
          <AdminRoute path="/admin/messages" component={AdminMessages} />
          <AdminRoute path="/admin/reports" component={AdminReports} />
          <AdminRoute path="/admin/settings" component={AdminSettings} />
          <AdminRoute path="/admin/users/new" component={NewUser} />
          <AdminRoute path="/admin/hackers/new" component={NewUser} />
          <AdminRoute path="/admin/users/:id" component={UserDetails} />
          <AdminRoute path="/admin/users/:id/edit" component={EditUser} />
          <Route path="/admin">
            <AdminRoute path="/admin" component={AdminDashboard} />
          </Route>
        </Switch>
      </main>
    );
  }

  // Regular routes with header and footer
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/projects" component={Projects} />
          <Route path="/hackers" component={Hackers} />
          <Route path="/hackers/:id" component={HackerProfile} />
          <ProtectedRoute path="/dashboard" component={ClientDashboard} />
          <ProtectedRoute path="/client/dashboard" component={ClientDashboard} />
          <ProtectedRoute path="/submit-project" component={SubmitProject} />
          <Route path="/contact" component={Contact} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <ProtectedRoute path="/profile/settings" component={UserSettings} />
          <ProtectedRoute path="/notifications" component={ComingSoon} />
          <ProtectedRoute path="/reports" component={SecurityReports} />
          <Route path="/resources" component={SecurityResources} />
          <Route path="/how-it-works" component={ComingSoon} />
          <Route path="/services" component={Services} />
          <Route path="/success-stories" component={ComingSoon} />
          <Route path="/join-hacker" component={ComingSoon} />
          <Route path="/verification" component={ComingSoon} />
          <Route path="/payment-protection" component={ComingSoon} />
          <Route path="/about" component={About} />
          <Route path="/blog" component={ComingSoon} />
          <Route path="/careers" component={ComingSoon} />
          <Route path="/legal" component={ComingSoon} />
          <Route path="/terms" component={ComingSoon} />
          <Route path="/privacy" component={ComingSoon} />
          <Route path="/security" component={ComingSoon} />
          <Route path="/sitemap" component={ComingSoon} />
          <Route path="/forgot-password" component={ComingSoon} />
          <Route path="/projects/:id" component={ProjectDetails} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;