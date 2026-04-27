import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, Facebook, Twitter, Linkedin, Link2, Check, Bookmark, Printer } from 'lucide-react';
import type { Article } from '../data/store';
import { fetchArticleById, fetchArticlesByCategory } from "../services/api";
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import AdBanner from '../components/ads/AdBanner';
import AdInArticle from '../components/ads/AdInArticle';

const ArticlePage = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
  const load = async () => {
    if (!articleId) return;
    try {
      const res = await fetchArticleById(articleId);
      const found = res.data;
      setArticle(found);

      const relatedRes = await fetchArticlesByCategory(found.categoryId);
      const related = relatedRes.data
        .filter((a: Article) => a._id !== articleId)
        .slice(0, 3);
      setRelatedArticles(related);
    } catch (err) {
      console.error("Failed to load article", err);
      navigate("/");
    }
  };
  load();
}, [articleId, navigate]);

  const handleShare = async (platform?: string) => {
    const url = window.location.href;
    const text = article?.title || 'Check out this article';

    switch (platform) {
      case 'facebook':
        window.open(`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      default:
        // Copy to clipboard
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setShowShareToast(true);
        setTimeout(() => {
          setShowShareToast(false);
          setCopied(false);
        }, 2000);
    }
  };

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('howto_bookmarks') || '[]');
    if (isBookmarked) {
      const updated = bookmarks.filter((id: string) => id !== articleId);
      localStorage.setItem('howto_bookmarks', JSON.stringify(updated));
    } else {
      bookmarks.push(articleId);
      localStorage.setItem('howto_bookmarks', JSON.stringify(bookmarks));
    }
    setIsBookmarked(!isBookmarked);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navigation />
        <div className="pt-32 pb-20 text-center">
          <div className="animate-spin w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full mx-auto" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Top Ad */}
      <div className="pt-20">
        <AdBanner position="top" />
      </div>

      {/* Article Header */}
      <div 
        className="relative h-80 md:h-[500px] overflow-hidden"
        style={{
          backgroundImage: `url(${article.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-12">
          <Link 
            to={`/category/${article.category._id}`}
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-4 transition-colors w-fit"
          >
            <ArrowLeft size={20} />
            Back to {article.category.name}
          </Link>
          
          <span className="text-red-500 font-medium text-sm uppercase tracking-wider mb-3">
            {article.category.name}
          </span>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
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
              <span>
  {article.createdAt
    ? new Date(article.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : ""}
</span>
            </div>
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>HowTo Editorial Team</span>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-10 pb-8 border-b border-dark-500">
          <button
            onClick={toggleBookmark}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              isBookmarked 
                ? 'bg-red-600 text-white' 
                : 'bg-dark-800 text-gray-300 hover:text-white border border-dark-500'
            }`}
          >
            <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
            <span className="text-sm">{isBookmarked ? 'Saved' : 'Save'}</span>
          </button>
          
          <button
            onClick={() => handleShare()}
            className="flex items-center gap-2 px-4 py-2 bg-dark-800 text-gray-300 hover:text-white border border-dark-500 rounded-lg transition-all"
          >
            {copied ? <Check size={18} /> : <Link2 size={18} />}
            <span className="text-sm">{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>
          
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-dark-800 text-gray-300 hover:text-white border border-dark-500 rounded-lg transition-all"
          >
            <Printer size={18} />
            <span className="text-sm">Print</span>
          </button>
        </div>

        {/* Social Share */}
        <div className="flex items-center gap-3 mb-10">
          <span className="text-gray-400 text-sm">Share:</span>
          <button
            onClick={() => handleShare('facebook')}
            className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
          >
            <Facebook size={18} />
          </button>
          <button
            onClick={() => handleShare('twitter')}
            className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center text-white hover:bg-sky-600 transition-colors"
          >
            <Twitter size={18} />
          </button>
          <button
            onClick={() => handleShare('linkedin')}
            className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center text-white hover:bg-blue-800 transition-colors"
          >
            <Linkedin size={18} />
          </button>
        </div>

        {/* Description */}
        <p className="text-xl text-gray-300 leading-relaxed mb-10">
          {article.description}
        </p>

        {/* In-Article Ad */}
        <AdInArticle position="top" />

        {/* Steps */}
        {article.content && article.content.length > 0 && (
          <div className="space-y-6 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Step-by-Step Guide</h2>
            {article.content.map((step: string, index: number) => (
              <div
                key={index}
                className="flex gap-4 p-6 bg-dark-800 rounded-xl border border-dark-500 hover:border-red-600/30 transition-colors"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <p className="text-gray-300 leading-relaxed pt-2">{step}</p>
              </div>
            ))}
          </div>
        )}

        {/* Mid-Article Ad */}
        <AdInArticle position="middle" />

        {/* Tips Section */}
        <div className="p-6 bg-red-600/10 border border-red-600/20 rounded-xl mb-12">
          <h3 className="text-red-500 font-semibold mb-2 text-lg">Pro Tip</h3>
          <p className="text-gray-400">
            Take your time with each step and don&apos;t hesitate to re-read instructions. 
            Safety should always be your top priority when following any guide. If you&apos;re 
            unsure about something, consult a professional.
          </p>
        </div>

        {/* Bottom Ad */}
        <AdInArticle position="bottom" />

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-12 pt-12 border-t border-dark-500">
            <h3 className="text-xl font-bold text-white mb-6">You might also like</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <Link
                  key={related._id}
                  to={`/article/${related._id}`}
                  className="group bg-dark-800 rounded-xl overflow-hidden border border-dark-500 hover:border-red-600/30 transition-all"
                >
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-sm font-semibold text-white group-hover:text-red-500 transition-colors line-clamp-2">
                      {related.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Share Toast */}
      {showShareToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-up z-50">
          Link copied to clipboard!
        </div>
      )}

      {/* Bottom Ad */}
      <AdBanner position="bottom" />

      <Footer />
    </div>
  );
};

export default ArticlePage;
