# 🚀 Magic Loops Backend - Laravel API

The backend API server for the Magic Loops application, built with Laravel 11.x and MySQL.

![Laravel](https://img.shields.io/badge/Laravel-11.x-red.svg)
![PHP](https://img.shields.io/badge/PHP-8.2+-blue.svg)
![MySQL](https://img.shields.io/badge/MySQL-8.x-orange.svg)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Database](#database)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)

## 🌟 Overview

The Magic Loops backend provides a robust RESTful API for managing automation loops, user authentication, and business operations. Built with Laravel's modern architecture and best practices.

### Key Features
- **RESTful API**: 24+ well-designed endpoints
- **Authentication**: Secure user authentication system
- **Database**: MySQL with 22 tables and comprehensive relationships
- **Queue System**: Background job processing
- **CORS**: Configured for frontend integration
- **Validation**: Comprehensive input validation
- **Error Handling**: Structured error responses

## ✨ Features

### Authentication System
- User registration and login
- JWT-based authentication
- Password reset functionality
- User profile management

### Loop Management
- Create, read, update, delete loops
- Execute loops with real-time tracking
- Loop duplication and sharing
- Execution history and analytics

### Business Operations
- Customer management
- Order processing system
- Inventory tracking
- Production planning
- Material management

### System Features
- Health check endpoints
- Dashboard analytics
- Webhook integration
- Queue job processing
- Comprehensive logging

## 🚀 Installation

### Prerequisites
- PHP >= 8.2
- Composer >= 2.0
- MySQL >= 8.0
- Git

### Quick Start
```bash
# Clone repository
git clone <repository-url>
cd backend

# Install dependencies
composer install

# Environment setup
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure database in .env
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=magic_loops
# DB_USERNAME=your_username
# DB_PASSWORD=your_password

# Run migrations
php artisan migrate

# Start development server
php artisan serve --host=0.0.0.0 --port=8000
```

## ⚙️ Configuration

### Environment Variables (.env)
```env
# Application
APP_NAME="Magic Loops API"
APP_ENV=local
APP_KEY=base64:your_generated_key
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

# Mail (optional)
MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025

# Queue (optional)
QUEUE_CONNECTION=sync

# Cache (optional)
CACHE_DRIVER=file
SESSION_DRIVER=file
```

### Database Setup
```sql
-- Create database and user
CREATE DATABASE magic_loops;
CREATE USER 'magic_user'@'localhost' IDENTIFIED BY 'magic_password';
GRANT ALL PRIVILEGES ON magic_loops.* TO 'magic_user'@'localhost';
FLUSH PRIVILEGES;
```

## 📚 API Endpoints

### Authentication
```http
POST   /api/auth/register     # User registration
POST   /api/auth/login        # User login
POST   /api/auth/logout       # User logout
GET    /api/auth/me           # Get current user
```

### Loop Management
```http
GET    /api/loops             # List all loops
POST   /api/loops             # Create new loop
GET    /api/loops/{id}        # Get specific loop
PUT    /api/loops/{id}        # Update loop
DELETE /api/loops/{id}        # Delete loop
POST   /api/loops/{id}/duplicate    # Duplicate loop
POST   /api/loops/{id}/execute      # Execute loop
GET    /api/loops/{id}/executions   # Get execution history
PATCH  /api/loops/{id}/publish      # Publish/unpublish loop
```

### Loop Blocks
```http
GET    /api/loops/{id}/blocks       # Get loop blocks
POST   /api/loops/{id}/blocks       # Create block
PUT    /api/loops/{id}/blocks/{block}    # Update block
DELETE /api/loops/{id}/blocks/{block}    # Delete block
PATCH  /api/loops/{id}/blocks/reorder    # Reorder blocks
GET    /api/blocks/{id}              # Get specific block
POST   /api/blocks/{id}/execute      # Execute block
```

### System
```http
GET    /api/health            # API health check
GET    /api/dashboard         # Dashboard analytics
GET    /api/explore           # Explore public loops
```

### API Response Format
```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Operation successful",
  "meta": {
    "timestamp": "2025-01-01T00:00:00Z",
    "version": "1.0.0"
  }
}
```

### Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The given data was invalid.",
    "details": {
      "field": ["Field is required"]
    }
  },
  "meta": {
    "timestamp": "2025-01-01T00:00:00Z"
  }
}
```

## 🗄️ Database

### Schema Overview (22 Tables)

#### Core Tables
- **users** - User accounts and authentication
- **loops** - Main loop entities
- **loop_blocks** - Individual blocks within loops
- **loop_executions** - Execution history and results

#### Business Tables
- **customers** - Customer management
- **orders** & **order_items** - Order processing
- **products** & **inventories** - Product catalog and stock
- **raw_materials** & **material_usages** - Material tracking
- **production_orders** - Manufacturing orders

#### System Tables
- **sessions** - User sessions
- **jobs** & **failed_jobs** - Queue management
- **cache** & **cache_locks** - Caching system
- **password_reset_tokens** - Password resets
- **migrations** - Database version control

### Key Relationships
```
users (1) -----> (*) loops
loops (1) -----> (*) loop_blocks
loops (1) -----> (*) loop_executions
customers (1) --> (*) orders
orders (1) -----> (*) order_items
products (1) ---> (*) inventories
```

### Migration Commands
```bash
# Run all migrations
php artisan migrate

# Rollback last batch
php artisan migrate:rollback

# Reset all migrations
php artisan migrate:reset

# Check migration status
php artisan migrate:status

# Create new migration
php artisan make:migration create_your_table
```

## 🛠️ Development

### Artisan Commands
```bash
# Generate controllers
php artisan make:controller YourController --resource

# Generate models
php artisan make:model YourModel -m

# Generate requests
php artisan make:request YourRequest

# Generate resources
php artisan make:resource YourResource

# Generate seeders
php artisan make:seeder YourSeeder

# Generate factories
php artisan make:factory YourFactory
```

### Code Structure
```
app/
├── Http/
│   ├── Controllers/        # API Controllers
│   ├── Middleware/         # Custom middleware
│   ├── Requests/          # Form requests
│   └── Resources/         # API resources
├── Models/                # Eloquent models
├── Services/              # Business logic services
└── Exceptions/            # Custom exceptions

database/
├── migrations/            # Database migrations
├── seeders/              # Database seeders
└── factories/            # Model factories

routes/
├── api.php               # API routes
├── web.php               # Web routes
└── console.php           # Console commands
```

### Coding Standards
- Follow PSR-12 coding standards
- Use type hints and return types
- Write comprehensive docblocks
- Implement proper error handling
- Use Laravel's built-in validation

### Best Practices
- Use Eloquent relationships properly
- Implement API resources for responses
- Use form requests for validation
- Follow RESTful API conventions
- Implement proper error handling

## 🧪 Testing

### Running Tests
```bash
# Run all tests
php artisan test

# Run specific test file
php artisan test tests/Feature/LoopTest.php

# Run tests with coverage
php artisan test --coverage

# Generate test
php artisan make:test LoopTest
```

### Test Structure
```
tests/
├── Feature/              # Feature tests (HTTP)
├── Unit/                # Unit tests
└── TestCase.php         # Base test case
```

### Testing Best Practices
- Write tests for all API endpoints
- Test both success and error scenarios
- Use factories for test data
- Mock external services
- Test database relationships

## 🚀 Deployment

### Production Setup
```bash
# Install production dependencies
composer install --optimize-autoloader --no-dev

# Cache configuration
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run migrations
php artisan migrate --force

# Generate application key
php artisan key:generate
```

### Environment Configuration
```env
# Production settings
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-domain.com

# Database
DB_HOST=your-production-host
DB_DATABASE=your-production-db
DB_USERNAME=your-production-user
DB_PASSWORD=your-secure-password

# Cache & Session
CACHE_DRIVER=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis

# Mail
MAIL_MAILER=smtp
MAIL_HOST=your-smtp-host
```

### Server Requirements
- **PHP**: 8.2+ with extensions: BCMath, Ctype, Fileinfo, JSON, Mbstring, OpenSSL, PDO, Tokenizer, XML
- **Web Server**: Apache or Nginx
- **Database**: MySQL 8.0+
- **Memory**: 512MB minimum (1GB recommended)
- **Storage**: SSD recommended

### Security Checklist
- [ ] Set secure `APP_KEY`
- [ ] Configure proper file permissions
- [ ] Enable HTTPS/SSL
- [ ] Configure firewall rules
- [ ] Set up regular backups
- [ ] Enable error logging
- [ ] Configure rate limiting

## 📊 Monitoring

### Logging
```bash
# View logs
tail -f storage/logs/laravel.log

# Clear logs
php artisan log:clear
```

### Performance
```bash
# Enable opcache in production
# Monitor database queries
# Use Redis for caching
# Optimize Composer autoloader
```

### Health Checks
```bash
# API health endpoint
curl http://localhost:8000/api/health

# Database connection
php artisan tinker
>>> DB::connection()->getPdo();
```

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch (`git checkout -b feature/new-feature`)
3. Write tests for new functionality
4. Implement the feature
5. Ensure all tests pass
6. Submit pull request

### Code Review Checklist
- [ ] Code follows PSR-12 standards
- [ ] All tests pass
- [ ] Documentation updated
- [ ] No security vulnerabilities
- [ ] Performance considerations addressed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Laravel Backend for Magic Loops** - Built with ❤️ using Laravel 11.x
