import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { Loader, Filter } from 'lucide-react';

const CollectionsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-luxury-cream min-h-screen pt-24 pb-16">
      {/* Header */}
      <div className="bg-luxury-black text-white py-16 mb-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-luxury-gold text-sm font-bold tracking-[0.2em] uppercase block mb-4">
            Shop The Look
          </span>
          <h1 className="font-serif text-5xl font-bold">All Collections</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Controls - Removed border-b */}
        <div className="flex justify-between items-center mb-12">
          <p className="text-gray-500 italic font-serif">{products.length} Products Found</p>
          <button className="flex items-center gap-2 text-luxury-black font-bold uppercase text-xs tracking-widest hover:text-luxury-gold transition-colors">
            <Filter size={14} /> Filter & Sort
          </button>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader className="animate-spin text-luxury-gold" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionsPage;