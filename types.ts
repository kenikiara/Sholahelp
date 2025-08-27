export interface Addons {
  powerpoint: boolean;
  turnitinAI: boolean;
  turnitinPlagiarism: boolean;
  copyLeaks: boolean;
  gptZero: boolean;
  originalityAI: boolean;
}

export type AddonKey = keyof Addons;

export interface OrderDetails {
  academicLevel: 'high_school' | 'undergrad' | 'master' | 'phd';
  serviceId: number;
  subjectId: number;
  pages: number;
  deadline: number; // hours
  addons: Addons;
}


export interface GeneratedTopic {
  recipeName: string; // Using recipeName as per Gemini schema for 'topic'
  ingredients: string[]; // Using ingredients as per Gemini schema for 'outline points'
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}

export interface Sample {
    id: number;
    title: string;
    subject: string;
    academicLevel: 'High School' | 'Undergraduate' | 'Master' | 'PhD';
    pages: number;
    fileUrl: string; // Placeholder for file path
    isFeatured: boolean;
}

export interface OrderChatAttachment {
    fileName: string;
    fileSize: string; // e.g., "2.4 MB"
    fileUrl: string; // Placeholder
}

export interface OrderChatMessage {
    id: number;
    sender: 'user' | 'writer' | 'admin';
    timestamp: string; // ISO string
    text?: string;
    attachment?: OrderChatAttachment;
}

export interface UserOrder {
    id: string;
    userName: string;
    userAvatar: string;
    serviceName: string;
    subjectName: string;
    status: 'In Progress' | 'Completed' | 'Awaiting Writer';
    deadline: string; // ISO 8601 date string
    pages: number;
    price: number;
    projectDetails: string;
    chatHistory: OrderChatMessage[];
}

export interface Customer {
    id: string;
    name: string;
    avatar: string;
    role: 'Client'; // Could be expanded later
    status: 'Active' | 'Inactive';
    lastLogin: string; // ISO Date string
    totalOrders: number;
    totalSpent: number;
}

export interface Service {
  id: number;
  name: string;
  icon: string;
  multiplier: number;
}

export interface Article {
  id: number;
  title: string;
  author: string;
  category: string;
  date: string; // ISO String
  excerpt: string;
  content: string; 
  imageUrl: string;
  isPublished: boolean;
}


// --- NEW TYPES FOR ADMIN CHAT ---
export interface AdminChatAttachment {
    fileName: string;
    fileSize: string;
    fileUrl: string;
}

export interface AdminChatMessage {
    id: number;
    sender: 'user' | 'admin';
    timestamp: string;
    text?: string;
    attachment?: AdminChatAttachment;
}