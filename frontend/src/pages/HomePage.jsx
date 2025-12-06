import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import HeroBanner from "../components/HeroBanner";
import ProductCard from "../components/ProductCard";
import {
  Loader,
  Truck,
  Shield,
  RotateCcw,
  Award,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const HomePage = () => {
  // Store products fetched from the API
  const [products, setProducts] = useState([]);
  
  // Track loading state to show spinner while fetching data
  const [loading, setLoading] = useState(true);
  
  // Store error message if API call fails
  const [error, setError] = useState(null);

  // Fetch products from backend when component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Make GET request to backend API
        const { data } = await axios.get("http://localhost:5000/api/products");
        setProducts(data);
      } catch (err) {
        // Catch and store any errors that occur during fetch
        setError("Failed to load collections.");
        console.error(err);
      } finally {
        // Always set loading to false when done, whether success or failure
        setLoading(false);
      }
    };
    fetchProducts();
  }, []); // Empty dependency array means this only runs once on mount

  return (
    <div className="bg-luxury-cream min-h-screen">
      {/* Hero section with main banner and CTA */}
      <HeroBanner />

      {/* Featured Collection Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        
        {/* Section header with decorative elements */}
        <div className="text-center mb-16 animate-fade-in">
          {/* Decorative line with sparkles */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[1px] w-16 bg-luxury-gold"></div>
            <Sparkles className="text-luxury-gold" size={20} />
            <span className="text-luxury-gold text-sm font-bold tracking-[0.2em] uppercase">
              Our Collection
            </span>
            <Sparkles className="text-luxury-gold" size={20} />
            <div className="h-[1px] w-16 bg-luxury-gold"></div>
          </div>
          
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-luxury-black mb-6">
            Curated Fragrances
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Discover our handpicked selection of exquisite perfumes, each
            crafted to perfection to embody elegance and sophistication.
          </p>
        </div>

        {/* Conditional rendering based on loading/error/success states */}
        {loading ? (
          // Show spinner while loading
          <div className="flex flex-col items-center justify-center py-20">
            <Loader className="animate-spin text-luxury-gold mb-4" size={48} />
            <p className="text-gray-600 font-medium">
              Loading our finest fragrances...
            </p>
          </div>
        ) : error ? (
          // Show error message if fetch failed
          <div className="text-center py-12 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        ) : (
          <>
            {/* Product grid - Only show first 8 products on home page */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.slice(0, 8).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* "View All" button to navigate to full collections page */}
            <div className="text-center mt-16">
              <Link to="/collections">
                <button className="group cursor-pointer inline-flex items-center gap-3 border-2 border-luxury-black text-luxury-black px-10 py-4 font-bold tracking-widest hover:bg-luxury-black hover:text-blue-950 transition-all duration-300 uppercase text-sm rounded-lg shadow-md hover:shadow-xl">
                  View All Collections
                  {/* Arrow shifts right on hover for interactive feedback */}
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-2 transition-transform duration-300"
                  />
                </button>
              </Link>
            </div>
          </>
        )}
      </section>

      {/* Why Choose Us Section - Highlighting key features */}
      <section className="bg-luxury-black text-white py-24 relative overflow-hidden">
        
        {/* Decorative background blobs for visual interest */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute w-96 h-96 bg-luxury-gold rounded-full blur-3xl top-0 left-0 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute w-96 h-96 bg-luxury-gold rounded-full blur-3xl bottom-0 right-0 translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Why Choose ÉLÉGANCE
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Experience luxury redefined with our commitment to excellence
            </p>
          </div>

          {/* Feature cards grid */}
          <div className="grid cursor-pointer grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Each feature card has hover effects for interactivity */}
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-white/10 text-center group hover:bg-white/10 hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl">
              {/* Icon with background that animates on hover */}
              <div className="w-16 h-16 bg-luxury-gold/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-luxury-gold/30 transition-all duration-300">
                <Sparkles className="text-luxury-gold" size={32} />
              </div>
              <h3 className="font-serif text-xl text-white mb-4 font-bold">
                Exquisite Scents
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Sourced from the rarest ingredients globally to ensure an
                unforgettable signature.
              </p>
            </div>

            {/* Authenticity guarantee feature */}
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-white/10 text-center group hover:bg-white/10 hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl">
              <div className="w-16 h-16 bg-luxury-gold/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-luxury-gold/30 transition-all duration-300">
                <Shield className="text-luxury-gold" size={32} />
              </div>
              <h3 className="font-serif text-xl text-white mb-4 font-bold">
                100% Authentic
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Genuine luxury fragrances with verified authenticity
                certificates.
              </p>
            </div>

            {/* Long-lasting quality feature */}
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-white/10 text-center group hover:bg-white/10 hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl">
              <div className="w-16 h-16 bg-luxury-gold/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-luxury-gold/30 transition-all duration-300">
                <Award className="text-luxury-gold" size={32} />
              </div>
              <h3 className="font-serif text-xl text-white mb-4 font-bold">
                Long Lasting
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Formulated with high concentrations of perfume oils to stay with
                you all day.
              </p>
            </div>

            {/* Free shipping feature */}
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-white/10 text-center group hover:bg-white/10 hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl">
              <div className="w-16 h-16 bg-luxury-gold/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-luxury-gold/30 transition-all duration-300">
                <Truck className="text-luxury-gold" size={32} />
              </div>
              <h3 className="font-serif text-xl text-white mb-4 font-bold">
                Free Shipping
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Complimentary delivery on orders above ₹2000 across India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust and Social Proof Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 md:p-12 text-white relative shadow-2xl">
          
          {/* Decorative dot pattern background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden rounded-2xl">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(212,175,55,0.3) 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            ></div>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left column: Text content and trust badges */}
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-white">
                Experience Luxury Shopping
              </h2>
              <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                Join thousands of satisfied customers who trust ÉLÉGANCE for
                their fragrance needs. We're committed to providing an
                exceptional shopping experience with every order.
              </p>

              {/* Trust icons with descriptions */}
              <div className="space-y-6">
                {/* Secure payments badge */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-luxury-gold/20 rounded-full flex items-center justify-center flex-shrink-0 border border-luxury-gold/30">
                    <Shield className="text-luxury-gold" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-white">
                      Secure Payments
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Multiple payment options with 100% secure checkout
                    </p>
                  </div>
                </div>

                {/* Easy returns badge */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-luxury-gold/20 rounded-full flex items-center justify-center flex-shrink-0 border border-luxury-gold/30">
                    <RotateCcw className="text-luxury-gold" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-white">Easy Returns</h4>
                    <p className="text-gray-400 text-sm">
                      30-day hassle-free return and exchange policy
                    </p>
                  </div>
                </div>

                {/* Premium quality badge */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-luxury-gold/20 rounded-full flex items-center justify-center flex-shrink-0 border border-luxury-gold/30">
                    <Award className="text-luxury-gold" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-white">
                      Premium Quality
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Only authentic luxury fragrances from renowned brands
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column: Image with customer count badge */}
            <div className="relative mt-8 lg:mt-0">
              <img
                src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80"
                alt="Luxury Perfume"
                className="rounded-lg shadow-2xl w-full object-cover transform transition-transform duration-500"
              />
              
              {/* Floating badge showing customer count - responsive sizing */}
              <div className="absolute -bottom-3 -right-2 sm:-bottom-6 sm:-right-4 md:bottom-4 md:-left-12 md:right-auto bg-luxury-gold text-luxury-black p-2 sm:p-6 rounded-lg shadow-xl max-w-[100px] sm:max-w-[200px] border border-white/20">
                <p className="text-lg sm:text-4xl font-bold mb-0 leading-none">5000+</p>
                <p className="text-[8px] sm:text-sm font-bold uppercase tracking-wider leading-tight mt-1">
                  Happy Customers
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;