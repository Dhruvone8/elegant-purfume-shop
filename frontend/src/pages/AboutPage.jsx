const AboutPage = () => {
  return (
    <div className="bg-white min-h-screen pt-24">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-luxury-black flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1616612089852-6927dfa609d7?q=80&w=2000')] bg-cover bg-center fixed"></div>
        <div className="relative z-10 text-center text-white px-6">
          <span className="text-luxury-gold text-sm font-bold tracking-[0.2em] uppercase block mb-4">
            Since 1920
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6">Our Heritage</h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-200 font-light">
            Crafting the invisible art of memory through scent.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-24 space-y-24">
        
        <div className="text-center space-y-6 animate-fade-in">
          <h2 className="font-serif text-4xl text-luxury-black">The Art of Perfumery</h2>
          <div className="w-16 h-1 bg-luxury-gold mx-auto"></div>
          <p className="text-gray-600 leading-relaxed text-lg">
            At ÉLÉGANCE, we believe that perfume is an art form. Every bottle is a masterpiece, meticulously crafted 
            using the rarest ingredients sourced from the farthest corners of the globe. From the rose fields of Grasse 
            to the spice markets of Zanzibar, our journey is one of passion and precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <img 
            src="https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=800" 
            alt="Perfumer" 
            className="rounded-sm shadow-xl"
          />
          <div className="space-y-6">
            <h3 className="font-serif text-3xl text-luxury-black">Sustainable Luxury</h3>
            <p className="text-gray-600 leading-relaxed">
              We are committed to sustainability without compromising on quality. Our ingredients are ethically sourced, 
              supporting local farming communities and preserving biodiversity. Our packaging is designed to be as 
              beautiful as it is responsible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;