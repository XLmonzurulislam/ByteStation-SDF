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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Shield, 
  DollarSign, 
  Calendar, 
  AlertCircle, 
  CheckCircle, 
  X 
} from "lucide-react";

// Form validation schema
const projectSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  requirements: z.string().min(20, "Requirements must be at least 20 characters"),
  budget: z.string().min(1, "Budget is required"),
  timeframe: z.string().min(1, "Timeframe is required"),
  skills: z.array(z.string()).min(1, "Select at least one skill"),
  additionalDetails: z.string().optional(),
  termsAgreed: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

const SubmitProject = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [customSkill, setCustomSkill] = useState("");
  
  // Available skills for selection
  const availableSkills = [
    "Web Application Security",
    "Network Security",
    "API Security",
    "Mobile Application Security",
    "Cloud Security (AWS)",
    "Cloud Security (Azure)",
    "Cloud Security (GCP)",
    "IoT Security",
    "Secure Code Review",
    "Penetration Testing",
    "Vulnerability Assessment",
    "Social Engineering",
    "Security Compliance (GDPR)",
    "Security Compliance (HIPAA)",
    "Security Compliance (PCI DSS)",
  ];
  
  // Form setup
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      requirements: "",
      budget: "",
      timeframe: "",
      skills: [],
      additionalDetails: "",
      termsAgreed: false,
    },
  });
  
  const selectedSkills = form.watch("skills");
  
  // Add custom skill
  const handleAddCustomSkill = () => {
    if (customSkill && !selectedSkills.includes(customSkill)) {
      form.setValue("skills", [...selectedSkills, customSkill]);
      setCustomSkill("");
    }
  };
  
  // Remove skill
  const handleRemoveSkill = (skill: string) => {
    form.setValue(
      "skills",
      selectedSkills.filter((s) => s !== skill)
    );
  };
  
  // Submit the project
  const mutation = useMutation({
    mutationFn: (values: ProjectFormValues) => {
      // Extract skills from form values
      const { skills, ...projectData } = values;
      
      // Format data to match API expectations
      const formattedData = {
        // Hard-code clientId for demo purposes (in a real app this would come from the authenticated user)
        clientId: 1,
        ...projectData,
        // Include skills separately as expected by the API
        skills
      };
      
      return apiRequest("POST", "/api/projects", formattedData);
    },
    onSuccess: () => {
      toast({
        title: "Project Submitted",
        description: "Your project has been successfully posted.",
        variant: "default",
      });
      navigate("/dashboard");
    },
    onError: (error) => {
      console.error("Project submission error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit project. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  const onSubmit = (values: ProjectFormValues) => {
    mutation.mutate(values);
  };
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Submit a Project</h1>
          <p className="text-light-text">Describe your security needs and requirements to connect with ethical hackers</p>
        </div>
        
        <Card className="bg-card border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Project Details</CardTitle>
            <CardDescription>Fill out the information below to post your project</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Project Title</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., Web Application Security Assessment"
                          className="bg-card border-gray-700 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Provide a clear and descriptive title for your project
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Project Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your project and security goals in detail"
                          className="bg-card border-gray-700 text-white min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Include information about your application, infrastructure, or systems
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="requirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Requirements & Scope</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Specific requirements, testing scope, and deliverables"
                          className="bg-card border-gray-700 text-white min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Define what areas need to be tested and what deliverables you expect
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Budget Range</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input 
                              placeholder="e.g., $1,000 - $2,500"
                              className="bg-card border-gray-700 text-white pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Estimated budget for this project
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="timeframe"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Timeframe</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input 
                              placeholder="e.g., 2 weeks, 1 month"
                              className="bg-card border-gray-700 text-white pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Expected project duration or deadline
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="skills"
                  render={() => (
                    <FormItem>
                      <FormLabel className="text-white">Required Skills</FormLabel>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                          {availableSkills.map((skill) => (
                            <FormField
                              key={skill}
                              control={form.control}
                              name="skills"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={skill}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(skill)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, skill])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== skill
                                                )
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-white font-normal cursor-pointer">
                                      {skill}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>
                        
                        <div className="flex space-x-2">
                          <Input
                            placeholder="Add custom skill"
                            className="bg-card border-gray-700 text-white"
                            value={customSkill}
                            onChange={(e) => setCustomSkill(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleAddCustomSkill();
                              }
                            }}
                          />
                          <Button 
                            type="button" 
                            variant="outline"
                            className="border-secondary text-secondary hover:bg-secondary hover:text-primary"
                            onClick={handleAddCustomSkill}
                          >
                            Add
                          </Button>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedSkills.map((skill) => (
                            <Badge 
                              key={skill} 
                              variant="outline"
                              className="bg-primary/20 text-secondary border-secondary/50 flex items-center gap-1"
                            >
                              {skill}
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4 p-0 text-secondary hover:text-white hover:bg-transparent"
                                onClick={() => handleRemoveSkill(skill)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="additionalDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Additional Details (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any other details that might be relevant to the project"
                          className="bg-card border-gray-700 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Include any other information that might help hackers understand your needs
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
                          <a 
                            href="/terms" 
                            className="text-secondary hover:underline"
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            terms of service
                          </a>{" "}
                          and acknowledge that all activities will be performed ethically and within the legal scope of work.
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="bg-primary/20 border border-primary/30 rounded-md p-4 flex items-start">
                  <AlertCircle className="text-secondary h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div className="ml-3">
                    <h4 className="text-white font-semibold">Important</h4>
                    <p className="text-light-text text-sm mt-1">
                      You will be able to review and approve hackers before they begin work on your project. 
                      All communications and payments are securely handled through our platform.
                    </p>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3 justify-end">
            <Button 
              variant="outline" 
              className="border-gray-700 text-white hover:bg-gray-700"
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
            <Button 
              className="bg-secondary text-primary hover:bg-secondary/90"
              onClick={form.handleSubmit(onSubmit)}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <>Submitting...</>
              ) : (
                <>
                  <Shield className="mr-2 h-4 w-4" /> Submit Project
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SubmitProject;
