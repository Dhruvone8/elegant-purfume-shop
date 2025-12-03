import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ShoppingBag, Eye } from 'lucide-react';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  // State to handle image failure
  const [imgSrc, setImgSrc] = useState(product.images[0]);

  // Fallback image if the main one fails
  const handleImageError = () => {
    // Falls back to a reliable generic perfume image
    setImgSrc("https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80");
  };

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      className="group relative bg-white rounded-sm shadow-md overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
    >
      {/* Image Section */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-200">
        <img
          src={imgSrc}
          alt={product.name}
          onError={handleImageError}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Hover Overlay with Action Buttons */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <button 
            className="bg-white text-luxury-black p-3 rounded-full hover:bg-luxury-gold transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-lg"
            onClick={(e) => { e.stopPropagation(); /* Add to cart logic */ }}
          >
            <ShoppingBag size={20} />
          </button>
          <button 
            className="bg-white text-luxury-black p-3 rounded-full hover:bg-luxury-gold transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75 shadow-lg"
          >
            <Eye size={20} />
          </button>
        </div>

        {/* 'New' Badge - UPDATED PROP NAME */}
        {product.isNewArrival && (
          <div className="absolute top-3 left-3 bg-luxury-gold text-luxury-black px-3 py-1 text-xs font-bold tracking-widest uppercase shadow-md z-10">
            New
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="p-5 text-center">
        <div className="text-gray-500 text-xs font-medium tracking-widest uppercase mb-2">
          {product.category}
        </div>

        <h3 className="font-serif text-xl font-semibold text-luxury-black mb-2 group-hover:text-luxury-gold transition-colors">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm line-clamp-1 mb-3 italic">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex justify-center items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={`${
                i < Math.floor(product.rating)
                  ? 'fill-luxury-gold text-luxury-gold'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="text-xs text-gray-400 ml-1">({product.reviewsCount})</span>
        </div>

        {/* Price */}
        <div className="flex justify-center items-center gap-3">
          <span className="text-lg font-bold text-luxury-black">
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;