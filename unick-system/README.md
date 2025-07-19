# Unick Enterprises - Order Processing & Inventory Management System

A comprehensive web-based order processing management system, inventory and production tracking system specifically tailored for Unick Enterprises Inc in Cabuyao City, Laguna.

## 🎯 Project Overview

This system addresses existing challenges by enhancing the tracking of daily woodcraft production, monitoring product inventory and raw materials, managing order fulfillment effectively, and improving customer engagement through an integrated ordering website.

## 🏗️ System Architecture

### Backend (Laravel API)
- **Framework**: Laravel 12.x
- **Database**: SQLite (for development)
- **Authentication**: Laravel Sanctum
- **API Documentation**: RESTful API endpoints

### Frontend (React Application)
- **Framework**: React 18 with TypeScript
- **UI Library**: React Bootstrap
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Styling**: Custom CSS with wood-themed design

## 🚀 Features

### 1. Inventory Management System
- ✅ Efficiently manage and monitor inventory for finished products and raw materials
- ✅ Real-time tracking of stock levels to prevent shortages or overstocking
- ✅ Predictive analytics for material usage and inventory replenishment needs
- ✅ Automated reports on stock levels, material usage trends, and replenishment schedules

### 2. Production Tracking System
- ✅ Real-time tracking of daily production outputs for woodcraft products
- ✅ Detailed monitoring of each product's manufacturing process
- ✅ Resource allocation optimization for improved production efficiency
- ✅ Automated reports on production performance and work progress

### 3. Integrated Ordering & Processing Management
- ✅ User-friendly online platform for placing orders
- ✅ Real-time order tracking for customers
- ✅ Automated order fulfillment to streamline logistics
- ✅ Comprehensive customer engagement through automated notifications

### 4. Material Requirements Planning (MRP)
- ✅ MRP-based inventory control
- ✅ Bill of Materials (BOM) management
- ✅ Material usage tracking
- ✅ Purchase suggestions and forecasting

## 📁 Project Structure

```
unick-system/
├── backend/                 # Laravel API
│   ├── app/
│   │   ├── Http/Controllers/API/
│   │   ├── Models/
│   │   └── ...
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── routes/
│   │   └── api.php
│   └── ...
├── frontend/               # React Application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   └── types/
│   ├── public/
│   └── ...
└── README.md
```

## 🗄️ Database Schema

### Core Tables
- **customers** - Customer information and contact details
- **products** - Woodcraft product catalog
- **raw_materials** - Materials used in production
- **orders** - Customer orders and order management
- **order_items** - Individual items within orders
- **production_orders** - Production scheduling and tracking
- **inventories** - Finished product inventory levels
- **product_materials** - Bill of Materials (BOM)
- **material_usages** - Material consumption tracking
- **stock_movements** - All inventory transactions

## 🛠️ Installation & Setup

### Prerequisites
- PHP 8.1+
- Composer
- Node.js 16+
- NPM

### Backend Setup (Laravel)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

### Frontend Setup (React)
```bash
cd frontend
npm install
npm start
```

## 🎨 Design Features

### Wood-Themed UI
- Custom CSS variables for consistent wood-inspired color palette
- Responsive design with Bootstrap components
- Beautiful animations and hover effects
- Professional typography with serif fonts

### Color Palette
- Primary: `#8B4513` (Saddle Brown)
- Secondary: `#D2B48C` (Tan)
- Accent: `#CD853F` (Peru)
- Background: `#FFF8DC` (Cornsilk)

## 📱 Responsive Design

The system is fully responsive and works seamlessly across:
- Desktop computers
- Tablets
- Mobile phones

## 🔐 Security Features

- Laravel Sanctum for API authentication
- Input validation and sanitization
- CSRF protection
- SQL injection prevention
- XSS protection

## 📊 Reporting & Analytics

### Available Reports
- Sales reports with date ranges
- Production performance analytics
- Inventory level reports
- Material usage analysis
- Customer order history

### MRP Features
- Material requirements calculation
- Demand forecasting
- Purchase order suggestions
- Lead time management

## 🚀 API Endpoints

### Public Endpoints
- `GET /api/public/products` - Browse products
- `POST /api/public/orders` - Place orders
- `GET /api/public/orders/{orderNumber}/track` - Track orders

### Protected Endpoints (Admin)
- `GET /api/products` - Manage products
- `GET /api/orders` - Order management
- `GET /api/inventory` - Inventory control
- `GET /api/production` - Production tracking
- `GET /api/reports/*` - Various reports

## 🎯 Target Users

### Customers
- Browse product catalog
- Place custom orders
- Track order progress
- Contact for quotes

### Admin/Staff
- Manage inventory
- Track production
- Process orders
- Generate reports

## 🌟 Key Benefits

1. **Improved Efficiency** - Automated tracking and reporting
2. **Better Customer Experience** - Real-time order tracking
3. **Inventory Optimization** - Prevent stockouts and overstocking
4. **Production Visibility** - Monitor manufacturing progress
5. **Data-Driven Decisions** - Comprehensive analytics and reports

## 🔄 Future Enhancements

- Mobile app for production floor
- Integration with accounting systems
- Advanced analytics dashboard
- Supplier portal integration
- Quality control tracking
- Barcode/QR code scanning

## 📞 Support

For technical support or questions about this system, please contact:
- Email: support@unickenterprises.com
- Phone: +63 912 345 6789

## 📄 License

This project is proprietary software developed specifically for Unick Enterprises Inc.

---

**Developed with ❤️ for Unick Enterprises Inc.**
*Crafting Digital Solutions for Traditional Craftsmanship*