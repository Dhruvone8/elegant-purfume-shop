import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import {
  Loader,
  Filter,
  X,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";

const CollectionsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedGender, setSelectedGender] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/products");
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Apply Filters
  useEffect(() => {
    let filtered = [...products];

    // Category Filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Gender Filter
    if (selectedGender !== "All") {
      filtered = filtered.filter((p) => p.gender === selectedGender);
    }

    // Price Range Filter
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Featured - keep original order
        break;
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, selectedGender, priceRange, sortBy]);

  const categories = ["All", ...new Set(products.map((p) => p.category))];
  const genders = ["All", "Men", "Women", "Unisex"];

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedGender("All");
    setPriceRange([0, 20000]);
    setSortBy("featured");
  };

  return (
    <div className="bg-luxury-cream min-h-screen pt-24 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-luxury-black to-gray-900 text-white py-20 mb-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(212,175,55,0.3) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          ></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <span className="text-luxury-gold text-sm font-bold tracking-[0.2em] uppercase block mb-4">
            Shop The Look
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">
            All Collections
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Explore our complete range of luxury fragrances
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-4">
            <p className="text-gray-700 font-medium">
              <span className="font-bold text-luxury-black text-xl">
                {filteredProducts.length}
              </span>{" "}
              {filteredProducts.length === 1 ? "Product" : "Products"} Found
            </p>
            {(selectedCategory !== "All" ||
              selectedGender !== "All" ||
              priceRange[0] !== 0 ||
              priceRange[1] !== 20000) && (
              <button
                onClick={clearFilters}
                className="text-sm text-luxury-gold hover:text-luxury-darkGold font-medium flex items-center gap-1"
              >
                <X size={16} /> Clear Filters
              </button>
            )}
          </div>

          <div className="flex gap-4 flex-wrap">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border-2 border-gray-300 rounded-lg px-6 py-3 pr-10 font-medium text-sm hover:border-luxury-gold focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/20 outline-none transition-all cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
                size={20}
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-luxury-black text-white px-6 py-3 rounded-lg font-bold text-sm tracking-wider hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300"
            >
              <SlidersHorizontal size={18} />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white p-8 rounded-lg shadow-lg mb-8 border-t-4 border-luxury-gold animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Category Filter */}
              <div>
                <h3 className="font-bold text-luxury-black mb-4 uppercase tracking-wider text-sm">
                  Category
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="w-4 h-4 text-luxury-gold focus:ring-luxury-gold"
                      />
                      <span className="text-gray-700 group-hover:text-luxury-gold transition-colors">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Gender Filter */}
              <div>
                <h3 className="font-bold text-luxury-black mb-4 uppercase tracking-wider text-sm">
                  Gender
                </h3>
                <div className="space-y-2">
                  {genders.map((gender) => (
                    <label
                      key={gender}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="gender"
                        checked={selectedGender === gender}
                        onChange={() => setSelectedGender(gender)}
                        className="w-4 h-4 text-luxury-gold focus:ring-luxury-gold"
                      />
                      <span className="text-gray-700 group-hover:text-luxury-gold transition-colors">
                        {gender}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-bold text-luxury-black mb-4 uppercase tracking-wider text-sm">
                  Price Range
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([
                          parseInt(e.target.value) || 0,
                          priceRange[1],
                        ])
                      }
                      className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/20 outline-none"
                      placeholder="Min"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([
                          priceRange[0],
                          parseInt(e.target.value) || 20000,
                        ])
                      }
                      className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/20 outline-none"
                      placeholder="Max"
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20000"
                    step="500"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full accent-luxury-gold"
                  />
                  <p className="text-sm text-gray-600 text-center">
                    ₹{priceRange[0].toLocaleString()} - ₹
                    {priceRange[1].toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {(selectedCategory !== "All" || selectedGender !== "All") && (
          <div className="flex flex-wrap gap-3 mb-8">
            {selectedCategory !== "All" && (
              <div className="bg-luxury-gold/10 border border-luxury-gold text-luxury-black px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                <span>Category: {selectedCategory}</span>
                <button onClick={() => setSelectedCategory("All")}>
                  <X size={16} />
                </button>
              </div>
            )}
            {selectedGender !== "All" && (
              <div className="bg-luxury-gold/10 border border-luxury-gold text-luxury-black px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                <span>Gender: {selectedGender}</span>
                <button onClick={() => setSelectedGender("All")}>
                  <X size={16} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader className="animate-spin text-luxury-gold mb-4" size={48} />
            <p className="text-gray-600 font-medium">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white rounded-lg p-12 shadow-md max-w-md mx-auto">
              <Filter className="mx-auto mb-4 text-gray-300" size={64} />
              <h3 className="text-2xl font-serif font-bold text-luxury-black mb-2">
                No Products Found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters to see more results
              </p>
              <button
                onClick={clearFilters}
                className="bg-luxury-black text-white px-6 py-3 rounded-lg font-bold hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionsPage;
