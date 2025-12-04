# 🌟 Scent & Soul - Luxury Perfumes

A full-stack luxury perfume e-commerce website built with React (Vite), Node.js, Express, and MongoDB.

## ✨ Features

### Frontend
- **React 19.2.0** - UI library
- **React Router DOM 7.10.0** - Navigation
- **Tailwind CSS 4.1.17** - Styling framework
- **Lucide React** - Icon library
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB

## 📦 Installation & Setup

### Prerequisites
- Node.js (v20.19.0 or higher)
- MongoDB (local or Atlas)

### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
MONGODB_URI=mongodb://localhost:27017/perfume-shop
PORT=5000
```

Start the backend server:
```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🗂️ Project Structure

```
perfume-shop/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── productController.js
│   ├── models/
│   │   ├── Product.js
│   │   └── Review.js
│   ├── routes/
│   │   └── productRoutes.js
│   ├── seedData.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── HeroBanner.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ProductCard.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── ProductPage.jsx
│   │   │   ├── CollectionsPage.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   └── ContactPage.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## 🎯 Key Features Breakdown

### Dynamic Data from Database
- All products fetched from MongoDB
- Reviews stored and retrieved from database
- Real-time updates when reviews are added
- No static data (except fallback images)

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Flexible grid layouts
- Touch-friendly interfaces

### Performance Optimizations
- Image lazy loading
- Component code splitting
- Efficient re-renders
- Optimized database queries

### User Experience
- Loading states for async operations
- Error handling with user-friendly messages
- Form validations
- Smooth page transitions
- Breadcrumb navigation

## 🚀 Features Highlights

### Product Cards
- Image hover to show alternate view
- Wishlist toggle with heart icon
- Quick view and add to cart buttons
- Discount percentage display
- Star rating system
- Responsive design

### Product Detail Page
- Image gallery with thumbnail selection
- Size selection with visual feedback
- Quantity adjustment
- Share functionality with multiple platforms
- Review submission and display
- Related product recommendations
- Trust badges for customer confidence

### Collections Page
- Advanced filtering system
- Multiple sorting options
- Active filter display
- Clear filters functionality
- Empty state handling
- Product count display

## 🎨 Design System

### Colors
- **Primary Gold**: #D4AF37
- **Dark Gold**: #AA8C2C
- **Luxury Black**: #1A1A1A
- **Luxury Cream**: #FFF8E7
- **Accent Gray**: #2D2D2D

### Typography
- **Headings**: Playfair Display (Serif)
- **Body**: Montserrat (Sans-serif)

### Spacing
- Consistent 4px/8px grid system
- Generous padding and margins
- Visual hierarchy through spacing

## 📱 Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔒 Future Enhancements
- User authentication and authorization
- Shopping cart functionality
- Checkout and payment integration
- Order tracking
- User profile and order history
- Admin dashboard for product management
- Wishlist persistence
- Product comparison
- Advanced search functionality
- Email notifications

## 👨‍💻 Development Notes

### Code Quality
- Clean and organized code structure
- Reusable components
- Proper prop validation
- Error boundary implementation
- Consistent naming conventions

### Best Practices
- Semantic HTML
- Accessibility considerations
- SEO-friendly structure
- Performance optimizations
- Security considerations

## 📄 License
ISC

## 🤝 Contributing
This is a demonstration project. Feel free to fork and customize!

---

**Built with ❤️ by Perfume Shop Team**