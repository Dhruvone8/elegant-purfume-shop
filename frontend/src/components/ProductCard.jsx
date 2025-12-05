import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ShoppingBag, Eye, Heart, Sparkles } from 'lucide-react';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState(product.images[0]);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleImageError = () => {
    setImgSrc("https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80");
  };

  const calculateDiscount = () => {
    if (product.originalPrice) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return 0;
  };

  const discount = calculateDiscount();

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      className="group relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 border border-gray-100 hover:border-luxury-gold/30"
    >
      {/* Image Section */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <img
          src={imgSrc}
          alt={product.name}
          onError={handleImageError}
          className="w-full h-full object-cover transition-all duration-700"
        />
        
        {/* Gradient Overlay on Hover - Hidden on mobile */}
        <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Hover Overlay with Action Buttons - Hidden on mobile */}
        <div className="hidden sm:flex absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center gap-4">
          <button 
            className="bg-white text-luxury-black p-3 rounded-full hover:bg-luxury-gold hover:scale-110 transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-lg cursor-pointer"
            onClick={(e) => { 
              e.stopPropagation(); 
              alert('Added to cart!'); 
            }}
          >
            <ShoppingBag size={18} className="sm:w-5 sm:h-5" />
          </button>
          <button 
            className="bg-white text-luxury-black p-3 rounded-full hover:bg-luxury-gold hover:scale-110 transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75 shadow-lg cursor-pointer"
            onClick={(e) => { 
              e.stopPropagation(); 
              navigate(`/product/${product._id}`);
            }}
          >
            <Eye size={18} className="sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Wishlist Button - Always visible on mobile */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:scale-110 transition-all duration-300 z-10"
        >
          <Heart 
            size={16} 
            className={`sm:w-[18px] sm:h-[18px] ${isWishlisted ? 'fill-red-500 text-red-500 cursor-pointer' : 'text-gray-600 cursor-pointer'} transition-colors duration-300`}
          />
        </button>

        {/* Badges Container */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1 sm:gap-2 z-10">
          {product.isNewArrival && (
            <div className="bg-luxury-gold text-luxury-black px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-bold tracking-widest uppercase shadow-md flex items-center gap-1">
              <Sparkles size={10} className="sm:w-3 sm:h-3" />
              <span>New</span>
            </div>
          )}
          {discount > 0 && (
            <div className="bg-red-500 text-white px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-bold tracking-widest uppercase shadow-md">
              -{discount}%
            </div>
          )}
        </div>
      </div>

      {/* Info Section - Responsive padding */}
      <div className="p-4 sm:p-5 text-center relative">
        {/* Category Badge */}
        <div className="inline-block bg-luxury-cream px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-gray-600 text-[10px] sm:text-xs font-medium tracking-widest uppercase mb-2 sm:mb-3 border border-gray-200">
          {product.category}
        </div>

        <h3 className="font-serif text-base sm:text-lg md:text-xl font-semibold text-luxury-black mb-2 group-hover:text-luxury-gold transition-colors line-clamp-1">
          {product.name}
        </h3>

        <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 mb-2 sm:mb-3 min-h-[32px] sm:min-h-[40px]">
          {product.description}
        </p>

        {/* Rating - Responsive sizing */}
        <div className="flex justify-center items-center gap-1 mb-2 sm:mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={12}
              className={`sm:w-[14px] sm:h-[14px] ${
                i < Math.floor(product.rating)
                  ? 'fill-luxury-gold text-luxury-gold'
                  : 'text-gray-300'
              } transition-colors duration-300`}
            />
          ))}
          <span className="text-[10px] sm:text-xs text-gray-500 ml-1 sm:ml-2 font-medium">
            {product.rating.toFixed(1)} ({product.reviewsCount})
          </span>
        </div>

        {/* Price - Responsive sizing */}
        <div className="flex justify-center items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <span className="text-xl sm:text-2xl font-bold text-luxury-black">
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-xs sm:text-sm text-gray-400 line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Quick Add Button - Hidden on mobile, shown on hover for desktop */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            alert('Added to cart!');
          }}
          className="hidden sm:block w-full bg-luxury-black text-white py-2 px-4 font-bold text-xs sm:text-sm tracking-wider hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 cursor-pointer"
        >
          QUICK ADD
        </button>
        
        {/* Mobile Add Button - Always visible on small screens */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            alert('Added to cart!');
          }}
          className="sm:hidden w-full bg-luxury-black text-white py-2 px-4 font-bold text-xs tracking-wider hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300 cursor-pointer"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductCard;