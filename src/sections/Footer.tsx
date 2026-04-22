import { useEffect, useRef, useState } from 'react';
import { Facebook, Twitter, Instagram, Youtube, ArrowUp, Heart } from 'lucide-react';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Categories', href: '#categories' },
    { name: 'Featured', href: '#featured' },
    { name: 'Latest', href: '#latest' },
  ];

  const categories = [
    { name: 'Automotive', href: '#categories' },
    { name: 'Gardening', href: '#categories' },
    { name: 'Cooking', href: '#categories' },
    { name: 'Technology', href: '#categories' },
    { name: 'Home Repair', href: '#categories' },
    { name: 'Health', href: '#categories' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-black pt-20 pb-8 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-black to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 mb-16
            transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }} className="inline-block mb-6">
              <span className="text-3xl font-bold text-white">
                How<span className="text-red-600">To</span>
              </span>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your trusted source for step-by-step guides and tutorials. 
              Learn how to do anything with our expert-written articles.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-dark-800 border border-dark-500 rounded-lg flex items-center justify-center
                    text-gray-400 hover:text-red-500 hover:border-red-600/50 hover:bg-red-600/10
                    transition-all duration-300 transform hover:scale-110"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div
            className={`transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                    className="text-gray-400 text-sm hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <h3 className="text-white font-semibold mb-6">Categories</h3>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.name}>
                  <a
                    href={category.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(category.href); }}
                    className="text-gray-400 text-sm hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
            <p>
              By signing up, you agree to our 
              <a href="/terms">Terms of Use</a> and 
              <a href="/privacy">Privacy Policy</a>.
            </p>
          </div>

          {/* Contact Info */}
          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <h3 className="text-white font-semibold mb-6">Stay Connected</h3>
            <p className="text-gray-400 text-sm mb-4">
              Have questions or suggestions? We&apos;d love to hear from you.
            </p>
            <a
              href="mailto:hello@howto.com"
              className="text-red-500 text-sm hover:text-red-400 transition-colors"
            >
              hello@howto.com
            </a>
          </div>
        </div>

        {/* Divider */}
        <div
          className={`h-px bg-gradient-to-r from-transparent via-dark-500 to-transparent mb-8
            transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
        />

        {/* Bottom Footer */}
        <div
          className={`flex flex-col md:flex-row justify-between items-center gap-4
            transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Copyright */}
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <span>© 2024 HowTo. Made with</span>
            <Heart className="text-red-600" size={14} fill="currentColor" />
            <span>for learners everywhere.</span>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
          >
            <span>Back to top</span>
            <div className="w-8 h-8 bg-dark-800 border border-dark-500 rounded-lg flex items-center justify-center
              group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-300">
              <ArrowUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
