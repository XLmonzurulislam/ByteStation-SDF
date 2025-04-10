import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "wouter";
import { ShieldCheck, Lock, User, Mail, Building, AlertCircle } from "lucide-react";

// Form validation schema
const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  company: z.string().optional(),
  userType: z.enum(["client", "hacker"], {
    required_error: "Please select a user type",
  }),
  termsAgreed: z.boolean()
    .refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

const SignUp = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [signupError, setSignupError] = useState<string | null>(null);

  // Form setup
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      fullName: "",
      company: "",
      userType: "client",
      termsAgreed: false,
    },
  });

  const watchUserType = form.watch("userType");

  // Submit the signup form
  const mutation = useMutation({
    mutationFn: (values: SignupFormValues) => 
      apiRequest("POST", "/api/auth/signup", values),
    onSuccess: () => {
      toast({
        title: "Account Created",
        description: "Your account has been created successfully. Please login.",
        variant: "default",
      });
      navigate("/login");
    },
    onError: (error) => {
      setSignupError(error.message || "Failed to create account. Please try again.");
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: SignupFormValues) => {
    setSignupError(null);
    mutation.mutate(values);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-4 bg-primary/20 rounded-full mb-4">
            <ShieldCheck className="h-10 w-10 text-secondary" />
          </div>
          <h1 className="text-3xl font-bold text-white">Join HackerHire</h1>
          <p className="text-light-text mt-2">Create your account to get started</p>
        </div>
        
        <Card className="bg-card border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle className="text-white">Create an Account</CardTitle>
            <CardDescription>Fill in your details to register</CardDescription>
          </CardHeader>
          <CardContent>
            {signupError && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-3 rounded-md mb-6 flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm">{signupError}</p>
              </div>
            )}
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="userType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">I am a</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-card border-gray-700 text-white">
                            <SelectValue placeholder="Select account type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-card border-gray-700 text-white">
                          <SelectItem value="client">Client seeking security services</SelectItem>
                          <SelectItem value="hacker">Ethical hacker providing services</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        {field.value === "client"
                          ? "As a client, you'll be able to post security projects and hire ethical hackers."
                          : "As an ethical hacker, you'll be able to apply for security projects and provide services."}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Full Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input 
                              placeholder="Your full name"
                              className="bg-card border-gray-700 text-white pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Username</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input 
                              placeholder="Choose a username"
                              className="bg-card border-gray-700 text-white pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input 
                            type="email"
                            placeholder="Your email address"
                            className="bg-card border-gray-700 text-white pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {watchUserType === "client" && (
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Company (Optional)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input 
                              placeholder="Your company name"
                              className="bg-card border-gray-700 text-white pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input 
                            type="password"
                            placeholder="Create a strong password"
                            className="bg-card border-gray-700 text-white pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Password must be at least 8 characters with uppercase and numbers
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="termsAgreed"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-gray-700 p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-white">
                          Terms and Conditions
                        </FormLabel>
                        <FormDescription>
                          I agree to the{" "}
                          <Link 
                            href="/terms" 
                            className="text-secondary hover:underline"
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            terms of service
                          </Link>{" "}
                          and{" "}
                          <Link 
                            href="/privacy" 
                            className="text-secondary hover:underline"
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            privacy policy
                          </Link>.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-secondary text-primary hover:bg-secondary/90"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-gray-800 pt-6">
            <p className="text-light-text text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-secondary hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;