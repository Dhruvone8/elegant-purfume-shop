# 🌟 Elegant - Luxury Perfumes

A full-stack luxury perfume e-commerce website built with React (Vite), Node.js, Express, and MongoDB.

## ✨ Features

### Frontend
- ✅ Responsive Navigation Bar with mobile menu
- ✅ Eye-catching Hero Banner with Call to Action
- ✅ Product Cards with hover effects and animations
- ✅ Product redirection to detailed pages
- ✅ Detailed Product Page with image gallery
- ✅ Reviews Section (read and add reviews)
- ✅ Share functionality for products
- ✅ Luxurious design with custom color scheme
- ✅ Smooth animations and transitions

### Backend
- ✅ RESTful API with Express.js
- ✅ MongoDB database integration
- ✅ MVC architecture (Models, Controllers, Routes)
- ✅ Product and Review models
- ✅ CRUD operations for products
- ✅ Review submission and rating system
- ✅ Automatic database seeding

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd perfume-shop-backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment variables:**
Create a `.env` file in the backend directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/perfume-shop
```

4. **Start MongoDB:**
If using local MongoDB:
```bash
mongod
```

5. **Start the backend server:**
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd perfume-shop-frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📁 Project Structure

### Frontend Structure
```
perfume-shop-frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── HeroBanner.jsx
│   │   └── ProductCard.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   └── ProductPage.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

### Backend Structure
```
perfume-shop-backend/
├── controllers/
│   └── productController.js
├── models/
│   ├── Product.js
│   └── Review.js
├── routes/
│   └── productRoutes.js
├── server.js
├── seedData.js
├── .env
└── package.json
```

## 🎨 Design Features

### Color Palette
- **Gold**: #D4AF37 (Primary luxury accent)
- **Dark Gold**: #B8960F (Hover states)
- **Cream**: #FFF8E7 (Background)
- **Luxury Black**: #1A1A1A (Text and nav)
- **Gray**: #2D2D2D (Secondary elements)

### Typography
- **Headings**: Playfair Display (Serif)
- **Body**: Montserrat (Sans-serif)

### Key Interactions
- Smooth hover effects on product cards
- Image gallery with thumbnail selection
- Interactive star ratings
- Responsive mobile menu
- Social sharing functionality

## 🔌 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/products/:id/reviews` - Get product reviews
- `POST /api/products/:id/reviews` - Add product review

## 🗄️ Database Schema

### Product Model
- name (String, required)
- description (String, required)
- fullDescription (String, required)
- price (Number, required)
- originalPrice (Number)
- category (String, enum)
- brand (String, required)
- type (String, enum)
- gender (String, enum)
- images (Array of Strings)
- sizes (Array of Strings)
- rating (Number, 0-5)
- reviewsCount (Number)
- isNew (Boolean)
- inStock (Boolean)

### Review Model
- product (ObjectId, ref: Product)
- name (String, required)
- rating (Number, 1-5, required)
- comment (String, required)
- timestamps (createdAt, updatedAt)

## 🛠️ Technologies Used

### Frontend
- React 18
- Vite
- React Router DOM
- Tailwind CSS
- Axios
- Lucide React (icons)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- Dotenv

## 📝 Additional Features Implemented

1. **Database-Driven**: All product data comes from MongoDB
2. **Review System**: Users can add and view reviews
3. **Rating System**: Automatic rating calculation
4. **Image Gallery**: Multiple product images
5. **Size Selection**: Dynamic size options
6. **Share Functionality**: Native Web Share API
7. **Responsive Design**: Mobile-first approach
8. **Loading States**: User feedback during data fetching
9. **Error Handling**: Graceful error messages
10. **Auto-Seeding**: Database seeds automatically on first run

## 🎯 Testing the Application

1. Start both backend and frontend servers
2. Visit `http://localhost:5173`
3. Browse the homepage with featured products
4. Click on any product card to view details
5. Try adding a review on the product page
6. Test the share button functionality
7. Test responsiveness on different screen sizes

## 📦 Building for Production

### Frontend
```bash
npm run build
```

### Backend
```bash
npm start
```

## 🌐 Deployment Considerations

- Configure MongoDB Atlas for production
- Set up environment variables on hosting platform
- Build frontend and serve static files
- Consider using PM2 for Node.js process management
- Set up CORS properly for production domains

## 💡 Future Enhancements

- User authentication
- Shopping cart functionality
- Payment gateway integration
- Wishlist feature
- Product filtering and sorting
- Search functionality
- Admin dashboard
- Email notifications
- Product recommendations

## 👨‍💻 Developer Notes

- All images use Unsplash URLs (replace with actual product images)
- MongoDB runs on default port 27017
- Backend runs on port 5000
- Frontend proxies API calls to backend
- Tailwind CSS uses JIT mode for optimal performance

## 📄 License

This project is created for educational purposes as part of a Full Stack Developer assessment.

---

**Built with ❤️ by Perfume Shop Team**
