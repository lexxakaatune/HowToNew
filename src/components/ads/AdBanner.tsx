import { useEffect, useState } from 'react';

interface AdBannerProps {
  position: 'top' | 'middle' | 'bottom';
}

// Simulated ad networks
const AD_NETWORKS = [
  {
    name: 'Google AdSense',
    bgColor: 'bg-gradient-to-r from-blue-600 to-blue-800',
    text: 'Google AdSense Banner Ad',
    cta: 'Learn More',
  },
  {
    name: 'Media.net',
    bgColor: 'bg-gradient-to-r from-purple-600 to-purple-800',
    text: 'Media.net Contextual Ad',
    cta: 'Discover',
  },
  {
    name: 'PropellerAds',
    bgColor: 'bg-gradient-to-r from-orange-500 to-red-600',
    text: 'PropellerAds Display',
    cta: 'Click Here',
  },
  {
    name: 'Adsterra',
    bgColor: 'bg-gradient-to-r from-green-600 to-teal-700',
    text: 'Adsterra Native Banner',
    cta: 'Explore',
  },
];

const AdBanner = ({ position }: AdBannerProps) => {
  const [adNetwork, setAdNetwork] = useState(AD_NETWORKS[0]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Rotate ad networks based on position
    const networkIndex = position === 'top' ? 0 : position === 'middle' ? 1 : 2;
    setAdNetwork(AD_NETWORKS[networkIndex]);
  }, [position]);

  if (!isVisible) return null;

  return (
    <div className="w-full bg-dark-900 border-y border-dark-500 py-2">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Ad Label */}
          <span className="text-xs text-gray-500 uppercase tracking-wider">Advertisement</span>
          
          {/* Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-500 hover:text-white text-xs"
          >
            ✕
          </button>
        </div>
        
        {/* Ad Content - Simulated */}
        <div className={`mt-2 ${adNetwork.bgColor} rounded-lg p-4 text-center relative overflow-hidden`}>
          {/* Simulated Ad Content */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <span className="text-white font-medium">{adNetwork.text}</span>
            <button className="px-4 py-1.5 bg-white/20 hover:bg-white/30 text-white text-sm rounded transition-colors">
              {adNetwork.cta}
            </button>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>
        
        {/* Ad Network Name */}
        <p className="text-center text-xs text-gray-600 mt-1">
          Powered by {adNetwork.name}
        </p>
      </div>
    </div>
  );
};

export default AdBanner;
