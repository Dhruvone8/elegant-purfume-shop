import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroBanner = () => {
  return (
    <div className="relative min-h-[90vh] md:min-h-screen flex items-center bg-luxury-black overflow-hidden pt-32 md:pt-20">
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-64 h-64 md:w-96 md:h-96 bg-luxury-gold/10 rounded-full blur-3xl -top-20 -left-20 animate-pulse"></div>
        <div className="absolute w-64 h-64 md:w-96 md:h-96 bg-luxury-gold/10 rounded-full blur-3xl -bottom-20 -right-20 animate-pulse delay-1000"></div>
      </div>
      
      {/* Background Image & Gradient */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 transition-transform duration-1000 scale-105"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=2000&auto=format&fit=crop")',
            mixBlendMode: 'overlay'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] to-transparent h-32 bottom-0"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Added mt-16 for mobile to push content down below the fixed navbar */}
        <div className="max-w-3xl animate-fade-in mt-16 md:mt-0">
          
          <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6 group md:ml-7">
            <div className="h-[2px] w-8 md:w-12 bg-luxury-gold transition-all duration-500 group-hover:w-20"></div>
            <Sparkles className="text-luxury-gold w-4 h-4 md:w-4 md:h-5 animate-pulse" />
            <span className="text-luxury-gold text-xs md:text-sm font-bold tracking-[0.2em] uppercase">
              New Collection 2025
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 md:mb-8 leading-tight">
            Discover Your <br />
            <span className="text-luxury-gold italic relative inline-block mt-2 md:mt-0">
              Signature Scent
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-luxury-gold/30"></span>
            </span>
          </h1>
          
          <p className="text-gray-300 text-base md:text-xl mb-8 md:mb-10 leading-relaxed max-w-xl font-light">
            Indulge in our exclusive collection of luxury fragrances crafted from the finest rare ingredients. 
            Elegance isn't just a look, it's a scent.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <Link to="/collections">
              <button className="w-full sm:w-auto bg-luxury-gold cursor-pointer text-luxury-black px-8 py-3 md:px-10 md:py-4 font-bold tracking-wider hover:bg-white hover:shadow-2xl hover:shadow-luxury-gold/50 transition-all duration-300 flex items-center justify-center gap-3 group rounded-sm">
                <span>EXPLORE NOW</span>
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;