import { useState } from 'react';

interface AdInArticleProps {
  position: 'top' | 'middle' | 'bottom';
}

const AdInArticle = ({ position }: AdInArticleProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const adContent = {
    top: {
      title: 'Recommended for You',
      description: 'Discover tools and resources to enhance your learning experience',
      cta: 'Explore Now',
      network: 'Google AdSense',
      color: 'from-emerald-600 to-teal-700',
    },
    middle: {
      title: 'Sponsored Content',
      description: 'Check out these related products and services',
      cta: 'Learn More',
      network: 'Media.net',
      color: 'from-rose-600 to-pink-700',
    },
    bottom: {
      title: 'Before You Go',
      description: 'Don\'t miss out on these exclusive offers',
      cta: 'View Deals',
      network: 'PropellerAds',
      color: 'from-amber-500 to-orange-600',
    },
  };

  const ad = adContent[position];

  if (!isVisible) return null;

  return (
    <div className="my-8 p-4 bg-dark-800/50 rounded-xl border border-dark-500/50">
      {/* Ad Label */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-gray-500 uppercase tracking-wider">
          Sponsored - {ad.network}
        </span>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-500 hover:text-white text-xs"
        >
          ✕
        </button>
      </div>

      {/* Ad Content */}
      <div className={`bg-gradient-to-r ${ad.color} rounded-lg p-6`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h4 className="text-white font-bold text-lg mb-1">{ad.title}</h4>
            <p className="text-white/80 text-sm">{ad.description}</p>
          </div>
          <button className="px-6 py-2.5 bg-white text-gray-900 text-sm font-semibold rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap">
            {ad.cta}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdInArticle;
