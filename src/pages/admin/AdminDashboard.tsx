import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  LogOut, 
  Plus, 
  Edit2, 
  Trash2, 
  Search,
  CheckCircle,
  Clock,
  Menu,
  Eye
} from 'lucide-react';
import type { Article, Feedback } from '../../data/store';
import { 
  getArticles, 
  getFeedback, 
  deleteArticle, 
  updateFeedbackStatus,
  deleteFeedback,
  logoutAdmin,
} from '../../data/store';

import ArticleManagement from "./ArticleManagement"; 
import NewArticle from "./NewArticle";
import FeedbackManagement from "./FeedbackManagement";


// Dashboard Overview
const DashboardOverview = () => {
  const [stats, setStats] = useState({
    totalArticles: 0,
    featuredArticles: 0,
    totalFeedback: 0,
    pendingFeedback: 0,
  });

  useEffect(() => {
    const articles = getArticles();
    const feedback = getFeedback();
    setStats({
      totalArticles: articles.length,
      featuredArticles: articles.filter(a => a.featured).length,
      totalFeedback: feedback.length,
      pendingFeedback: feedback.filter(f => f.status === 'pending').length,
    });
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-dark-800 rounded-xl border border-dark-500 p-6">
          <div className="text-gray-400 text-sm mb-2">Total Articles</div>
          <div className="text-3xl font-bold text-white">{stats.totalArticles}</div>
        </div>
        <div className="bg-dark-800 rounded-xl border border-dark-500 p-6">
          <div className="text-gray-400 text-sm mb-2">Featured Articles</div>
          <div className="text-3xl font-bold text-red-500">{stats.featuredArticles}</div>
        </div>
        <div className="bg-dark-800 rounded-xl border border-dark-500 p-6">
          <div className="text-gray-400 text-sm mb-2">Total Feedback</div>
          <div className="text-3xl font-bold text-white">{stats.totalFeedback}</div>
        </div>
        <div className="bg-dark-800 rounded-xl border border-dark-500 p-6">
          <div className="text-gray-400 text-sm mb-2">Pending Feedback</div>
          <div className="text-3xl font-bold text-yellow-500">{stats.pendingFeedback}</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-dark-800 rounded-xl border border-dark-500 p-6">
        <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/admin/articles/new"
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Plus size={18} />
            Create Article
          </Link>
          <Link
            to="/admin/feedback"
            className="flex items-center gap-2 px-4 py-2 bg-dark-700 text-white rounded-lg hover:bg-dark-600 transition-colors"
          >
            <MessageSquare size={18} />
            View Feedback
          </Link>
        </div>
      </div>
    </div>
  );
};

// Main Admin Dashboard
const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/articles', label: 'Articles', icon: FileText },
    { path: '/admin/feedback', label: 'Feedback', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-black flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-dark-800 border-r border-dark-500 
          transform transition-transform duration-300 lg:transform-none
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-dark-500">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">
              How<span className="text-red-600">To</span>
            </span>
          </Link>
          <p className="text-gray-500 text-sm mt-1">Admin Panel</p>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-red-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-dark-700'
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-dark-500">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-500 
              hover:bg-red-500/10 rounded-lg transition-colors w-full"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-dark-800 border-b border-dark-500 p-4 flex items-center justify-between lg:justify-end">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 text-gray-400 hover:text-white"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              target="_blank"
              className="text-gray-400 hover:text-white text-sm flex items-center gap-2"
            >
              <Eye size={16} />
              View Site
            </Link>
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-medium">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/articles" element={<ArticleManagement />} />
            <Route path="articles/new" element={<NewArticle />} />
            <Route path="/feedback" element={<FeedbackManagement />} />
            <Route path="*" element={<DashboardOverview />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
