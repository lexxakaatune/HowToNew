import { useEffect, useState } from 'react';
import { X, Clock, Calendar, User, Share2, Bookmark, Printer } from 'lucide-react';
import { getArticleById } from '../data/categories';

interface ArticleModalProps {
  articleId: string | null;
  onClose: () => void;
}

const ArticleModal = ({ articleId, onClose }: ArticleModalProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const article = articleId ? getArticleById(articleId) : null;

  useEffect(() => {
    if (articleId) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [articleId]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!article) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-500 ${
        isAnimating ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={`relative w-full max-w-4xl max-h-[90vh] bg-dark-800 rounded-2xl overflow-hidden
          border border-dark-500 shadow-2xl transition-all duration-500 ${
            isAnimating ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'
          }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full
            flex items-center justify-center text-white hover:bg-red-600 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[90vh]">
          {/* Hero Image */}
          <div className="relative h-64 md:h-80">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-800 via-dark-800/50 to-transparent" />
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-red-600 text-white text-sm font-medium rounded-full">
                {article.category}
              </span>
            </div>

            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                {article.title}
              </h1>
              
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{article.readTime} min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>HowTo Editorial Team</span>
                </div>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="p-6 md:p-8">
            {/* Action Buttons */}
            <div className="flex gap-3 mb-8 pb-6 border-b border-dark-500">
              <button className="flex items-center gap-2 px-4 py-2 bg-dark-700 rounded-lg text-gray-300 hover:text-white hover:bg-dark-600 transition-colors">
                <Bookmark size={18} />
                <span className="text-sm">Save</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-dark-700 rounded-lg text-gray-300 hover:text-white hover:bg-dark-600 transition-colors">
                <Share2 size={18} />
                <span className="text-sm">Share</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-dark-700 rounded-lg text-gray-300 hover:text-white hover:bg-dark-600 transition-colors">
                <Printer size={18} />
                <span className="text-sm">Print</span>
              </button>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              {article.description}
            </p>

            {/* Steps */}
            {article.content && article.content.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white mb-4">Step-by-Step Guide</h2>
                {article.content.map((step, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-4 bg-dark-700/50 rounded-xl border border-dark-500 hover:border-red-600/30 transition-colors"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <p className="text-gray-300 leading-relaxed pt-1">{step}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Tips Section */}
            <div className="mt-8 p-6 bg-red-600/10 border border-red-600/20 rounded-xl">
              <h3 className="text-red-500 font-semibold mb-2">Pro Tip</h3>
              <p className="text-gray-400 text-sm">
                Take your time with each step and don&apos;t hesitate to re-read instructions. 
                Safety should always be your top priority when following any guide.
              </p>
            </div>

            {/* Related Articles Placeholder */}
            <div className="mt-10 pt-8 border-t border-dark-500">
              <h3 className="text-white font-semibold mb-4">You might also like</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'Related Guide 1',
                  'Related Guide 2',
                ].map((title, index) => (
                  <div
                    key={index}
                    className="p-4 bg-dark-700 rounded-lg border border-dark-500 hover:border-red-600/30 transition-colors cursor-pointer"
                  >
                    <p className="text-gray-300 text-sm">{title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;
