# 🪄 Magic Loops - Full-Stack Application

A powerful full-stack web application for creating, managing, and executing automated loops with a modern React frontend and robust Laravel backend.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Laravel](https://img.shields.io/badge/Laravel-11.x-red.svg)
![React](https://img.shields.io/badge/React-19.x-blue.svg)
![MySQL](https://img.shields.io/badge/MySQL-8.x-orange.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

Magic Loops is a comprehensive automation platform that allows users to create, manage, and execute automated workflows. Built with modern technologies, it provides a seamless experience for both developers and end-users.

### Key Components
- **Backend**: Laravel 11.x API with MySQL database
- **Frontend**: React 19.x with TypeScript
- **Database**: MySQL 8.x with comprehensive schema
- **Authentication**: JWT-based authentication system
- **API**: RESTful API with 24+ endpoints

## ✨ Features

### Core Features
- 🔐 **User Authentication** - Secure login/register system
- 🔄 **Loop Management** - Create, edit, and manage automation loops
- 🧩 **Block System** - Modular block-based loop building
- ⚡ **Real-time Execution** - Execute loops and track results
- 📊 **Dashboard** - Comprehensive analytics and monitoring
- 🔍 **Loop Discovery** - Explore and discover public loops
- 👥 **User Profiles** - Personal profile management

### Advanced Features
- 📦 **Inventory Management** - Product and stock tracking
- 🛒 **Order Processing** - Complete order management system
- 🏭 **Production Planning** - Manufacturing order tracking
- 📈 **Analytics** - Detailed execution analytics
- 🔗 **Webhooks** - External system integration
- 🔄 **Loop Duplication** - Clone existing loops
- 📋 **Execution History** - Complete audit trail

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│  React Frontend │◄──►│  Laravel API    │◄──►│  MySQL Database │
│  (Port 3000)    │    │  (Port 8000)    │    │                 │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Technology Stack

#### Backend (Laravel)
- **Framework**: Laravel 11.x
- **Database**: MySQL 8.x
- **Authentication**: Laravel Sanctum
- **API**: RESTful API design
- **ORM**: Eloquent ORM
- **Queue**: Laravel Queue system

#### Frontend (React)
- **Framework**: React 19.x
- **Language**: TypeScript 5.x
- **Routing**: React Router
- **State Management**: Context API
- **UI Components**: Custom components
- **Build Tool**: Create React App

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **PHP** >= 8.2
- **Composer** >= 2.0
- **Node.js** >= 18.0
- **npm** >= 9.0
- **MySQL** >= 8.0
- **Git**

### System Requirements
- **OS**: Linux, macOS, or Windows
- **RAM**: Minimum 4GB (8GB recommended)
- **Storage**: At least 2GB free space

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd magic-loops
```

### 2. Backend Setup (Laravel)
```bash
# Navigate to backend directory
cd backend

# Install PHP dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure database in .env file
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=magic_loops
# DB_USERNAME=your_username
# DB_PASSWORD=your_password

# Run database migrations
php artisan migrate

# Start Laravel development server
php artisan serve --host=0.0.0.0 --port=8000
```

### 3. Frontend Setup (React)
```bash
# Navigate to frontend directory
cd ../frontend

# Install Node.js dependencies
npm install

# Create environment file
echo "REACT_APP_API_URL=http://localhost:8000/api" > .env

# Start React development server
npm start
```

### 4. Database Setup
```bash
# Create MySQL database
mysql -u root -p
CREATE DATABASE magic_loops;
CREATE USER 'magic_user'@'localhost' IDENTIFIED BY 'magic_password';
GRANT ALL PRIVILEGES ON magic_loops.* TO 'magic_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

## ⚙️ Configuration

### Backend Configuration (.env)
```env
# Application
APP_NAME="Magic Loops"
APP_ENV=local
APP_KEY=base64:your_app_key
APP_DEBUG=true
APP_URL=http://localhost:8000

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=magic_loops
DB_USERNAME=magic_user
DB_PASSWORD=magic_password

# CORS
FRONTEND_URL=http://localhost:3000
```

### Frontend Configuration (.env)
```env
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_APP_NAME=Magic Loops
REACT_APP_VERSION=1.0.0
```

## 🎯 Usage

### Starting the Application

1. **Start Backend Server**:
```bash
cd backend
php artisan serve --host=0.0.0.0 --port=8000
```

2. **Start Frontend Server**:
```bash
cd frontend
npm start
```

3. **Access the Application**:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api
- API Health Check: http://localhost:8000/api/health

### Basic Workflow

1. **Register/Login** - Create an account or login
2. **Dashboard** - View your loops and analytics
3. **Create Loop** - Build automation workflows
4. **Add Blocks** - Configure loop components
5. **Execute** - Run your loops and monitor results
6. **Analyze** - Review execution history and performance

## 📚 API Documentation

### Authentication Endpoints
```
POST /api/auth/register    - User registration
POST /api/auth/login       - User login
POST /api/auth/logout      - User logout
GET  /api/auth/me          - Get current user
```

### Loop Management
```
GET    /api/loops           - List all loops
POST   /api/loops           - Create new loop
GET    /api/loops/{id}      - Get specific loop
PUT    /api/loops/{id}      - Update loop
DELETE /api/loops/{id}      - Delete loop
POST   /api/loops/{id}/execute   - Execute loop
GET    /api/loops/{id}/executions - Execution history
```

### System Endpoints
```
GET /api/health      - API health check
GET /api/dashboard   - Dashboard data
GET /api/explore     - Explore public loops
```

For complete API documentation, visit: http://localhost:8000/api/docs

## 🗄️ Database Schema

The application uses 22 MySQL tables:

### Core Tables
- `users` - User authentication and profiles
- `loops` - Main loop entities
- `loop_blocks` - Individual loop components
- `loop_executions` - Execution history and logs

### Business Logic Tables
- `customers` - Customer management
- `orders` & `order_items` - Order processing
- `products` & `inventories` - Product catalog and stock
- `raw_materials` & `material_usages` - Material management
- `production_orders` - Manufacturing planning

### System Tables
- `sessions` - User session management
- `jobs` & `failed_jobs` - Queue management
- `cache` & `cache_locks` - Caching system
- `migrations` - Database version control

## 🛠️ Development

### Backend Development
```bash
cd backend

# Run tests
php artisan test

# Generate new controller
php artisan make:controller YourController

# Create new migration
php artisan make:migration create_your_table

# Clear cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear
```

### Frontend Development
```bash
cd frontend

# Run tests
npm test

# Build for production
npm run build

# Lint code
npm run lint

# Type check
npm run type-check
```

### Code Style
- **Backend**: Follow PSR-12 coding standards
- **Frontend**: Use ESLint and Prettier configurations
- **Database**: Use descriptive table and column names
- **API**: Follow RESTful conventions

## 🚀 Deployment

### Production Build

1. **Backend Production Setup**:
```bash
cd backend
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

2. **Frontend Production Build**:
```bash
cd frontend
npm run build
```

### Environment Variables
Update production environment variables:
- Set `APP_ENV=production`
- Set `APP_DEBUG=false`
- Configure production database credentials
- Set secure `APP_KEY`
- Configure production URLs

### Server Requirements
- **Web Server**: Nginx or Apache
- **PHP**: 8.2+ with required extensions
- **Database**: MySQL 8.0+
- **SSL**: HTTPS certificate recommended

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Write tests for new features
- Follow existing code style
- Update documentation
- Ensure all tests pass

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Getting Help
- **Documentation**: Check this README and inline code comments
- **Issues**: Create a GitHub issue for bugs or feature requests
- **Community**: Join our community discussions

### Common Issues
1. **Database Connection**: Ensure MySQL is running and credentials are correct
2. **CORS Errors**: Check FRONTEND_URL in backend .env file
3. **Port Conflicts**: Ensure ports 3000 and 8000 are available
4. **Dependencies**: Run `composer install` and `npm install` after pulling updates

## 🙏 Acknowledgments

- Laravel Framework Team
- React Development Team
- All contributors and community members

---

**Made with ❤️ by the Magic Loops Team**

For more information, visit our [documentation](docs/) or contact us at support@magicloops.com
