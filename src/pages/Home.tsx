import Navigation from '../sections/Navigation';
import Hero from '../sections/Hero';
import Categories from '../sections/Categories';
import FeaturedGuides from '../sections/FeaturedGuides';
import LatestArticles from '../sections/LatestArticles';
import Newsletter from '../sections/Newsletter';
import Footer from '../sections/Footer';
import AdBanner from '../components/ads/AdBanner';
import AdSidebar from '../components/ads/AdSidebar';

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <Navigation />

      {/* Top Ad Banner */}
      <div className="pt-20">
        <AdBanner position="top" />
      </div>

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <Hero />

        {/* Sidebar Ad - Desktop Only */}
        <AdSidebar />

        {/* Categories Section */}
        <Categories />

        {/* Mid-content Ad */}
        <AdBanner position="middle" />

        {/* Featured Guides Section */}
        <FeaturedGuides />

        {/* Latest Articles Section */}
        <LatestArticles />

        {/* Bottom Ad */}
        <AdBanner position="bottom" />

        {/* Newsletter Section */}
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
