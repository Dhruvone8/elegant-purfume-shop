import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react';

const Navbar = () => {
  // Track whether mobile menu is open or closed
  const [isOpen, setIsOpen] = useState(false);
  
  // Track whether user has scrolled down the page
  // This determines if navbar should have background or be transparent
  const [scrolled, setScrolled] = useState(false);
  
  // Get current route to know which page we're on
  const location = useLocation();

  // Set up scroll listener to detect when user scrolls
  useEffect(() => {
    const handleScroll = () => {
      // If scrolled more than 50px, set scrolled to true
      setScrolled(window.scrollY > 50);
    };
    
    // Add event listener when component mounts
    window.addEventListener('scroll', handleScroll);
    
    // Clean up listener when component unmounts to prevent memory leaks
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu whenever the route changes
  // This prevents menu staying open after clicking a link
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent page scrolling when mobile menu is open
  // This creates better UX by locking the page behind the menu
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup function ensures scroll is re-enabled when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Check if we're on the home page to determine styling
  const isHomePage = location.pathname === '/';
  
  // Navbar background logic:
  // - Always white if mobile menu is open (for readability)
  // - White if user has scrolled down (creates separation from content)
  // - White on non-home pages (consistent appearance)
  // - Transparent gradient on home page when at top (for hero effect)
  const navBackgroundClass = (isOpen || scrolled || !isHomePage) 
    ? 'bg-white/95 backdrop-blur-md shadow-md py-3 sm:py-4' 
    : 'bg-gradient-to-b from-black/80 to-transparent py-6 sm:py-8';
    
  // Text and icon colors change based on background
  // Black text on white background, white text on transparent/dark background
  const textClass = (isOpen || scrolled || !isHomePage) ? 'text-luxury-black' : 'text-white';
  const iconClass = (isOpen || scrolled || !isHomePage) ? 'text-luxury-black' : 'text-white';

  return (
    <>
      {/* Main Navigation Bar - Fixed to top of viewport */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navBackgroundClass}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo - Links to home page */}
            <Link to="/" className="z-50 group" onClick={() => setIsOpen(false)}>
              <span className={`text-xl sm:text-2xl md:text-3xl font-serif font-bold tracking-widest transition-colors duration-300 ${textClass} group-hover:text-luxury-gold`}>
                ÉLÉGANCE
              </span>
            </Link>

            {/* Desktop Menu - Hidden on mobile/tablet */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-12">
              {['Home', 'Collections', 'About', 'Contact'].map((item) => (
                <Link 
                  key={item}
                  // Convert 'Home' to '/', others to lowercase (e.g., '/collections')
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                  className={`text-xs lg:text-sm uppercase tracking-widest font-medium relative group transition-colors duration-300 ${textClass} hover:text-luxury-gold`}
                >
                  {item}
                  {/* Animated underline that grows on hover */}
                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-luxury-gold transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* Desktop Icons - Search, Profile, Cart */}
            <div className={`hidden md:flex items-center space-x-4 lg:space-x-8 transition-colors duration-300 ${iconClass}`}>
              <Search size={20} className="hover:text-luxury-gold cursor-pointer transition-colors" />
              <User size={20} className="hover:text-luxury-gold cursor-pointer transition-colors" />
              
              {/* Shopping cart with item count badge */}
              <div className="relative hover:text-luxury-gold cursor-pointer transition-colors group">
                <ShoppingBag size={20} />
                {/* Cart count badge - currently hardcoded to 0 */}
                <span className="absolute -top-2 -right-2 bg-luxury-gold text-luxury-black rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                  0
                </span>
              </div>
            </div>

            {/* Mobile Menu Toggle Button - Only visible on mobile */}
            <button
              className={`md:hidden z-50 p-2 transition-colors duration-300 ${textClass} hover:text-luxury-gold`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {/* Show X icon when menu is open, hamburger when closed */}
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Full screen menu that slides in from top */}
      <div 
        className={`fixed inset-0 z-40 bg-luxury-cream flex flex-col items-center justify-start pt-32 md:hidden transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {/* Mobile navigation links */}
        <div className="flex flex-col items-center space-y-8 w-full animate-fade-in">
          {['Home', 'Collections', 'About', 'Contact'].map((item, index) => (
            <Link
              key={item}
              to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              // Staggered animation delay for each item creates cascade effect
              className={`text-2xl font-serif text-luxury-black hover:text-luxury-gold font-bold tracking-widest transition-all duration-300 hover:scale-110`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setIsOpen(false)}
            >
              {item}
            </Link>
          ))}
          
          {/* Mobile action icons */}
          <div className="flex items-center gap-8 pt-12 mt-4 border-t border-gray-300 w-48 justify-center">
            <button className="p-2 text-luxury-black hover:text-luxury-gold transition-colors">
               <Search size={28} />
            </button>
            <button className="p-2 text-luxury-black hover:text-luxury-gold transition-colors">
               <User size={28} />
            </button>
            {/* Mobile cart button with badge */}
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