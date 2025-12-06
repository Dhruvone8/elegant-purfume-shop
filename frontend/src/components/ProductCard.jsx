import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ShoppingBag, Eye, Heart, Sparkles } from 'lucide-react';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  
  // Track which image is currently displayed
  // Start with first image in the product's images array
  const [imgSrc, setImgSrc] = useState(product.images[0]);
  
  // Track whether user has added this product to wishlist
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Fallback image if product image fails to load
  // This ensures card always shows something even if image URL is broken
  const handleImageError = () => {
    setImgSrc("https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80");
  };

  // Calculate discount percentage to show savings
  // Only calculates if originalPrice exists
  const calculateDiscount = () => {
    if (product.originalPrice) {
      // Formula: ((original - current) / original) * 100, rounded
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return 0;
  };

  const discount = calculateDiscount();

  return (
    // Entire card is clickable to navigate to product detail page
    // Using flex column to push action buttons to bottom
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      className="group relative bg-white rounded-lg shadow-sm hover:shadow-xl overflow-hidden cursor-pointer transition-all duration-500 border border-gray-100 hover:border-luxury-gold/30 flex flex-col h-full"
    >
      {/* Image Section with 3:4 aspect ratio */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
        <img
          src={imgSrc}
          alt={product.name}
          onError={handleImageError}
          // Image scales up slightly on hover for zoom effect
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Hover Overlay with Quick Action Buttons - Desktop only */}
        <div className="hidden md:flex absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center gap-4 z-20">
          {/* Add to Cart button */}
          <button 
            className="bg-white text-luxury-black p-3 rounded-full hover:bg-luxury-gold hover:scale-110 transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-lg"
            onClick={(e) => { 
              e.stopPropagation(); // Prevent card click from firing
              alert('Added to cart!'); 
            }}
          >
            <ShoppingBag size={20} />
          </button>
          
          {/* Quick View button */}
          <button 
            className="bg-white text-luxury-black p-3 rounded-full hover:bg-luxury-gold hover:scale-110 transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75 shadow-lg"
            onClick={(e) => { 
              e.stopPropagation();
              navigate(`/product/${product._id}`);
            }}
          >
            <Eye size={20} />
          </button>
        </div>

        {/* Wishlist Button - Works on both mobile and desktop */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-2 right-2 md:top-3 md:right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm z-30 active:scale-95"
        >
          <Heart 
            size={16} 
            // Fill with red when wishlisted, otherwise just outline
            className={`md:w-5 md:h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'} transition-colors`}
          />
        </button>

        {/* Badges for New Arrivals and Discounts */}
        <div className="absolute top-2 left-2 md:top-3 md:left-3 flex flex-col gap-1.5 z-30">
          {/* Only show "New" badge if product is marked as new arrival */}
          {product.isNewArrival && (
            <div className="bg-luxury-gold text-luxury-black px-2 py-0.5 text-[10px] md:text-xs font-bold tracking-widest uppercase shadow-sm flex items-center gap-1 rounded-sm">
              <Sparkles size={10} className="md:w-3 md:h-3" />
              <span>New</span>
            </div>
          )}
          
          {/* Show discount badge if there's a sale */}
          {discount > 0 && (
            <div className="bg-red-500 text-white px-2 py-0.5 text-[10px] md:text-xs font-bold tracking-widest uppercase shadow-sm rounded-sm">
              -{discount}%
            </div>
          )}
        </div>
      </div>

      {/* Product Info Section */}
      <div className="p-3 md:p-5 text-center flex flex-col flex-grow relative bg-white z-10">
        
        {/* Category badge */}
        <div className="inline-block self-center bg-luxury-cream px-2 py-0.5 rounded-sm text-gray-600 text-[10px] md:text-xs font-medium tracking-widest uppercase mb-2 border border-luxury-gold/20">
          {product.category}
        </div>

        {/* Product name - truncate to single line */}
        <h3 className="font-serif text-sm md:text-lg font-semibold text-luxury-black mb-1 group-hover:text-luxury-gold transition-colors line-clamp-1">
          {product.name}
        </h3>

        {/* Product description - truncate to 2 lines, min height prevents layout shift */}
        <p className="text-gray-500 text-[10px] md:text-xs line-clamp-2 mb-2 min-h-[30px]">
          {product.description}
        </p>

        {/* Price section pushed to bottom with mt-auto */}
        <div className="mt-auto">
          {/* Current and original prices */}
          <div className="flex justify-center items-center gap-2 mb-3">
            <span className="text-lg md:text-xl font-bold text-luxury-black">
              ₹{product.price.toLocaleString()}
            </span>
            
            {/* Original price with strikethrough if discount exists */}
            {product.originalPrice && (
              <span className="text-xs md:text-sm text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Mobile "Add to Cart" button - Always visible on small screens */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              alert('Added to cart!');
            }}
            className="md:hidden w-full bg-luxury-black text-white py-2 text-xs font-bold tracking-wider rounded-sm active:bg-luxury-gold active:text-black transition-colors"
          >
            ADD TO CART
          </button>

          {/* Desktop "Quick Add" button - Only visible on hover */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              alert('Added to cart!');
            }}
            className="hidden md:block w-full bg-luxury-black text-white py-2 font-bold text-sm tracking-wider hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 rounded-sm"
          >
            QUICK ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;