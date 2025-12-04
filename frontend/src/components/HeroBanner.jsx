import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroBanner = () => {
  return (
    <div className="relative min-h-screen flex items-center bg-luxury-black overflow-hidden pt-16">
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-luxury-gold/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-luxury-gold/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse delay-1000"></div>
      </div>
      
      {/* Background Image & Gradient */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=2000&auto=format&fit=crop")',
            mixBlendMode: 'overlay'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] to-transparent h-32 bottom-0"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="max-w-3xl animate-fade-in">
          
          <div className="flex items-center gap-4 mb-6 group">
            <div className="h-[2px] w-12 bg-luxury-gold transition-all duration-500 group-hover:w-20"></div>
            <Sparkles className="text-luxury-gold w-4 h-4 animate-pulse" />
            <span className="text-luxury-gold text-sm font-bold tracking-[0.2em] uppercase">
              New Collection 2025
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-8 leading-tight">
            Discover Your <br />
            <span className="text-luxury-gold italic relative inline-block">
              Signature Scent
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-luxury-gold/30"></span>
            </span>
          </h1>
          
          <p className="text-gray-300 text-lg md:text-xl mb-10 leading-relaxed max-w-xl font-light">
            Indulge in our exclusive collection of luxury fragrances crafted from the finest rare ingredients. 
            Elegance isn't just a look, it's a scent.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <Link to="/collections">
              <button className="bg-luxury-gold text-luxury-black px-10 py-4 font-bold tracking-wider hover:bg-white hover:shadow-2xl hover:shadow-luxury-gold/50 transition-all duration-300 flex items-center justify-center gap-3 group">
                <span>EXPLORE NOW</span>
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </Link>
            <Link to="/collections">
              <button className="px-10 py-4 font-bold tracking-wider text-white border-2 border-white/30 hover:border-luxury-gold hover:text-luxury-gold hover:bg-luxury-gold/10 transition-all duration-300">
                VIEW COLLECTION
              </button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex items-center gap-8 text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-luxury-gold rounded-full"></div>
              <span>100% Authentic</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-luxury-gold rounded-full"></div>
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-luxury-gold rounded-full"></div>
              <span>30-Day Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;