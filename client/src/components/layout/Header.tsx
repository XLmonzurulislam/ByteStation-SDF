import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ShieldCheck, Menu, X, User, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";

// Type for authenticated user
type AuthUser = {
  id: number;
  username: string;
  email: string;
  fullName: string;
  userType: "client" | "hacker";
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location, navigate] = useLocation();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Use our auth hook to get user data and logout mutation
  const { user, isLoading, logoutMutation } = useAuth();

  // Handle logout
  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        // Clear all queries from the cache
        queryClient.clear();

        // Redirect to home page
        navigate("/");
      },
    });
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/hackers", label: "Hackers" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-primary">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-white text-2xl font-bold flex items-center"
            >
              <ShieldCheck className="mr-2" />
              <span>ByteStation</span>
            </Link>
          </div>

          <div className="hidden md:flex space-x-8 text-light-text font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:text-secondary transition-colors ${
                  location === link.href ? "text-secondary" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {isLoading ? (
              // Show loading skeleton
              <div className="h-10 w-24 bg-primary-foreground/20 animate-pulse rounded-md"></div>
            ) : user ? (
              // Show user menu if logged in
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <Avatar className="h-9 w-9 border border-secondary">
                      <AvatarFallback className="bg-primary-foreground text-secondary">
                        {user.fullName
                          ?.split(" ")
                          .map((n: string) => n[0])
                          .join("") ||
                          user.username?.substring(0, 2).toUpperCase() ||
                          "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-0.5 leading-none">
                      <p className="font-medium text-sm">
                        {user.fullName || user.username}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href={
                        user.userType === "client"
                          ? "/client/dashboard"
                          : "/hacker/profile"
                      }
                      className="cursor-pointer flex w-full items-center"
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>
                        {user.userType === "client"
                          ? "Dashboard"
                          : "My Profile"}
                      </span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-red-600 focus:text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              // Show login/signup if not logged in
              <>
                <Link
                  href="/login"
                  className="text-light-text hover:text-secondary transition-colors hidden md:inline-block"
                >
                  Login
                </Link>
                <Link href="/signup">
                  <Button className="bg-secondary text-primary hover:bg-secondary/90">
                    SIGN UP
                  </Button>
                </Link>
              </>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-primary-foreground/10">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-light-text hover:text-secondary transition-colors ${
                    location === link.href ? "text-secondary" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {!user ? (
                <>
                  <Link
                    href="/login"
                    className="text-light-text hover:text-secondary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="text-secondary font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href={
                      user.userType === "client"
                        ? "/client/dashboard"
                        : "/hacker/profile"
                    }
                    className="text-light-text hover:text-secondary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="inline-block mr-2 h-4 w-4" />
                    {user.userType === "client" ? "Dashboard" : "My Profile"}
                  </Link>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                    className="text-left text-red-400 hover:text-red-300 transition-colors"
                  >
                    <LogOut className="inline-block mr-2 h-4 w-4" />
                    Log out
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
