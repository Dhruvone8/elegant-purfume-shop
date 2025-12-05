import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      // Trigger change when scrolled more than 50px
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Dynamic Classes based on Scroll State
  // FIX: Replaced 'bg-transparent' with a gradient to remove the hard line separation
  const navBackground = scrolled 
    ? 'bg-white/95 backdrop-blur-md shadow-md py-4' 
    : 'bg-gradient-to-b from-black/80 to-transparent py-8'; // Increased padding for better spacing

  const textColor = scrolled 
    ? 'text-luxury-black' 
    : 'text-white';

  const iconColor = scrolled 
    ? 'text-luxury-black hover:text-luxury-gold' 
    : 'text-white hover:text-luxury-gold';

  // Specific check: If not on Home page, always show "Scrolled" style for visibility
  const isHomePage = location.pathname === '/';
  const forceScrolledStyle = !isHomePage;

  // Final classes to apply
  const activeNavClass = (scrolled || forceScrolledStyle) 
    ? 'bg-white/95 backdrop-blur-md shadow-md py-4' 
    : 'bg-gradient-to-b from-black/80 to-transparent py-8'; // Gradient fix applied here
    
  const activeTextClass = (scrolled || forceScrolledStyle) ? 'text-luxury-black' : 'text-white';
  const activeIconClass = (scrolled || forceScrolledStyle) ? 'text-luxury-black' : 'text-white';

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${activeNavClass}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="z-50 group">
            <span className={`text-3xl font-serif font-bold tracking-widest transition-colors duration-300 ${activeTextClass} group-hover:text-luxury-gold`}>
              ÉLÉGANCE
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-12">
            {['Home', 'Collections', 'About', 'Contact'].map((item) => (
              <Link 
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                className={`text-sm uppercase tracking-widest font-medium relative group transition-colors duration-300 ${activeTextClass} hover:text-luxury-gold`}
              >
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-luxury-gold transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className={`hidden md:flex items-center space-x-8 transition-colors duration-300 ${activeIconClass}`}>
            <Search size={20} className="hover:text-luxury-gold cursor-pointer transition-colors" />
            <User size={20} className="hover:text-luxury-gold cursor-pointer transition-colors" />
            <div className="relative hover:text-luxury-gold cursor-pointer transition-colors group">
              <ShoppingBag size={20} />
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
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8 animate-fade-in">
            {['Home', 'Collections', 'About', 'Contact'].map((item) => (
              <Link
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="text-2xl font-serif text-luxury-black hover:text-luxury-gold font-bold tracking-widest"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;