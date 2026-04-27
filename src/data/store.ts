export interface Feedback {
  id: string;
  type: 'request' | 'issue' | 'suggestion';
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: number;
  status: 'pending' | 'read' | 'resolved';
}

export interface Category {
  _id: string;          
  name: string;
  description?: string;
  imageUrl?: string;       
  articleCount?: number;
}

export interface Article {
  _id: string;
  title: string;
  description?: string;
  category: Category;
  readTime?: number;
  imageUrl?: string;       
  videoUrl?: string;
  featured?: boolean;
  content?: string[];
  createdAt?: string;
  updatedAt?: string;
}