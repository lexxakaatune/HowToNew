import { useEffect, useState } from 'react';

const AdSidebar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentAd, setCurrentAd] = useState(0);

  const sidebarAds = [
    {
      title: 'Premium Hosting',
      description: 'Fast & reliable web hosting for your business',
      cta: 'Get 50% Off',
      color: 'from-blue-600 to-indigo-700',
    },
    {
      title: 'Online Courses',
      description: 'Learn new skills from industry experts',
      cta: 'Start Learning',
      color: 'from-purple-600 to-pink-700',
    },
    {
      title: 'Design Tools',
      description: 'Professional design software suite',
      cta: 'Try Free',
      color: 'from-orange-500 to-red-600',
    },
  ];

  useEffect(() => {
    // Rotate ads every 10 seconds
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % sidebarAds.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  const ad = sidebarAds[currentAd];

  return (
    <div className="hidden xl:block fixed right-4 top-1/2 -translate-y-1/2 z-30 w-64">
      <div className="bg-dark-800 rounded-xl border border-dark-500 overflow-hidden shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-dark-900 border-b border-dark-500">
          <span className="text-xs text-gray-500 uppercase tracking-wider">Sponsored</span>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-500 hover:text-white text-xs"
          >
            ✕
          </button>
        </div>

        {/* Ad Content */}
        <div className={`bg-gradient-to-br ${ad.color} p-6 text-center`}>
          <h4 className="text-white font-bold text-lg mb-2">{ad.title}</h4>
          <p className="text-white/80 text-sm mb-4">{ad.description}</p>
          <button className="px-4 py-2 bg-white text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors">
            {ad.cta}
          </button>
        </div>

        {/* Ad Indicator */}
        <div className="flex justify-center gap-1 py-2 bg-dark-900">
          {sidebarAds.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentAd(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentAd ? 'bg-red-600' : 'bg-dark-500'
              }`}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-dark-900 text-center">
          <p className="text-xs text-gray-600">Ad by Adsterra</p>
        </div>
      </div>
    </div>
  );
};

export default AdSidebar;
