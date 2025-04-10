import { pgTable, text, serial, integer, boolean, timestamp, doublePrecision } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table - for both clients and hackers
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  userType: text("user_type").notNull(), // "client" or "hacker"
  fullName: text("full_name").notNull(),
  company: text("company"),
  title: text("title"),
  bio: text("bio"),
  location: text("location"),
  profileImage: text("profile_image"),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Projects table
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  requirements: text("requirements").notNull(),
  budget: text("budget").notNull(),
  timeframe: text("timeframe").notNull(),
  additionalDetails: text("additional_details"),
  status: text("status").notNull().default("open"), // "open", "in-progress", "completed", "canceled"
  createdAt: timestamp("created_at").defaultNow(),
});

// Project Skills junction table
export const projectSkills = pgTable("project_skills", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  skill: text("skill").notNull(),
});

// Hacker skills
export const hackerSkills = pgTable("hacker_skills", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  skill: text("skill").notNull(),
  yearsExperience: integer("years_experience"),
});

// Hacker certifications
export const hackerCertifications = pgTable("hacker_certifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  issuer: text("issuer"),
  dateObtained: timestamp("date_obtained"),
});

// Reviews
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  clientId: integer("client_id").notNull(),
  hackerId: integer("hacker_id").notNull(),
  rating: doublePrecision("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Testimonials (featured reviews for homepage)
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  reviewId: integer("review_id").notNull(),
  isFeatured: boolean("is_featured").default(false),
});

// Project applications
export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  hackerId: integer("hacker_id").notNull(),
  proposal: text("proposal").notNull(),
  estimatedTime: text("estimated_time").notNull(),
  priceQuote: text("price_quote").notNull(),
  status: text("status").notNull().default("pending"), // "pending", "accepted", "rejected"
  createdAt: timestamp("created_at").defaultNow(),
});

// Contact messages
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  inquiryType: text("inquiry_type").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  isRead: boolean("is_read").default(false),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertProjectSchema = createInsertSchema(projects).omit({ id: true, createdAt: true });
export const insertProjectSkillSchema = createInsertSchema(projectSkills).omit({ id: true });
export const insertHackerSkillSchema = createInsertSchema(hackerSkills).omit({ id: true });
export const insertHackerCertificationSchema = createInsertSchema(hackerCertifications).omit({ id: true });
export const insertReviewSchema = createInsertSchema(reviews).omit({ id: true, createdAt: true });
export const insertTestimonialSchema = createInsertSchema(testimonials).omit({ id: true });
export const insertApplicationSchema = createInsertSchema(applications).omit({ id: true, createdAt: true });
export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({ id: true, createdAt: true, isRead: true });

// Insert types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type InsertProjectSkill = z.infer<typeof insertProjectSkillSchema>;
export type InsertHackerSkill = z.infer<typeof insertHackerSkillSchema>;
export type InsertHackerCertification = z.infer<typeof insertHackerCertificationSchema>;
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;

// Select types
export type User = typeof users.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type ProjectSkill = typeof projectSkills.$inferSelect;
export type HackerSkill = typeof hackerSkills.$inferSelect;
export type HackerCertification = typeof hackerCertifications.$inferSelect;
export type Review = typeof reviews.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
export type Application = typeof applications.$inferSelect;
export type ContactMessage = typeof contactMessages.$inferSelect;