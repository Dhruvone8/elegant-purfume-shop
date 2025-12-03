import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Star, Share2, ShoppingBag, Heart, Check, ChevronRight, Loader } from 'lucide-react';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  
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
      setReviews([data.review, ...reviews]); // Prepend new review
      setReviewForm({ name: '', rating: 5, comment: '' });
      alert('Review submitted successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Error submitting review');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader className="animate-spin text-luxury-gold" size={48} /></div>;
  if (!product) return <div className="text-center py-20">Product not found</div>;

  return (
    <div className="pt-28 pb-16 min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-8 text-sm text-gray-500 flex items-center gap-2">
        <span>Home</span> <ChevronRight size={14} /> <span>{product.category}</span> <ChevronRight size={14} /> <span className="text-luxury-black font-semibold">{product.name}</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left: Images */}
          <div className="space-y-6">
            <div className="aspect-[4/5] w-full overflow-hidden bg-gray-50 rounded-sm shadow-lg">
              <img 
                src={product.images[activeImage]} 
                alt={product.name} 
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-square border-2 transition-all ${activeImage === idx ? 'border-luxury-gold' : 'border-transparent opacity-60'}`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="flex flex-col h-full">
            <div className="text-luxury-gold text-sm font-bold tracking-widest uppercase mb-4">
              {product.category}
            </div>
            
            <h1 className="font-serif text-5xl text-luxury-black mb-6">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex text-luxury-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className={i < Math.floor(product.rating) ? "fill-current" : "text-gray-300"} />
                ))}
              </div>
              <span className="text-gray-500 text-sm border-l border-gray-300 pl-4">{reviews.length} Reviews</span>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-8 font-light">
              {product.fullDescription}
            </p>

            <div className="text-3xl font-serif text-luxury-black mb-8">
              ₹{product.price.toLocaleString()}
            </div>

            {/* Size Selector */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-luxury-black uppercase tracking-wider mb-4">Select Size</label>
              <div className="flex gap-4">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 border ${selectedSize === size ? 'bg-luxury-black text-white border-luxury-black' : 'hover:border-luxury-gold'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button className="w-full bg-luxury-gold text-luxury-black py-4 font-bold hover:bg-luxury-darkGold transition-colors flex justify-center items-center gap-2 mb-4">
              <ShoppingBag size={20} /> ADD TO CART
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-24 border-t border-gray-200 pt-16">
          <h2 className="font-serif text-3xl text-luxury-black mb-12 text-center">Customer Reviews</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Review List */}
            <div className="space-y-6 max-h-[600px] overflow-y-auto pr-4">
              {reviews.length === 0 && <p className="text-gray-500 italic">No reviews yet. Be the first!</p>}
              {reviews.map((review) => (
                <div key={review._id} className="bg-luxury-cream/30 p-6 rounded-sm border border-gray-100">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-bold text-luxury-black">{review.name}</h4>
                    <span className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex text-luxury-gold mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className={i < review.rating ? "fill-current" : "text-gray-300"} />
                    ))}
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>

            {/* Review Form */}
            <div className="bg-white p-8 border border-gray-200 shadow-lg h-fit">
              <h3 className="font-serif text-xl mb-6">Write a Review</h3>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase mb-2">Name</label>
                  <input 
                    type="text" 
                    required
                    value={reviewForm.name}
                    onChange={(e) => setReviewForm({...reviewForm, name: e.target.value})}
                    className="w-full bg-gray-50 border p-3 focus:border-luxury-gold outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1,2,3,4,5].map(star => (
                      <button key={star} type="button" onClick={() => setReviewForm({...reviewForm, rating: star})}>
                        <Star size={24} className={star <= reviewForm.rating ? "text-luxury-gold fill-luxury-gold" : "text-gray-300"} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-2">Review</label>
                  <textarea 
                    required
                    rows="4" 
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                    className="w-full bg-gray-50 border p-3 focus:border-luxury-gold outline-none"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={submittingReview}
                  className="w-full bg-luxury-black text-white font-bold py-3 hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  {submittingReview ? 'SUBMITTING...' : 'SUBMIT REVIEW'}
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