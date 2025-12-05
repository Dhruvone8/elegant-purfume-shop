import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const isHomePage = location.pathname === '/';
  
  // Navbar Logic: Always white background if open, otherwise depends on scroll/page
  const navBackgroundClass = (isOpen || scrolled || !isHomePage) 
    ? 'bg-white/95 backdrop-blur-md shadow-md py-3 sm:py-4' 
    : 'bg-gradient-to-b from-black/80 to-transparent py-6 sm:py-8';
    
  const textClass = (isOpen || scrolled || !isHomePage) ? 'text-luxury-black' : 'text-white';
  const iconClass = (isOpen || scrolled || !isHomePage) ? 'text-luxury-black' : 'text-white';

  return (
    <>
      {/* 1. Main Navigation Bar (Fixed Top) */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navBackgroundClass}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <Link to="/" className="z-50 group" onClick={() => setIsOpen(false)}>
              <span className={`text-xl sm:text-2xl md:text-3xl font-serif font-bold tracking-widest transition-colors duration-300 ${textClass} group-hover:text-luxury-gold`}>
                ÉLÉGANCE
              </span>
            </Link>

            {/* Desktop Menu (Hidden on Mobile) */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-12">
              {['Home', 'Collections', 'About', 'Contact'].map((item) => (
                <Link 
                  key={item}
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                  className={`text-xs lg:text-sm uppercase tracking-widest font-medium relative group transition-colors duration-300 ${textClass} hover:text-luxury-gold`}
                >
                  {item}
                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-luxury-gold transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* Desktop Icons (Hidden on Mobile) */}
            <div className={`hidden md:flex items-center space-x-4 lg:space-x-8 transition-colors duration-300 ${iconClass}`}>
              <Search size={20} className="hover:text-luxury-gold cursor-pointer transition-colors" />
              <User size={20} className="hover:text-luxury-gold cursor-pointer transition-colors" />
              <div className="relative hover:text-luxury-gold cursor-pointer transition-colors group">
                <ShoppingBag size={20} />
                <span className="absolute -top-2 -right-2 bg-luxury-gold text-luxury-black rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                  0
                </span>
              </div>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              className={`md:hidden z-50 p-2 transition-colors duration-300 ${textClass} hover:text-luxury-gold`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* 2. Mobile Menu Overlay (Sibling to Nav) */}
      <div 
        className={`fixed inset-0 z-40 bg-luxury-cream flex flex-col items-center justify-start pt-32 md:hidden transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {/* Mobile Links */}
        <div className="flex flex-col items-center space-y-8 w-full animate-fade-in">
          {['Home', 'Collections', 'About', 'Contact'].map((item, index) => (
            <Link
              key={item}
              to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              className={`text-2xl font-serif text-luxury-black hover:text-luxury-gold font-bold tracking-widest transition-all duration-300 hover:scale-110`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setIsOpen(false)}
            >
              {item}
            </Link>
          ))}
          
          {/* Mobile Icons */}
          <div className="flex items-center gap-8 pt-12 mt-4 border-t border-gray-300 w-48 justify-center">
            <button className="p-2 text-luxury-black hover:text-luxury-gold transition-colors">
               <Search size={28} />
            </button>
            <button className="p-2 text-luxury-black hover:text-luxury-gold transition-colors">
               <User size={28} />
            </button>
            <button className="p-2 text-luxury-black hover:text-luxury-gold transition-colors relative">
               <ShoppingBag size={28} />
               <span className="absolute -top-1 -right-1 bg-luxury-gold text-luxury-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold border border-white">
                  0
               </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;