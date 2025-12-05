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

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isHomePage = location.pathname === '/';
  const forceScrolledStyle = !isHomePage;

  const activeNavClass = (scrolled || forceScrolledStyle) 
    ? 'bg-white/95 backdrop-blur-md shadow-md py-3 sm:py-4' 
    : 'bg-gradient-to-b from-black/80 to-transparent py-6 sm:py-8';
    
  const activeTextClass = (scrolled || forceScrolledStyle) ? 'text-luxury-black' : 'text-white';
  const activeIconClass = (scrolled || forceScrolledStyle) ? 'text-luxury-black' : 'text-white';

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${activeNavClass}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo - Responsive sizing */}
          <Link to="/" className="z-50 group">
            <span className={`text-xl sm:text-2xl md:text-3xl font-serif font-bold tracking-widest transition-colors duration-300 ${activeTextClass} group-hover:text-luxury-gold`}>
              ÉLÉGANCE
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-12">
            {['Home', 'Collections', 'About', 'Contact'].map((item) => (
              <Link 
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                className={`text-xs lg:text-sm uppercase tracking-widest font-medium relative group transition-colors duration-300 ${activeTextClass} hover:text-luxury-gold`}
              >
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-luxury-gold transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Icons - Responsive sizing */}
          <div className={`hidden md:flex items-center space-x-4 lg:space-x-8 transition-colors duration-300 ${activeIconClass}`}>
            <Search size={18} className="hover:text-luxury-gold cursor-pointer transition-colors lg:w-5 lg:h-5" />
            <User size={18} className="hover:text-luxury-gold cursor-pointer transition-colors lg:w-5 lg:h-5" />
            <div className="relative hover:text-luxury-gold cursor-pointer transition-colors group">
              <ShoppingBag size={18} className="lg:w-5 lg:h-5" />
              <span className="absolute -top-2 -right-2 bg-luxury-gold text-luxury-black rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                0
              </span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden z-50 transition-colors duration-300 ${activeTextClass} hover:text-luxury-gold`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-6 animate-fade-in">
            {['Home', 'Collections', 'About', 'Contact'].map((item) => (
              <Link
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="text-xl sm:text-2xl font-serif text-luxury-black hover:text-luxury-gold font-bold tracking-widest transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            ))}
            
            {/* Mobile Icons */}
            <div className="flex items-center gap-6 pt-8 border-t border-gray-200 w-48">
              <Search size={24} className="text-luxury-black hover:text-luxury-gold cursor-pointer transition-colors" />
              <User size={24} className="text-luxury-black hover:text-luxury-gold cursor-pointer transition-colors" />
              <div className="relative">
                <ShoppingBag size={24} className="text-luxury-black hover:text-luxury-gold cursor-pointer transition-colors" />
                <span className="absolute -top-2 -right-2 bg-luxury-gold text-luxury-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  0
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;