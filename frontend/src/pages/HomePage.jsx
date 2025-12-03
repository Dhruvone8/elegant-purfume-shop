import { useState, useEffect } from 'react';
import axios from 'axios';
import HeroBanner from '../components/HeroBanner';
import ProductCard from '../components/ProductCard';
import { Loader } from 'lucide-react';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(data);
      } catch (err) {
        setError('Failed to load collections.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-luxury-cream min-h-screen">
      <HeroBanner />

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="text-center mb-16 animate-fade-in">
          <span className="text-luxury-gold text-sm font-bold tracking-[0.2em] uppercase block mb-3">
            Our Collection
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-luxury-black mb-6">
            Curated Fragrances
          </h2>
          {/* Replaced the solid line with a subtle dot or just remove it */}
          <div className="text-luxury-gold text-2xl mb-6">✦</div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Discover our handpicked selection of exquisite perfumes, each crafted to perfection to embody elegance and sophistication.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader className="animate-spin text-luxury-gold" size={40} /></div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        <div className="text-center mt-16">
          <button className="border-2 border-luxury-black text-luxury-black px-10 py-3 font-bold tracking-widest hover:bg-luxury-black hover:text-white transition-all duration-300 uppercase text-sm">
            View All Collections
          </button>
        </div>
      </section>

      {/* Luxury Features Banner - UPDATED (No Lines) */}
      <section className="bg-luxury-black text-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Removed 'divide-y' and 'divide-gray-800' classes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <div className="p-4 group hover:-translate-y-2 transition-transform duration-500">
              <div className="text-luxury-gold text-4xl mb-6 group-hover:scale-110 transition-transform">✦</div>
              <h3 className="font-serif text-2xl text-white mb-4">Exquisite Scents</h3>
              <p className="text-gray-400 text-sm leading-relaxed opacity-80">
                Sourced from the rarest ingredients globally to ensure an unforgettable signature.
              </p>
            </div>
            <div className="p-4 group hover:-translate-y-2 transition-transform duration-500">
              <div className="text-luxury-gold text-4xl mb-6 group-hover:scale-110 transition-transform">✦</div>
              <h3 className="font-serif text-2xl text-white mb-4">Long Lasting</h3>
              <p className="text-gray-400 text-sm leading-relaxed opacity-80">
                Formulated with high concentrations of perfume oils to stay with you from day to night.
              </p>
            </div>
            <div className="p-4 group hover:-translate-y-2 transition-transform duration-500">
              <div className="text-luxury-gold text-4xl mb-6 group-hover:scale-110 transition-transform">✦</div>
              <h3 className="font-serif text-2xl text-white mb-4">Elegant Packaging</h3>
              <p className="text-gray-400 text-sm leading-relaxed opacity-80">
                A visual masterpiece in every bottle, designed to adorn your vanity with grace.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;