import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CollectionsPage from './pages/CollectionsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    // Router wraps the entire app to enable navigation between pages
    // BrowserRouter uses the HTML5 history API for clean URLs (no # symbol)
    <Router>
      {/* Main container with minimum full-screen height and cream background */}
      <div className="min-h-screen bg-luxury-cream">
        
        {/* Navbar appears on all pages since it's outside the Routes */}
        <Navbar />
        
        {/* Routes defines which component to show for each URL path */}
        <Routes>
          {/* Home page at root URL */}
          <Route path="/" element={<HomePage />} />
          
          {/* Collections page shows all products with filters */}
          <Route path="/collections" element={<CollectionsPage />} />
          
          {/* About page for company information */}
          <Route path="/about" element={<AboutPage />} />
          
          {/* Contact page for customer inquiries */}
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Product detail page uses :id parameter to load specific product */}
          {/* :id is dynamic and matches URLs like /product/abc123 */}
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;