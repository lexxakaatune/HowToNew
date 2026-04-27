import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Category } from '../data/store';
import { fetchCategories } from "../services/api";

const Categories = () => {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
const [categories, setCategories] = useState<Category[]>([]);

useEffect(() => {
  const loadCategories = async () => {
    try {
      const res = await fetchCategories();
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  };
  loadCategories();
}, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'));
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="categories" className="relative py-20 md:py-32 bg-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Browse <span className="text-gradient">Categories</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Find guides organized by topic. Click on any category to explore related articles.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              ref={(el) => { cardRefs.current[index] = el; }}
              data-index={index}
              className={`group relative cursor-pointer transition-all duration-700 ${
                visibleCards.has(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
                perspective: '1000px',
              }}
            >
              <div
                className="relative h-80 rounded-2xl overflow-hidden bg-dark-800 border border-dark-500 
                  transition-all duration-500 ease-expo-out
                  group-hover:border-red-600/50 group-hover:shadow-card-hover
                  transform-gpu"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >

                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-expo-out group-hover:scale-110"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  {/* Article Count Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-red-600/90 text-white text-xs font-medium rounded-full">
                      {category.articleCount} articles
                    </span>
                  </div>

                  {/* Category Info */}
                  <div className="transform transition-transform duration-500 ease-expo-out group-hover:-translate-y-2">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {category.description}
                    </p>
                    <div className="flex items-center gap-2 text-red-500 font-medium text-sm">
                      <span>Explore</span>
                      <ArrowRight
                        size={16}
                        className="transform transition-transform duration-300 group-hover:translate-x-2"
                      />
                    </div>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-t from-red-600/10 to-transparent" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
