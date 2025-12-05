import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { 
  Star, Share2, ShoppingBag, Heart, ChevronRight, Loader, 
  Truck, Shield, RotateCcw, Check, Facebook, Twitter, 
  Instagram, MessageCircle, Package, Sparkles 
} from 'lucide-react';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  
  // Review Form State
  const [reviewForm, setReviewForm] = useState({ name: '', rating: 5, comment: '' });
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, reviewsRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/products/${id}`),
          axios.get(`http://localhost:5000/api/products/${id}/reviews`)
        ]);
        setProduct(productRes.data);
        setReviews(reviewsRes.data);
        if (productRes.data.sizes?.length > 0) setSelectedSize(productRes.data.sizes[0]);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setSubmittingReview(true);
    try {
      const { data } = await axios.post(`http://localhost:5000/api/products/${id}/reviews`, reviewForm);
      setReviews([data.review, ...reviews]);
      setReviewForm({ name: '', rating: 5, comment: '' });
      alert('Review submitted successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Error submitting review');
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out ${product.name} at ÉLÉGANCE`;
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      whatsapp: `https://wa.me/?text=${text} ${url}`,
      copy: url
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    } else {
      window.open(shareUrls[platform], '_blank');
    }
    setShowShareMenu(false);
  };

  const addToCart = () => {
    alert(`Added ${quantity} x ${product.name} (${selectedSize}) to cart!`);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-luxury-cream">
        <div className="text-center">
          <Loader className="animate-spin text-luxury-gold mx-auto mb-4" size={48} />
          <p className="text-gray-600 font-medium">Loading product details...</p>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="text-center py-20 min-h-screen flex items-center justify-center bg-luxury-cream">
        <div>
          <h2 className="text-3xl font-serif text-luxury-black mb-4">Product not found</h2>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-16 min-h-screen bg-luxury-cream">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="hover:text-luxury-gold cursor-pointer transition-colors">Home</span> 
          <ChevronRight size={14} /> 
          <span className="hover:text-luxury-gold cursor-pointer transition-colors">{product.category}</span> 
          <ChevronRight size={14} /> 
          <span className="text-luxury-black font-semibold">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left: Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-white rounded-lg shadow-xl border border-gray-200 group">
              <img 
                src={product.images[activeImage]} 
                alt={product.name} 
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80";
                }}
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNewArrival && (
                  <div className="bg-luxury-gold text-luxury-black px-3 py-1 text-xs font-bold tracking-widest uppercase shadow-lg flex items-center gap-1">
                    <Sparkles size={12} />
                    <span>New Arrival</span>
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail Grid - Only displayed if there are multiple images */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`aspect-square border-2 rounded-lg overflow-hidden transition-all duration-300 ${
                      activeImage === idx 
                        ? 'border-luxury-gold shadow-lg scale-105' 
                        : 'border-gray-200 hover:border-luxury-gold/50 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`View ${idx + 1}`} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80";
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="flex flex-col">
            {/* Category & Brand */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-luxury-gold text-sm font-bold tracking-widest uppercase">
                {product.category}
              </span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600 text-sm font-medium">{product.brand}</span>
            </div>
            
            <h1 className="font-serif text-4xl md:text-5xl text-luxury-black mb-4 leading-tight">{product.name}</h1>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <div className="flex text-luxury-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      className={i < Math.floor(product.rating) ? "fill-current" : "text-gray-300"} 
                    />
                  ))}
                </div>
                <span className="text-gray-700 font-semibold">{product.rating.toFixed(1)}</span>
              </div>
              <span className="text-gray-500 text-sm">{reviews.length} Reviews</span>
              <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                <Check size={16} /> In Stock
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-4xl font-serif font-bold text-luxury-black">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold">
                      Save ₹{(product.originalPrice - product.price).toLocaleString()}
                    </span>
                  </>
                )}
              </div>
              <p className="text-gray-500 text-sm">Inclusive of all taxes</p>
            </div>

            {/* Description */}
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              {product.fullDescription}
            </p>

            {/* Product Details */}
            <div className="bg-white rounded-lg p-6 mb-8 border border-gray-200 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Type:</span>
                <span className="text-luxury-black font-semibold">{product.type}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Gender:</span>
                <span className="text-luxury-black font-semibold">{product.gender}</span>
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-luxury-black uppercase tracking-wider mb-4">
                Select Size
              </label>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 border-2 rounded-lg font-semibold transition-all duration-300 ${
                      selectedSize === size 
                        ? 'bg-luxury-black text-white border-luxury-black shadow-lg scale-105' 
                        : 'bg-white text-gray-700 border-gray-300 hover:border-luxury-gold'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-luxury-black uppercase tracking-wider mb-4">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 border-2 border-gray-300 rounded-lg hover:border-luxury-gold transition-colors font-bold text-xl"
                >
                  -
                </button>
                <span className="text-2xl font-bold w-16 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 border-2 border-gray-300 rounded-lg hover:border-luxury-gold transition-colors font-bold text-xl"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <button 
                onClick={addToCart}
                className="flex-1 bg-luxury-gold text-luxury-black py-4 font-bold text-lg hover:bg-luxury-darkGold transition-all duration-300 flex justify-center items-center gap-3 shadow-lg hover:shadow-xl rounded-lg"
              >
                <ShoppingBag size={22} /> ADD TO CART
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`w-16 border-2 rounded-lg transition-all duration-300 flex items-center justify-center ${
                  isWishlisted 
                    ? 'bg-red-50 border-red-500' 
                    : 'bg-white border-gray-300 hover:border-luxury-gold'
                }`}
              >
                <Heart 
                  size={22} 
                  className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'} 
                />
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="w-16 h-full border-2 border-gray-300 hover:border-luxury-gold rounded-lg transition-all duration-300 flex items-center justify-center"
                >
                  <Share2 size={22} className="text-gray-600" />
                </button>
                
                {/* Share Menu */}
                {showShareMenu && (
                  <div className="absolute top-full right-0 mt-2 bg-white shadow-2xl rounded-lg p-4 z-50 min-w-[200px] border border-gray-200">
                    <p className="text-sm font-bold text-gray-700 mb-3">Share Product</p>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleShare('facebook')}
                        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Facebook size={18} className="text-blue-600" />
                        <span className="text-sm font-medium">Facebook</span>
                      </button>
                      <button
                        onClick={() => handleShare('twitter')}
                        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-sky-50 rounded-lg transition-colors"
                      >
                        <Twitter size={18} className="text-sky-500" />
                        <span className="text-sm font-medium">Twitter</span>
                      </button>
                      <button
                        onClick={() => handleShare('whatsapp')}
                        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-green-50 rounded-lg transition-colors"
                      >
                        <MessageCircle size={18} className="text-green-600" />
                        <span className="text-sm font-medium">WhatsApp</span>
                      </button>
                      <button
                        onClick={() => handleShare('copy')}
                        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <Share2 size={18} className="text-gray-600" />
                        <span className="text-sm font-medium">Copy Link</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-200">
              <div className="text-center">
                <Truck className="mx-auto mb-2 text-luxury-gold" size={28} />
                <p className="text-xs font-bold text-gray-700">Free Shipping</p>
                <p className="text-xs text-gray-500">On orders above ₹2000</p>
              </div>
              <div className="text-center">
                <Shield className="mx-auto mb-2 text-luxury-gold" size={28} />
                <p className="text-xs font-bold text-gray-700">100% Authentic</p>
                <p className="text-xs text-gray-500">Genuine products only</p>
              </div>
              <div className="text-center">
                <RotateCcw className="mx-auto mb-2 text-luxury-gold" size={28} />
                <p className="text-xs font-bold text-gray-700">Easy Returns</p>
                <p className="text-xs text-gray-500">30-day return policy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-24 border-t border-gray-300 pt-16">
          <h2 className="font-serif text-4xl text-luxury-black mb-4 text-center">Customer Reviews</h2>
          <p className="text-center text-gray-600 mb-12">
            Read what our customers have to say about this fragrance
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Review List */}
            <div className="space-y-6 max-h-[700px] overflow-y-auto pr-4">
              {reviews.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                  <Package className="mx-auto mb-4 text-gray-300" size={48} />
                  <p className="text-gray-500 italic">No reviews yet. Be the first to review!</p>
                </div>
              )}
              {reviews.map((review) => (
                <div key={review._id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-luxury-black text-lg">{review.name}</h4>
                      <span className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-luxury-gold/10 px-3 py-1 rounded-full">
                      <Star size={14} className="fill-luxury-gold text-luxury-gold" />
                      <span className="text-sm font-bold text-luxury-gold">{review.rating}</span>
                    </div>
                  </div>
                  <div className="flex text-luxury-gold mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className={i < review.rating ? "fill-current" : "text-gray-300"} />
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>

            {/* Review Form */}
            <div className="bg-white p-8 border border-gray-200 shadow-lg rounded-lg h-fit sticky top-28">
              <h3 className="font-serif text-2xl mb-6 text-luxury-black">Write a Review</h3>
              <form onSubmit={handleSubmitReview} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold uppercase mb-3 text-gray-700">Your Name *</label>
                  <input 
                    type="text" 
                    required
                    value={reviewForm.name}
                    onChange={(e) => setReviewForm({...reviewForm, name: e.target.value})}
                    placeholder="Enter your name"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-4 focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/20 outline-none transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase mb-3 text-gray-700">Your Rating *</label>
                  <div className="flex gap-3">
                    {[1,2,3,4,5].map(star => (
                      <button 
                        key={star} 
                        type="button" 
                        onClick={() => setReviewForm({...reviewForm, rating: star})}
                        className="transition-transform hover:scale-110"
                      >
                        <Star 
                          size={32} 
                          className={`${star <= reviewForm.rating ? "text-luxury-gold fill-luxury-gold" : "text-gray-300"} transition-colors`} 
                        />
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Selected: {reviewForm.rating} star{reviewForm.rating !== 1 ? 's' : ''}</p>
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase mb-3 text-gray-700">Your Review *</label>
                  <textarea 
                    required
                    rows="5" 
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                    placeholder="Share your experience with this product..."
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-4 focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/20 outline-none transition-all resize-none"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={submittingReview}
                  className="w-full bg-luxury-black text-white font-bold py-4 rounded-lg hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {submittingReview ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader className="animate-spin" size={20} />
                      SUBMITTING...
                    </span>
                  ) : (
                    'SUBMIT REVIEW'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;