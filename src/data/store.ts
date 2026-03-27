import type { Article } from './categories';
export type { Article } from './categories';

// Admin credentials - can be changed
export const ADMIN_CREDENTIALS = {
  username: 'codeByLex',
  password: 'LexHowTo2024!',
};

// Storage keys
const STORAGE_KEYS = {
  ARTICLES: 'howto_articles',
  FEEDBACK: 'howto_feedback',
  ADMIN_SESSION: 'howto_admin_session',
};

// Default articles (from categories.ts)
import { articles as defaultArticles, categories } from './categories';
export { categories };

// Feedback type
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

// Get articles from localStorage or use defaults
export const getArticles = (): Article[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.ARTICLES);
  if (stored) {
    return JSON.parse(stored);
  }
  // Initialize with defaults
  localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(defaultArticles));
  return defaultArticles;
};

// Save articles to localStorage
export const saveArticles = (articles: Article[]) => {
  localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
};

// Add new article
export const addArticle = (article: Omit<Article, 'id'>): Article => {
  const articles = getArticles();
  const newArticle: Article = {
    ...article,
    id: `article-${Date.now()}`,
  };
  articles.push(newArticle);
  saveArticles(articles);
  return newArticle;
};

// Update article
export const updateArticle = (id: string, updates: Partial<Article>): Article | null => {
  const articles = getArticles();
  const index = articles.findIndex(a => a.id === id);
  if (index === -1) return null;
  
  articles[index] = { ...articles[index], ...updates };
  saveArticles(articles);
  return articles[index];
};

// Delete article
export const deleteArticle = (id: string): boolean => {
  const articles = getArticles();
  const filtered = articles.filter(a => a.id !== id);
  if (filtered.length === articles.length) return false;
  saveArticles(filtered);
  return true;
};

// Get article by ID
export const getArticleById = (id: string): Article | undefined => {
  return getArticles().find(a => a.id === id);
};

// Get featured articles
export const getFeaturedArticles = (): Article[] => {
  return getArticles().filter(a => a.featured);
};

// Get latest articles (non-featured)
export const getLatestArticles = (): Article[] => {
  return getArticles().filter(a => !a.featured);
};

// Get articles by category
export const getArticlesByCategory = (categoryId: string): Article[] => {
  return getArticles().filter(a => a.categoryId === categoryId);
};

// Search articles
export const searchArticles = (query: string): Article[] => {
  const articles = getArticles();
  const lowerQuery = query.toLowerCase().trim();
  
  if (!lowerQuery) return [];
  
  return articles.filter(article => 
    article.title.toLowerCase().includes(lowerQuery) ||
    article.description.toLowerCase().includes(lowerQuery) ||
    article.category.toLowerCase().includes(lowerQuery) ||
    (article.content && article.content.some((step: string) => 
      step.toLowerCase().includes(lowerQuery)
    ))
  );
};

// Admin authentication
export const loginAdmin = (username: string, password: string): boolean => {
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, JSON.stringify({
      username,
      loggedInAt: Date.now(),
    }));
    return true;
  }
  return false;
};

export const logoutAdmin = () => {
  localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
};

export const isAdminLoggedIn = (): boolean => {
  const session = localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION);
  if (!session) return false;
  
  try {
    const { loggedInAt } = JSON.parse(session);
    // Session expires after 24 hours
    return Date.now() - loggedInAt < 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
};

// Get feedback
export const getFeedback = (): Feedback[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.FEEDBACK);
  return stored ? JSON.parse(stored) : [];
};

// Add feedback
/* export const addFeedback = (feedback: Omit<Feedback, 'id' | 'createdAt' | 'status'>): Feedback => {
  const feedbacks = getFeedback();
  const newFeedback: Feedback = {
    ...feedback,
    id: `feedback-${Date.now()}`,
    createdAt: Date.now(),
    status: 'pending',
  };
  feedbacks.push(newFeedback);
  localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(feedbacks));
  return newFeedback;
}; */

import emailjs from '@emailjs/browser';

export const addFeedback = async (feedback: Omit<Feedback, 'id' | 'createdAt' | 'status'>): Promise<void> => {
  try {
    await emailjs.send(
      "service_400rphc",   // EmailJS service ID
      "template_ffysrrh",  // EmailJS template ID
      {
        type: feedback.type,
        name: feedback.name,
        email: feedback.email,
        subject: feedback.subject,
        message: feedback.message,
      },
      "YxS_usmhIzFDMAD8n"    // EmailJS public key
    );
    console.log("Feedback sent successfully!");
  } catch (error) {
    console.error("Failed to send feedback:", error);
  }
};

// Update feedback status
export const updateFeedbackStatus = (id: string, status: Feedback['status']): boolean => {
  const feedbacks = getFeedback();
  const index = feedbacks.findIndex(f => f.id === id);
  if (index === -1) return false;
  
  feedbacks[index].status = status;
  localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(feedbacks));
  return true;
};

// Delete feedback
export const deleteFeedback = (id: string): boolean => {
  const feedbacks = getFeedback();
  const filtered = feedbacks.filter(f => f.id !== id);
  if (filtered.length === feedbacks.length) return false;
  localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(filtered));
  return true;
};

// Change admin password
export const changeAdminPassword = (currentPassword: string, newPassword: string): boolean => {
  if (currentPassword !== ADMIN_CREDENTIALS.password) return false;
  ADMIN_CREDENTIALS.password = newPassword;
  return true;
};
