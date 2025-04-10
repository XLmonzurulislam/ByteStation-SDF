import { useState } from "react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Send, Mail, Phone, MapPin, AlertCircle, CheckCircle } from "lucide-react";
import { FaTwitter, FaLinkedinIn, FaGithub, FaDiscord } from "react-icons/fa";

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
  inquiryType: z.string().min(1, "Please select an inquiry type"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  
  // Form setup
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      inquiryType: "",
    },
  });
  
  // Submit the form
  const mutation = useMutation({
    mutationFn: (values: ContactFormValues) => 
      apiRequest("POST", "/api/contact", values),
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "We've received your message and will respond soon.",
        variant: "default",
      });
      setIsSubmitSuccessful(true);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  const onSubmit = (values: ContactFormValues) => {
    mutation.mutate(values);
  };
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Contact Us</h1>
        <p className="text-light-text max-w-2xl mx-auto">Have questions about ethical hacking services? We're here to help.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Get in Touch</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you soon</CardDescription>
            </CardHeader>
            
            {isSubmitSuccessful ? (
              <CardContent className="pt-6">
                <div className="bg-green-500/10 border border-green-500/30 rounded-md p-6 text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-white text-xl font-bold mb-2">Message Sent Successfully</h3>
                  <p className="text-light-text mb-4">
                    Thank you for reaching out to HackerHire. We've received your message and will respond to you shortly.
                  </p>
                  <Button 
                    className="bg-secondary text-primary hover:bg-secondary/90"
                    onClick={() => setIsSubmitSuccessful(false)}
                  >
                    Send Another Message
                  </Button>
                </div>
              </CardContent>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your name"
                                className="bg-card border-gray-700 text-white"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Email</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your email address"
                                className="bg-card border-gray-700 text-white"
                                type="email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="inquiryType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Inquiry Type</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="bg-card border-gray-700 text-white">
                                  <SelectValue placeholder="Select type of inquiry" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-card border-gray-700 text-white">
                                <SelectItem value="general">General Inquiry</SelectItem>
                                <SelectItem value="project">Project Consultation</SelectItem>
                                <SelectItem value="hacker">Joining as a Hacker</SelectItem>
                                <SelectItem value="support">Technical Support</SelectItem>
                                <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Subject</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Message subject"
                                className="bg-card border-gray-700 text-white"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="How can we help you?"
                              className="bg-card border-gray-700 text-white min-h-[150px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="bg-primary/20 border border-primary/30 rounded-md p-4 flex items-start">
                      <AlertCircle className="text-secondary h-5 w-5 mt-0.5 flex-shrink-0" />
                      <div className="ml-3">
                        <p className="text-light-text text-sm">
                          For urgent inquiries related to active projects, please log in to your account and use the project-specific contact options.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="bg-secondary text-primary hover:bg-secondary/90 w-full"
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? (
                        "Sending Message..."
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" /> Send Message
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            )}
          </Card>
        </div>
        
        {/* Contact Information */}
        <div className="space-y-6">
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <div className="bg-primary/30 p-3 rounded-full mr-4">
                  <Mail className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Email</h3>
                  <p className="text-light-text">contact@hackerhire.com</p>
                  <p className="text-light-text">support@hackerhire.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/30 p-3 rounded-full mr-4">
                  <Phone className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Phone</h3>
                  <p className="text-light-text">+1 (555) 123-4567</p>
                  <p className="text-light-text">Mon-Fri, 9AM-6PM EST</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/30 p-3 rounded-full mr-4">
                  <MapPin className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Office</h3>
                  <p className="text-light-text">123 Security Avenue</p>
                  <p className="text-light-text">Suite 456</p>
                  <p className="text-light-text">Cyber City, CS 98765</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Connect With Us</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <a href="#" className="bg-primary/30 p-3 rounded-full text-secondary hover:bg-secondary hover:text-primary transition-colors">
                  <FaTwitter className="h-5 w-5" />
                </a>
                <a href="#" className="bg-primary/30 p-3 rounded-full text-secondary hover:bg-secondary hover:text-primary transition-colors">
                  <FaLinkedinIn className="h-5 w-5" />
                </a>
                <a href="#" className="bg-primary/30 p-3 rounded-full text-secondary hover:bg-secondary hover:text-primary transition-colors">
                  <FaGithub className="h-5 w-5" />
                </a>
                <a href="#" className="bg-primary/30 p-3 rounded-full text-secondary hover:bg-secondary hover:text-primary transition-colors">
                  <FaDiscord className="h-5 w-5" />
                </a>
              </div>
              <div className="mt-6">
                <p className="text-light-text text-sm">
                  Follow us on social media for the latest updates, security tips, and community discussions.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-primary border-0">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-secondary mr-3" />
                <h3 className="text-white font-bold">Need Urgent Help?</h3>
              </div>
              <p className="text-light-text mb-4">
                For security emergencies or time-sensitive issues, contact our incident response team directly.
              </p>
              <Button className="w-full bg-secondary text-primary hover:bg-secondary/90">
                Emergency Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
