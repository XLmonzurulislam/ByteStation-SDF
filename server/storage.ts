import mongoose from 'mongoose';
import type { 
  User, InsertUser, 
  Project, InsertProject,
  Review, InsertReview,
  Application, InsertApplication,
  ContactMessage, InsertContactMessage
} from "@shared/schema";

// Define schemas first
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  userType: { type: String, required: true },
  fullName: { type: String, required: true },
  company: String,
  title: String,
  bio: String,
  location: String,
  profileImage: String,
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const ProjectSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  requirements: { type: String, required: true },
  budget: { type: String, default: "$1,000 - $5,000" },
  timeframe: { type: String, required: true, default: "2-4 weeks" },
  additionalDetails: String,
  status: { type: String, default: 'open' },
  createdAt: { type: Date, default: Date.now },
  skills: [{ type: String }]
});

const ReviewSchema = new mongoose.Schema({
  projectId: { type: Number, required: true },
  clientId: { type: Number, required: true },
  hackerId: { type: Number, required: true },
  rating: { type: Number, required: true },
  comment: String,
  createdAt: { type: Date, default: Date.now }
});

const ApplicationSchema = new mongoose.Schema({
  projectId: { type: Number, required: true },
  hackerId: { type: Number, required: true },
  proposal: { type: String, required: true },
  estimatedTime: { type: String, required: true },
  priceQuote: { type: String, required: true },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const ContactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  inquiryType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false }
});

// Create models
const UserModel = mongoose.model('User', UserSchema);
const ProjectModel = mongoose.model('Project', ProjectSchema);
const ReviewModel = mongoose.model('Review', ReviewSchema);
const ApplicationModel = mongoose.model('Application', ApplicationSchema);
const ContactMessageModel = mongoose.model('ContactMessage', ContactMessageSchema);

// Connect to MongoDB
const mongoUrl = 'mongodb+srv://sihabsorker:wqh43ejUhKbApbDM@bytestationsdf.kgqepld.mongodb.net/?retryWrites=true&w=majority&appName=ByteStationSDF';

mongoose.connect(mongoUrl, {
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('Connected to MongoDB Atlas');

  // Check if admin exists, if not create one
  const adminExists = await UserModel.findOne({ userType: 'admin' });
  if (!adminExists) {
    await UserModel.create({
      username: 'admin',
      password: 'admin123',
      email: 'admin@example.com',
      fullName: 'Admin User',
      userType: 'admin'
    });
    console.log('Default admin user created');
  }
})
.catch(err => {
  console.error('Failed to connect to MongoDB Atlas:', err);
  process.exit(1);
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connection established successfully');
});

mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB connection disconnected');
});

// Storage class implementation
class Storage {
  async createUser(data: InsertUser) {
    const user = new UserModel(data);
    return await user.save();
  }

  async getUser(id: string | number) {
    try {
      return await UserModel.findById(id.toString());
    } catch (error) {
      console.error("Error getting user:", error);
      return null;
    }
  }

  async getUserByUsername(username: string) {
    return await UserModel.findOne({ username });
  }

  async getUserByEmail(email: string) {
    return await UserModel.findOne({ email });
  }

  async listUsers(userType?: string) {
    return await UserModel.find(userType ? { userType } : {});
  }

  async updateUser(id: number, data: Partial<InsertUser>) {
    return await UserModel.findByIdAndUpdate(id, data, { new: true });
  }

  async createProject(data: InsertProject) {
    try {
      // Validate and sanitize data
      const projectData = {
        clientId: new mongoose.Types.ObjectId(data.clientId.toString()),
        title: data.title?.trim(),
        description: data.description?.trim(),
        requirements: data.requirements?.trim(),
        budget: data.budget || "$1,000 - $5,000",
        timeframe: data.timeframe || "2-4 weeks",
        additionalDetails: data.additionalDetails?.trim(),
        status: data.status || 'open',
        skills: Array.isArray(data.skills) ? data.skills : []
      };

      // Validate required fields
      if (!projectData.title || projectData.title.length < 10) {
        throw new Error("Project title must be at least 10 characters long");
      }
      if (!projectData.description || projectData.description.length < 50) {
        throw new Error("Project description must be at least 50 characters long");
      }
      if (!projectData.requirements || projectData.requirements.length < 20) {
        throw new Error("Project requirements must be at least 20 characters long");
      }

      const project = new ProjectModel(projectData);
      return await project.save();
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
  }

  async getProject(id: string | number) {
    if (typeof id === 'number') {
      return await ProjectModel.findOne({ _id: id });
    }
    return await ProjectModel.findById(id);
  }

  async listProjects(status?: string) {
    try {
      const query = status ? { status } : {};
      const projects = await ProjectModel.find(query)
        .populate('clientId', 'username fullName company')
        .sort({ createdAt: -1 });

      // Filter out invalid projects and ensure required fields
      const validProjects = projects.map(project => ({
        ...project.toObject(),
        title: project.title || "Untitled",
        description: project.description || "No description provided",
        requirements: project.requirements || "",
        budget: project.budget || "$1,000 - $5,000",
        timeframe: project.timeframe || "2-4 weeks",
        status: project.status || "open",
        clientId: project.clientId?._id || project.clientId,
        clientName: project.clientId?.fullName || "Unknown Client",
        createdAt: project.createdAt || new Date()
      }));

      return validProjects;
    } catch (error) {
      console.error("Error listing projects:", error);
      return [];
    }
  }

  async getProjectsByClientId(clientId: string | number) {
    return await ProjectModel.find({ clientId: clientId.toString() }).sort({ createdAt: -1 });
  }

  async updateProject(id: number, data: Partial<InsertProject>) {
    return await ProjectModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteProject(id: number) {
    return await ProjectModel.findByIdAndDelete(id);
  }

  async createReview(data: InsertReview) {
    const review = new ReviewModel(data);
    return await review.save();
  }

  async getReviewsByHackerId(hackerId: number) {
    return await ReviewModel.find({ hackerId });
  }

  async createApplication(data: InsertApplication) {
    const application = new ApplicationModel(data);
    return await application.save();
  }

  async getApplicationsByProjectId(projectId: number) {
    return await ApplicationModel.find({ projectId });
  }

  async getApplicationsByHackerId(hackerId: number) {
    return await ApplicationModel.find({ hackerId });
  }

  async createContactMessage(data: InsertContactMessage) {
    const message = new ContactMessageModel(data);
    return await message.save();
  }

  async listTestimonials() {
    return await ReviewModel.find({ featured: true });
  }

  async getProjectSkills(projectId: number) {
    return []; // Return empty array until skills schema is implemented
  }

  async addProjectSkill(data: { projectId: number; skill: string }) {
    // Skills will be stored when skills schema is implemented
    return { projectId: data.projectId, skill: data.skill };
  }

  async deleteProjects(ids: number[]) {
    const result = await ProjectModel.deleteMany({ _id: { $in: ids } });
    return result.deletedCount || 0;
  }
}

export const storage = new Storage();