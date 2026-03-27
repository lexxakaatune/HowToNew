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

// Article Management Component
const ArticleManagement = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    setArticles(getArticles());
  }, []);

  const handleDelete = (id: string) => {
    if (deleteConfirm === id) {
      deleteArticle(id);
      setArticles(getArticles());
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-white">Articles</h2>
        <Link
          to="/admin/articles/new"
          className="btn-primary flex items-center gap-2 w-fit"
        >
          <Plus size={18} />
          New Article
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-dark-900 border border-dark-500 rounded-lg py-3 pl-12 pr-4 text-white 
            placeholder-gray-500 focus:outline-none focus:border-red-600"
        />
      </div>

      {/* Articles Table */}
      <div className="bg-dark-800 rounded-xl border border-dark-500 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-900 border-b border-dark-500">
              <tr>
                <th className="text-left px-6 py-4 text-gray-400 font-medium">Title</th>
                <th className="text-left px-6 py-4 text-gray-400 font-medium">Category</th>
                <th className="text-left px-6 py-4 text-gray-400 font-medium">Read Time</th>
                <th className="text-left px-6 py-4 text-gray-400 font-medium">Status</th>
                <th className="text-right px-6 py-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-500">
              {filteredArticles.map((article) => (
                <tr key={article.id} className="hover:bg-dark-700/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <span className="text-white font-medium line-clamp-1">{article.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{article.category}</td>
                  <td className="px-6 py-4 text-gray-400">{article.readTime} min</td>
                  <td className="px-6 py-4">
                    {article.featured ? (
                      <span className="px-2 py-1 bg-red-600/20 text-red-500 text-xs rounded-full">
                        Featured
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-dark-700 text-gray-400 text-xs rounded-full">
                        Standard
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/article/${article.id}`}
                        target="_blank"
                        className="p-2 text-gray-400 hover:text-white hover:bg-dark-700 rounded-lg transition-colors"
                        title="View"
                      >
                        <Eye size={18} />
                      </Link>
                      <Link
                        to={`/admin/articles/edit/${article.id}`}
                        className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          deleteConfirm === article.id
                            ? 'text-red-500 bg-red-500/10'
                            : 'text-gray-400 hover:text-red-500 hover:bg-red-500/10'
                        }`}
                        title={deleteConfirm === article.id ? 'Click again to confirm' : 'Delete'}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No articles found</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Feedback Management Component
const FeedbackManagement = () => {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'read' | 'resolved'>('all');

  useEffect(() => {
    setFeedback(getFeedback());
  }, []);

  const handleStatusChange = (id: string, status: Feedback['status']) => {
    updateFeedbackStatus(id, status);
    setFeedback(getFeedback());
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this feedback?')) {
      deleteFeedback(id);
      setFeedback(getFeedback());
    }
  };

  const filteredFeedback = feedback.filter(f => 
    filter === 'all' || f.status === filter
  );

  const getStatusIcon = (status: Feedback['status']) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} className="text-yellow-500" />;
      case 'read':
        return <Eye size={16} className="text-blue-500" />;
      case 'resolved':
        return <CheckCircle size={16} className="text-green-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-white">Feedback</h2>
        <div className="flex gap-2">
          {(['all', 'pending', 'read', 'resolved'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === status
                  ? 'bg-red-600 text-white'
                  : 'bg-dark-800 text-gray-400 hover:text-white border border-dark-500'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {filteredFeedback.map((item) => (
          <div key={item.id} className="bg-dark-800 rounded-xl border border-dark-500 p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {getStatusIcon(item.status)}
                  <span className={`text-sm font-medium ${
                    item.status === 'pending' ? 'text-yellow-500' :
                    item.status === 'read' ? 'text-blue-500' :
                    'text-green-500'
                  }`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-white font-semibold mb-1">{item.subject}</h3>
                <p className="text-gray-400 text-sm mb-2">
                  From: {item.name} ({item.email})
                </p>
                <p className="text-gray-300">{item.message}</p>
              </div>
              <div className="flex flex-col gap-2">
                {item.status !== 'read' && (
                  <button
                    onClick={() => handleStatusChange(item.id, 'read')}
                    className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors"
                    title="Mark as Read"
                  >
                    <Eye size={18} />
                  </button>
                )}
                {item.status !== 'resolved' && (
                  <button
                    onClick={() => handleStatusChange(item.id, 'resolved')}
                    className="p-2 text-green-500 hover:bg-green-500/10 rounded-lg transition-colors"
                    title="Mark as Resolved"
                  >
                    <CheckCircle size={18} />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filteredFeedback.length === 0 && (
          <div className="text-center py-12 bg-dark-800 rounded-xl border border-dark-500">
            <p className="text-gray-400">No feedback found</p>
          </div>
        )}
      </div>
    </div>
  );
};

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
            <Route path="/feedback" element={<FeedbackManagement />} />
            <Route path="*" element={<DashboardOverview />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
