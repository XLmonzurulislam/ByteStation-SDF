import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  FileText,
  Shield,
  MessageSquare,
  Settings,
  BarChart,
  AlertCircle,
  LogOut,
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({ 
  icon, 
  label, 
  href, 
  active = false, 
  collapsed = false,
  onClick
}: SidebarItemProps) => {
  return (
    <Link href={href}>
      <a 
        className={cn(
          "flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium",
          active ? "bg-slate-800 text-white" : "text-muted-foreground hover:bg-slate-900 hover:text-white",
          collapsed && "justify-center"
        )}
        onClick={onClick}
      >
        {icon}
        {!collapsed && <span>{label}</span>}
      </a>
    </Link>
  );
};

export default function AdminSidebar() {
  const [location] = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  // Define the sidebar navigation items
  const navItems = [
    {
      icon: <LayoutDashboard className="h-4 w-4" />,
      label: "Dashboard",
      href: "/admin/dashboard"
    },
    {
      icon: <Users className="h-4 w-4" />,
      label: "Users",
      href: "/admin/users"
    },
    {
      icon: <FileText className="h-4 w-4" />,
      label: "Projects",
      href: "/admin/projects"
    },
    {
      icon: <Shield className="h-4 w-4" />,
      label: "Hackers",
      href: "/admin/hackers"
    },
    {
      icon: <AlertCircle className="h-4 w-4" />,
      label: "Applications",
      href: "/admin/applications"
    },
    {
      icon: <MessageSquare className="h-4 w-4" />,
      label: "Messages",
      href: "/admin/messages"
    },
    {
      icon: <BarChart className="h-4 w-4" />,
      label: "Reports",
      href: "/admin/reports"
    },
    {
      icon: <Settings className="h-4 w-4" />,
      label: "Settings",
      href: "/admin/settings"
    }
  ];

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-slate-800 bg-slate-950 transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Sidebar Header with Logo */}
      <div className="flex h-16 items-center border-b border-slate-800 px-4">
        {!collapsed && (
          <Link href="/admin/dashboard">
            <a className="flex items-center gap-2 font-bold text-lg text-white">
              <Shield className="h-6 w-6 text-primary" />
              <span>SecureHack</span>
              <span className="text-xs text-primary-foreground bg-primary px-1.5 py-0.5 rounded ml-1">
                Admin
              </span>
            </a>
          </Link>
        )}
        {collapsed && (
          <Link href="/admin/dashboard">
            <a className="flex w-full items-center justify-center">
              <Shield className="h-6 w-6 text-primary" />
            </a>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn("ml-auto", collapsed && "mx-auto")}
          onClick={toggleSidebar}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>
      
      {/* Navigation Items */}
      <nav className="flex-1 overflow-auto p-3 space-y-1">
        {navItems.map((item) => (
          <SidebarItem
            key={item.href}
            icon={item.icon}
            label={item.label}
            href={item.href}
            active={location.startsWith(item.href)}
            collapsed={collapsed}
          />
        ))}
      </nav>
      
      {/* Sidebar Footer */}
      <div className="mt-auto border-t border-slate-800 p-3">
        <SidebarItem
          icon={<LogOut className="h-4 w-4" />}
          label="Log Out"
          href="/logout"
          collapsed={collapsed}
        />
      </div>
    </aside>
  );
}