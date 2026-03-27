import { useState, useEffect, useRef } from 'react';
import { Mail, Send, CheckCircle, Sparkles } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setEmail('');
        setIsSubmitted(false);
      }, 3000);
    }
  };

  return (
    <section
      id="newsletter"
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-dark-700 to-black" />
      
      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-red-600/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-red-600/10 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />

      {/* Floating Shapes */}
      <div className="absolute top-20 right-20 w-4 h-4 bg-red-600/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 left-20 w-3 h-3 bg-red-600/20 rounded-full animate-float-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-red-600/40 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`relative bg-dark-800/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 lg:p-16 border border-dark-500
            transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-red-600/10 via-transparent to-red-600/10 opacity-0 hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10 text-center">
            {/* Icon */}
            <div
              className={`inline-flex items-center justify-center w-16 h-16 bg-red-600/20 rounded-2xl mb-6
                transition-all duration-700 delay-200 ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}
            >
              <Mail className="text-red-500" size={32} />
            </div>

            {/* Heading */}
            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4
                transition-all duration-700 delay-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              Join Our <span className="text-gradient">Newsletter</span>
            </h2>

            {/* Subheading */}
            <p
              className={`text-gray-400 text-lg max-w-xl mx-auto mb-8
                transition-all duration-700 delay-400 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              Get the latest guides and tutorials delivered straight to your inbox. 
              No spam, just knowledge.
            </p>

            {/* Form */}
            {!isSubmitted ? (
              <form
                onSubmit={handleSubmit}
                className={`max-w-md mx-auto transition-all duration-700 delay-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full bg-dark-900 border border-dark-500 rounded-xl py-4 px-5 text-white 
                        placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 
                        focus:ring-red-600/20 transition-all duration-300"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-primary flex items-center justify-center gap-2 py-4 px-6 rounded-xl
                      hover:shadow-glow-red transition-all duration-300"
                  >
                    <span>Subscribe</span>
                    <Send size={18} />
                  </button>
                </div>
                <p className="text-gray-500 text-xs mt-4">
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </form>
            ) : (
              <div
                className={`flex flex-col items-center gap-4 animate-scale-in`}
              >
                <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="text-green-500" size={32} />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Welcome aboard!
                  </h3>
                  <p className="text-gray-400">
                    Check your inbox for confirmation.
                  </p>
                </div>
              </div>
            )}

            {/* Benefits */}
            <div
              className={`flex flex-wrap justify-center gap-6 mt-10 pt-8 border-t border-dark-500/50
                transition-all duration-700 delay-600 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              {[
                'Weekly updates',
                'Exclusive content',
                'Expert tips',
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-400 text-sm">
                  <Sparkles className="text-red-500" size={14} />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
