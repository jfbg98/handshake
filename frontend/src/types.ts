// Type definitions for the Handshake application

export interface Profile {
  id: string;
  name: string;
  role: "dev" | "founder";
  bio: string;
  skills: string;
  stage: "idea" | "mvp" | "growth";
  contact: string;
  created_at: string;
  avatar?: string; // Optional avatar URL
}

// Connection request between users
export interface ConnectionRequest {
  id: string;
  fromId: string; // ID of user sending request
  toId: string; // ID of user receiving request
  message: string; // Introduction message
  timestamp: string; // ISO 8601 timestamp
  status: "pending" | "accepted" | "rejected"; // Request status
}

// Mock data for development and testing
export const mockProfiles: Profile[] = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "founder",
    bio: "Building an AI-powered meal planning app for busy parents",
    skills: "Looking for a full-stack developer with React and Node.js experience. Bonus if you know ML/AI.",
    stage: "idea",
    contact: "sarah.chen@email.com",
    created_at: "2024-12-01T10:30:00Z",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: "2",
    name: "Marcus Johnson",
    role: "dev",
    bio: "Full-stack engineer interested in health tech and sustainability",
    skills: "React, TypeScript, Python, AWS. Open to equity-based partnerships.",
    stage: "idea",
    contact: "marcus.j.dev@email.com",
    created_at: "2024-12-02T14:20:00Z",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: "3",
    name: "Priya Sharma",
    role: "founder",
    bio: "Launched MVP for local services marketplace, need technical co-founder",
    skills: "Need experienced mobile developer (React Native or Flutter) to scale our platform.",
    stage: "mvp",
    contact: "priya@localservices.co",
    created_at: "2024-12-03T09:15:00Z",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: "4",
    name: "Alex Rivera",
    role: "dev",
    bio: "Senior backend engineer looking to join early-stage fintech startup",
    skills: "Go, Kubernetes, PostgreSQL, payment systems. 8 years experience in banking tech.",
    stage: "mvp",
    contact: "alex.rivera.tech@email.com",
    created_at: "2024-12-04T16:45:00Z",
    avatar: "https://i.pravatar.cc/150?img=33",
  },
  {
    id: "5",
    name: "James Park",
    role: "founder",
    bio: "SaaS for remote team collaboration - 500+ users, seeking CTO",
    skills: "Looking for experienced technical leader to scale infrastructure and build engineering team.",
    stage: "growth",
    contact: "james@teamhub.io",
    created_at: "2024-12-05T11:00:00Z",
    avatar: "https://i.pravatar.cc/150?img=68",
  },
];

