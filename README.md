# 🍽️ FoodieHub - Food Delivery Application

A complete full-stack food delivery application built with React, Node.js, Express, and MySQL. Features include user authentication, restaurant browsing, menu management, shopping cart, and order placement.

## 🔴 Live Demo

<div align="center">
  <video controls width="720" poster="frontend/public/images/food-delivery.jpg">
    <source src="https://drive.google.com/uc?export=download&id=18t1kaQ68--Oe9EGbblwA5dqnqHRfLj01" type="video/mp4" />
    Your browser doesn't support embedded videos. You can watch it here:
    <a href="https://drive.google.com/file/d/18t1kaQ68--Oe9EGbblwA5dqnqHRfLj01/preview">Google Drive Preview</a>.
  </video>
</div>

Reference: [`Google Drive video`](https://drive.google.com/file/d/18t1kaQ68--Oe9EGbblwA5dqnqHRfLj01/view?usp=sharing)

## ✨ Features

### 🎯 Core Features
- **User Authentication**: Signup, Login, Logout with JWT tokens
- **Restaurant Browsing**: View restaurants with filters and search
- **Menu Management**: Browse restaurant menus with filtering options
- **Shopping Cart**: Add/remove items with quantity management
- **Order Placement**: Complete checkout process with order confirmation
- **Responsive Design**: Mobile-first design with beautiful UI

### 🛠️ Technical Features
- **Frontend**: React with ES6 modules, React Router, Context API
- **Backend**: Node.js with Express REST API
- **Database**: MySQL with proper schema and relationships
- **Authentication**: JWT-based authentication with bcrypt password hashing
- **Styling**: Pure CSS with Flexbox, responsive design, and hover effects
- **State Management**: React Context for cart and authentication
- **API Integration**: Axios for HTTP requests
- **Data Persistence**: localStorage for cart persistence

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd food_app
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your database credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=food_delivery
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=5000
   NODE_ENV=development
   ```

4. **Set up the database**
   ```bash
   # Connect to MySQL and run:
   mysql -u root -p
   source database/schema.sql
   source database/seed.sql
   ```

5. **Start the application**
   ```bash
   npm run dev
   ```

   This will start both frontend (http://localhost:3000) and backend (http://localhost:5000) servers.

## 📁 Project Structure

```
food_app/
├── frontend/                 # React frontend application
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   │   ├── Card.js
│   │   │   ├── Button.js
│   │   │   ├── FormInput.js
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   ├── Hero.js
│   │   │   ├── MenuItemCard.js
│   │   │   ├── CartDrawer.js
│   │   │   ├── LoginForm.js
│   │   │   └── SignupForm.js
│   │   ├── pages/           # Page components
│   │   │   ├── Home.js
│   │   │   ├── Restaurants.js
│   │   │   ├── RestaurantDetails.js
│   │   │   ├── Cart.js
│   │   │   ├── Checkout.js
│   │   │   ├── Login.js
│   │   │   └── Signup.js
│   │   ├── contexts/        # React Context providers
│   │   │   ├── AuthContext.js
│   │   │   └── CartContext.js
│   │   ├── services/        # API service layer
│   │   │   └── api.js
│   │   ├── styles/          # CSS styles
│   │   │   ├── global.css
│   │   │   ├── layout.css
│   │   │   └── components.css
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── backend/                 # Node.js backend application
│   ├── controllers/         # Route controllers
│   │   ├── authController.js
│   │   ├── restaurantController.js
│   │   ├── menuController.js
│   │   └── orderController.js
│   ├── routes/             # API routes
│   │   ├── authRoutes.js
│   │   ├── restaurantRoutes.js
│   │   ├── menuRoutes.js
│   │   └── orderRoutes.js
│   ├── models/             # Database models
│   │   ├── db.js
│   │   ├── userModel.js
│   │   ├── restaurantModel.js
│   │   ├── menuModel.js
│   │   └── orderModel.js
│   ├── middleware/         # Custom middleware
│   │   ├── auth.js
│   │   └── validation.js
│   ├── server.js
│   └── package.json
├── database/               # Database files
│   ├── schema.sql          # Database schema
│   └── seed.sql           # Sample data
├── package.json           # Root package.json
├── env.example           # Environment variables template
└── README.md
```

## 🗄️ Database Schema

### Tables
- **users**: User accounts and authentication
- **restaurants**: Restaurant information and details
- **menu_items**: Individual menu items for each restaurant
- **orders**: Order records with items and status

### Sample Data
The database includes sample data for:
- 5 restaurants (Bangalore Dosa, Butter Chicken By Kilo, Biryani House, Pizza Corner, Sushi Express)
- 20+ menu items with real food images
- Various cuisines: South Indian, North Indian, Biryani, Italian, Japanese

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### Restaurants
- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/:id` - Get restaurant by ID
- `GET /api/restaurants/cuisine/:cuisine` - Get restaurants by cuisine
- `GET /api/restaurants/search?q=query` - Search restaurants
- `GET /api/restaurants/filter` - Get restaurants with filters

### Menu
- `GET /api/menu/restaurant/:id` - Get menu by restaurant ID
- `GET /api/menu/:id` - Get menu item by ID
- `GET /api/menu/search?q=query` - Search menu items

### Orders
- `POST /api/orders` - Create new order (protected)
- `GET /api/orders/me` - Get user's orders (protected)
- `GET /api/orders/:id` - Get order by ID (protected)

## 🎨 UI/UX Features

### Design Elements
- **Modern UI**: Clean, modern design with beautiful gradients
- **Responsive**: Mobile-first design that works on all devices
- **Shadows & Effects**: Beautiful box shadows and hover effects
- **Images**: High-quality food images with proper aspect ratios
- **Typography**: Clean, readable fonts with proper hierarchy

### Interactive Elements
- **Hover Effects**: Cards scale and shadow on hover
- **Loading States**: Spinners and loading indicators
- **Error Handling**: User-friendly error messages
- **Success Feedback**: Toast notifications and success states
- **Form Validation**: Real-time form validation with error messages

## 🛒 Shopping Cart Features

- **Add to Cart**: Add items from restaurant menus
- **Quantity Management**: Increase/decrease item quantities
- **Remove Items**: Remove items from cart
- **Persistent Storage**: Cart persists across browser sessions
- **Cart Drawer**: Slide-out cart on desktop, bottom drawer on mobile
- **Order Summary**: Detailed order summary with totals

## 🔐 Authentication Features

- **Secure Registration**: Password hashing with bcrypt
- **JWT Tokens**: Secure authentication with JSON Web Tokens
- **Protected Routes**: Cart and checkout require authentication
- **Auto-login**: Persistent login across browser sessions
- **Form Validation**: Client and server-side validation

## 📱 Responsive Design

### Breakpoints
- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 480px - 767px
- **Small Mobile**: Below 480px

### Mobile Features
- **Touch-friendly**: Large buttons and touch targets
- **Swipe Gestures**: Natural mobile interactions
- **Bottom Navigation**: Mobile-optimized navigation
- **Responsive Images**: Images that scale properly on all devices

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)
1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy the `build` folder to your hosting service
3. Update API URLs in `frontend/src/services/api.js`

4. (Optional) Create `frontend/.env` with:

   ```env
   REACT_APP_API_URL=https://your-backend-host/api
   ```

### Backend Deployment (Heroku/Railway)
1. Set environment variables in your hosting platform
2. Deploy the backend folder
3. Set up MySQL database (PlanetScale, Railway, etc.)

Example Railway/Render environment variables:

```env
PORT=5000
JWT_SECRET=replace_with_strong_secret
DB_TYPE=sqlite
DB_PATH=./backend/database/food_delivery.db
# Or for MySQL
# DB_HOST=...
# DB_USER=...
# DB_PASSWORD=...
# DB_NAME=...
```

### Database Deployment
1. Import `database/schema.sql` to create tables
2. Import `database/seed.sql` to add sample data
3. Update connection string in backend environment variables

## 🧪 Testing

### Manual Testing
1. **User Registration**: Create new accounts
2. **User Login**: Test login functionality
3. **Restaurant Browsing**: Browse and filter restaurants
4. **Menu Browsing**: View restaurant menus
5. **Cart Management**: Add/remove items from cart
6. **Order Placement**: Complete checkout process
7. **Responsive Design**: Test on different screen sizes

### API Testing
Use tools like Postman or curl to test API endpoints:

```bash
# Test restaurant API
curl http://localhost:5000/api/restaurants

# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check MySQL is running
   - Verify database credentials in `.env`
   - Ensure database exists

2. **Frontend Not Loading**
   - Check if backend is running on port 5000
   - Verify proxy settings in `frontend/package.json`

3. **Images Not Loading**
   - Check image URLs in database
   - Verify internet connection for external images

4. **Authentication Issues**
   - Check JWT_SECRET is set
   - Verify token expiration
   - Clear localStorage if needed

### Debug Mode
Set `NODE_ENV=development` in `.env` for detailed error messages.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Images**: Royalty-free images from Pixabay
- **Icons**: Emoji icons for better visual appeal
- **Design**: Modern UI/UX principles
- **Inspiration**: Popular food delivery apps

## 📞 Support

For support or questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review the API documentation

---

**Happy Coding! 🚀**

Built with ❤️ using React, Node.js, and MySQL
