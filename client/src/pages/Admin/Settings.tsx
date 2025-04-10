import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  Save, 
  RefreshCw,
  Lock,
  Pencil,
  Shield,
  CreditCard,
  Code,
  Mail,
  Settings,
  Smartphone,
  Trash,
  AlertCircle,
  Info,
  Check
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/AdminSidebar";

// Form schemas
const generalSettingsSchema = z.object({
  siteName: z.string().min(1, "Site name is required"),
  siteDescription: z.string().min(1, "Site description is required"),
  contactEmail: z.string().email("Valid email is required"),
  supportPhone: z.string().optional(),
  platformFee: z.coerce.number().min(0).max(100),
  allowGuestBrowsing: z.boolean().default(true),
  maintenanceMode: z.boolean().default(false),
  requireVerification: z.boolean().default(true),
  defaultCurrency: z.string(),
  dateFormat: z.string(),
});

const emailSettingsSchema = z.object({
  smtpHost: z.string().min(1, "SMTP host is required"),
  smtpPort: z.coerce.number().int().positive(),
  smtpUser: z.string().min(1, "SMTP username is required"),
  smtpPassword: z.string().min(1, "SMTP password is required"),
  senderEmail: z.string().email("Valid sender email is required"),
  senderName: z.string().min(1, "Sender name is required"),
  enableEmailNotifications: z.boolean().default(true),
  emailFooter: z.string(),
});

const securitySettingsSchema = z.object({
  sessionTimeout: z.coerce.number().int().positive(),
  maxLoginAttempts: z.coerce.number().int().positive(),
  requireMfa: z.boolean().default(false),
  passwordExpiration: z.coerce.number().int().min(0),
  minPasswordLength: z.coerce.number().int().min(8),
  requireSpecialChars: z.boolean().default(true),
  enableCaptcha: z.boolean().default(true),
  apiRateLimit: z.coerce.number().int().positive(),
});

export default function AdminSettings() {
  const { toast } = useToast();
  const [isGeneralSubmitting, setIsGeneralSubmitting] = useState(false);
  const [isEmailSubmitting, setIsEmailSubmitting] = useState(false);
  const [isSecuritySubmitting, setIsSecuritySubmitting] = useState(false);
  
  // General settings form
  const generalForm = useForm<z.infer<typeof generalSettingsSchema>>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: {
      siteName: "HackerHire",
      siteDescription: "Connecting ethical hackers with clients for security services",
      contactEmail: "admin@hackerhire.com",
      supportPhone: "+1 (555) 123-4567",
      platformFee: 10,
      allowGuestBrowsing: true,
      maintenanceMode: false,
      requireVerification: true,
      defaultCurrency: "USD",
      dateFormat: "MM/DD/YYYY",
    },
  });
  
  // Email settings form
  const emailForm = useForm<z.infer<typeof emailSettingsSchema>>({
    resolver: zodResolver(emailSettingsSchema),
    defaultValues: {
      smtpHost: "smtp.example.com",
      smtpPort: 587,
      smtpUser: "notifications@hackerhire.com",
      smtpPassword: "••••••••••••",
      senderEmail: "no-reply@hackerhire.com",
      senderName: "HackerHire Notifications",
      enableEmailNotifications: true,
      emailFooter: "© 2025 HackerHire, Inc. All rights reserved.",
    },
  });
  
  // Security settings form
  const securityForm = useForm<z.infer<typeof securitySettingsSchema>>({
    resolver: zodResolver(securitySettingsSchema),
    defaultValues: {
      sessionTimeout: 60,
      maxLoginAttempts: 5,
      requireMfa: false,
      passwordExpiration: 90,
      minPasswordLength: 12,
      requireSpecialChars: true,
      enableCaptcha: true,
      apiRateLimit: 100,
    },
  });
  
  // Form submit handlers
  const onSubmitGeneralSettings = (data: z.infer<typeof generalSettingsSchema>) => {
    setIsGeneralSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log("General settings data:", data);
      setIsGeneralSubmitting(false);
      toast({
        title: "Settings updated",
        description: "General settings have been saved successfully.",
      });
    }, 1000);
  };
  
  const onSubmitEmailSettings = (data: z.infer<typeof emailSettingsSchema>) => {
    setIsEmailSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Email settings data:", data);
      setIsEmailSubmitting(false);
      toast({
        title: "Settings updated",
        description: "Email settings have been saved successfully.",
      });
    }, 1000);
  };
  
  const onSubmitSecuritySettings = (data: z.infer<typeof securitySettingsSchema>) => {
    setIsSecuritySubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Security settings data:", data);
      setIsSecuritySubmitting(false);
      toast({
        title: "Settings updated",
        description: "Security settings have been saved successfully.",
      });
    }, 1000);
  };
  
  return (
    <div className="flex min-h-screen bg-slate-950">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader title="Platform Settings" />
        <main className="flex-1 p-6 overflow-auto">
          <div className="space-y-6">
            {/* Page Header */}
            <div>
              <h1 className="text-2xl font-bold tracking-tight">System Configuration</h1>
              <p className="text-muted-foreground">
                Manage platform settings and configurations
              </p>
            </div>
            
            {/* Settings Tabs */}
            <Tabs defaultValue="general" className="space-y-6">
              <TabsList className="grid grid-cols-3 w-full md:w-1/2 xl:w-1/3">
                <TabsTrigger value="general">
                  <Settings className="mr-2 h-4 w-4" />
                  General
                </TabsTrigger>
                <TabsTrigger value="email">
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </TabsTrigger>
                <TabsTrigger value="security">
                  <Shield className="mr-2 h-4 w-4" />
                  Security
                </TabsTrigger>
              </TabsList>
              
              {/* General Settings Tab */}
              <TabsContent value="general">
                <Card>
                  <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                    <CardDescription>
                      Configure basic platform settings and behavior
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Form {...generalForm}>
                      <form onSubmit={generalForm.handleSubmit(onSubmitGeneralSettings)} className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                          <FormField
                            control={generalForm.control}
                            name="siteName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Site Name</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={generalForm.control}
                            name="contactEmail"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Contact Email</FormLabel>
                                <FormControl>
                                  <Input {...field} type="email" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={generalForm.control}
                            name="siteDescription"
                            render={({ field }) => (
                              <FormItem className="md:col-span-2">
                                <FormLabel>Site Description</FormLabel>
                                <FormControl>
                                  <Textarea {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={generalForm.control}
                            name="supportPhone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Support Phone</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={generalForm.control}
                            name="platformFee"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Platform Fee (%)</FormLabel>
                                <FormControl>
                                  <Input {...field} type="number" min="0" max="100" />
                                </FormControl>
                                <FormDescription>
                                  Percentage fee charged on transactions
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={generalForm.control}
                            name="defaultCurrency"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Default Currency</FormLabel>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select currency" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="USD">USD ($)</SelectItem>
                                    <SelectItem value="EUR">EUR (€)</SelectItem>
                                    <SelectItem value="GBP">GBP (£)</SelectItem>
                                    <SelectItem value="CAD">CAD ($)</SelectItem>
                                    <SelectItem value="AUD">AUD ($)</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={generalForm.control}
                            name="dateFormat"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Date Format</FormLabel>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select date format" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="space-y-4 border-t pt-6">
                          <h3 className="text-lg font-medium">Platform Behavior</h3>
                          
                          <div className="grid gap-4 md:grid-cols-2">
                            <FormField
                              control={generalForm.control}
                              name="allowGuestBrowsing"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                  <div className="space-y-0.5">
                                    <FormLabel className="text-base">
                                      Allow Guest Browsing
                                    </FormLabel>
                                    <FormDescription>
                                      Let visitors browse projects without logging in
                                    </FormDescription>
                                  </div>
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={generalForm.control}
                              name="maintenanceMode"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                  <div className="space-y-0.5">
                                    <FormLabel className="text-base">
                                      Maintenance Mode
                                    </FormLabel>
                                    <FormDescription>
                                      Temporarily disable the platform for maintenance
                                    </FormDescription>
                                  </div>
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={generalForm.control}
                              name="requireVerification"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                  <div className="space-y-0.5">
                                    <FormLabel className="text-base">
                                      Require Hacker Verification
                                    </FormLabel>
                                    <FormDescription>
                                      Hackers must be verified before bidding on projects
                                    </FormDescription>
                                  </div>
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        
                        <div className="flex justify-end gap-3">
                          <Button type="button" variant="outline">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Reset Defaults
                          </Button>
                          <Button type="submit" disabled={isGeneralSubmitting}>
                            {isGeneralSubmitting ? (
                              <>
                                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                              </>
                            ) : (
                              <>
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                              </>
                            )}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Email Settings Tab */}
              <TabsContent value="email">
                <Card>
                  <CardHeader>
                    <CardTitle>Email Configuration</CardTitle>
                    <CardDescription>
                      Configure email server settings and notification templates
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Form {...emailForm}>
                      <form onSubmit={emailForm.handleSubmit(onSubmitEmailSettings)} className="space-y-6">
                        <div className="space-y-4 rounded-lg border p-4">
                          <h3 className="text-lg font-medium">SMTP Configuration</h3>
                          
                          <div className="grid gap-6 md:grid-cols-2">
                            <FormField
                              control={emailForm.control}
                              name="smtpHost"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>SMTP Host</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={emailForm.control}
                              name="smtpPort"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>SMTP Port</FormLabel>
                                  <FormControl>
                                    <Input {...field} type="number" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={emailForm.control}
                              name="smtpUser"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>SMTP Username</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={emailForm.control}
                              name="smtpPassword"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>SMTP Password</FormLabel>
                                  <FormControl>
                                    <Input {...field} type="password" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-4 rounded-lg border p-4">
                          <h3 className="text-lg font-medium">Email Notifications</h3>
                          
                          <div className="grid gap-6 md:grid-cols-2">
                            <FormField
                              control={emailForm.control}
                              name="senderEmail"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Sender Email</FormLabel>
                                  <FormControl>
                                    <Input {...field} type="email" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={emailForm.control}
                              name="senderName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Sender Name</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={emailForm.control}
                              name="emailFooter"
                              render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                  <FormLabel>Email Footer</FormLabel>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        
                        <FormField
                          control={emailForm.control}
                          name="enableEmailNotifications"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Enable Email Notifications
                                </FormLabel>
                                <FormDescription>
                                  Send automated email notifications to users
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <div className="flex justify-end gap-3">
                          <Button type="button" variant="outline">
                            <Mail className="mr-2 h-4 w-4" />
                            Send Test Email
                          </Button>
                          <Button type="submit" disabled={isEmailSubmitting}>
                            {isEmailSubmitting ? (
                              <>
                                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                              </>
                            ) : (
                              <>
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                              </>
                            )}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Security Settings Tab */}
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Configure security policy and authentication requirements
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Form {...securityForm}>
                      <form onSubmit={securityForm.handleSubmit(onSubmitSecuritySettings)} className="space-y-6">
                        <div className="space-y-4 rounded-lg border p-4">
                          <h3 className="text-lg font-medium">Authentication Settings</h3>
                          
                          <div className="grid gap-6 md:grid-cols-2">
                            <FormField
                              control={securityForm.control}
                              name="sessionTimeout"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Session Timeout (minutes)</FormLabel>
                                  <FormControl>
                                    <Input {...field} type="number" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={securityForm.control}
                              name="maxLoginAttempts"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Max Login Attempts</FormLabel>
                                  <FormControl>
                                    <Input {...field} type="number" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={securityForm.control}
                              name="requireMfa"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                                  <div className="space-y-0.5">
                                    <FormLabel className="text-base">
                                      Require MFA
                                    </FormLabel>
                                    <FormDescription>
                                      Force 2FA for all admin accounts
                                    </FormDescription>
                                  </div>
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={securityForm.control}
                              name="enableCaptcha"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                                  <div className="space-y-0.5">
                                    <FormLabel className="text-base">
                                      Enable CAPTCHA
                                    </FormLabel>
                                    <FormDescription>
                                      Use CAPTCHA on login and registration
                                    </FormDescription>
                                  </div>
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-4 rounded-lg border p-4">
                          <h3 className="text-lg font-medium">Password Policy</h3>
                          
                          <div className="grid gap-6 md:grid-cols-2">
                            <FormField
                              control={securityForm.control}
                              name="passwordExpiration"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Password Expiration (days)</FormLabel>
                                  <FormControl>
                                    <Input {...field} type="number" />
                                  </FormControl>
                                  <FormDescription>
                                    Set to 0 for no expiration
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={securityForm.control}
                              name="minPasswordLength"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Minimum Password Length</FormLabel>
                                  <FormControl>
                                    <Input {...field} type="number" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={securityForm.control}
                              name="requireSpecialChars"
                              render={({ field }) => (
                                <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel>
                                      Require Special Characters
                                    </FormLabel>
                                    <FormDescription>
                                      Passwords must contain special characters
                                    </FormDescription>
                                  </div>
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-4 rounded-lg border p-4">
                          <h3 className="text-lg font-medium">API Security</h3>
                          
                          <div className="grid gap-6 md:grid-cols-2">
                            <FormField
                              control={securityForm.control}
                              name="apiRateLimit"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>API Rate Limit (requests/minute)</FormLabel>
                                  <FormControl>
                                    <Input {...field} type="number" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        
                        <div className="flex justify-end gap-3">
                          <Button type="button" variant="outline" className="gap-2">
                            <Shield className="h-4 w-4" />
                            Run Security Scan
                          </Button>
                          <Button type="submit" disabled={isSecuritySubmitting}>
                            {isSecuritySubmitting ? (
                              <>
                                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                              </>
                            ) : (
                              <>
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                              </>
                            )}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
                
                <div className="mt-6 rounded-lg bg-amber-500/10 border border-amber-500/30 p-4 flex gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-500">Security Notice</h4>
                    <p className="text-sm text-amber-400/90">
                      Changing these settings may affect user access and security protocols.
                      Make sure you understand the implications before saving changes.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}