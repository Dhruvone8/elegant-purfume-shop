import { ArrowRight } from 'lucide-react';

const HeroBanner = () => {
  return (
    <div className="relative min-h-screen flex items-center bg-luxury-black overflow-hidden pt-16">
      
      {/* Background Image & Gradient */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=2000&auto=format&fit=crop")',
            mixBlendMode: 'overlay'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] to-transparent h-32 bottom-0"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="max-w-3xl animate-fade-in">
          
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[2px] w-12 bg-luxury-gold"></div>
            <span className="text-luxury-gold text-sm font-bold tracking-[0.2em] uppercase">
              New Collection 2025
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-8 leading-tight">
            Discover Your <br />
            <span className="text-luxury-gold italic">Signature Scent</span>
          </h1>
          
          <p className="text-gray-300 text-lg md:text-xl mb-10 leading-relaxed max-w-xl font-light">
            Indulge in our exclusive collection of luxury fragrances crafted from the finest rare ingredients. 
            Elegance isn't just a look, it's a scent.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <button className="bg-luxury-gold text-luxury-black px-10 py-4 font-bold tracking-wider hover:bg-white transition-all duration-300 flex items-center justify-center gap-3">
              <span>EXPLORE NOW</span>
              <ArrowRight size={20} />
            </button>
            <button className="px-10 py-4 font-bold tracking-wider text-white border border-white/30 hover:border-luxury-gold hover:text-luxury-gold transition-all duration-300">
              VIEW COLLECTION
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;