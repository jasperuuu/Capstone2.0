# Magic Loops - AI-Powered Automation Platform

A comprehensive no-code automation platform inspired by Magic Loops, built with Laravel (PHP) backend and React (TypeScript) frontend. Create powerful automation workflows by combining AI blocks, code blocks, and integrations.

## 🚀 Features

### Core Platform
- **No-Code Automation**: Create complex workflows without writing code
- **AI-Powered Blocks**: Integrate with GPT, Claude, and other LLMs
- **Code Blocks**: Write custom JavaScript for advanced logic
- **Multiple Triggers**: Webhook, email, schedule, and manual execution
- **Visual Builder**: Drag-and-drop interface for building workflows
- **Real-time Execution**: Monitor loop execution with detailed logs

### User Management
- **Authentication**: Secure user registration and login
- **Plan Management**: Free, Pro, and Enterprise tiers
- **Credit System**: Usage-based billing and limits
- **Dashboard**: Comprehensive analytics and monitoring

### Workflow Management
- **Loop Creation**: Visual workflow builder
- **Block Types**: AI, Code, HTTP, Email, SMS, Conditional, and more
- **Execution History**: Detailed logs and performance metrics
- **Loop Sharing**: Publish and discover community loops
- **Templates**: Pre-built loops for common use cases

## 🏗️ Architecture

### Backend (Laravel API)
- **Framework**: Laravel 11.x with PHP 8.2+
- **Database**: SQLite (development) / PostgreSQL (production)
- **Authentication**: Laravel Sanctum
- **Queue System**: Redis-backed job processing
- **AI Integration**: OpenAI API client
- **Webhooks**: Secure webhook handling

### Frontend (React Application)
- **Framework**: React 18 with TypeScript
- **UI Library**: React Bootstrap with custom styling
- **State Management**: React Query + Context API
- **Routing**: React Router DOM
- **Styling**: Custom CSS with dark theme
- **Icons**: Lucide React

## 📁 Project Structure

```
magic-loops/
├── backend/                 # Laravel API backend
│   ├── app/
│   │   ├── Models/         # Eloquent models
│   │   ├── Http/Controllers/ # API controllers
│   │   ├── Services/       # Business logic services
│   │   └── Policies/       # Authorization policies
│   ├── database/
│   │   ├── migrations/     # Database migrations
│   │   └── seeders/        # Database seeders
│   └── routes/
│       └── api.php         # API routes
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts
│   │   ├── services/      # API services
│   │   └── hooks/         # Custom hooks
│   └── public/            # Static assets
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- PHP 8.2 or higher
- Composer
- Node.js 18+ and npm/yarn
- MySql
  

### Backend Setup

1. **Install Dependencies**
   ```bash
   cd backend
   composer install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

3. **Database Setup**
   ```bash
   touch database/database.sqlite
   php artisan migrate
   php artisan db:seed
   ```

4. **Start Development Server**
   ```bash
   php artisan serve
   # Server runs on http://localhost:8000
   ```

### Frontend Setup

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   # Application runs on http://localhost:3000
   ```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
APP_NAME="Magic Loops"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_DATABASE=(its up to you repa)

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key
OPENAI_ORGANIZATION=your_openai_org

# Magic Loops Configuration
LOOPS_MAX_EXECUTION_TIME=300
LOOPS_DEFAULT_TIMEOUT=30
```

#### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:8000/api
```

## 🚀 Deployment

### Backend Deployment
1. Set up production environment
2. Configure database (PostgreSQL recommended)
3. Set up Redis for queues
4. Configure web server (Nginx/Apache)
5. Set up SSL certificates
6. Configure queue workers

### Frontend Deployment
1. Build production assets: `npm run build`
2. Deploy to CDN or static hosting
3. Configure API URL for production

## 📊 Database Schema

### Core Tables
- **users**: User accounts and authentication
- **loops**: Automation workflows
- **loop_blocks**: Individual workflow blocks
- **loop_executions**: Execution history and logs

### Key Relationships
- User has many Loops
- Loop has many Blocks (ordered)
- Loop has many Executions
- Execution belongs to Loop and User

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Loops Management
- `GET /api/loops` - List user's loops
- `POST /api/loops` - Create new loop
- `GET /api/loops/{id}` - Get loop details
- `PUT /api/loops/{id}` - Update loop
- `DELETE /api/loops/{id}` - Delete loop
- `POST /api/loops/{id}/execute` - Execute loop

### Dashboard
- `GET /api/dashboard` - Dashboard statistics

## 🧩 Block Types

### Available Blocks
1. **AI Blocks**: GPT, Claude, custom LLM integration
2. **Code Blocks**: Custom JavaScript execution
3. **HTTP Blocks**: REST API calls
4. **Email Blocks**: Send emails via SMTP
5. **SMS Blocks**: Send SMS messages
6. **Webhook Blocks**: Trigger external webhooks
7. **Conditional Blocks**: If/else logic
8. **Loop Blocks**: Iterate over data
9. **Delay Blocks**: Wait/pause execution
10. **Data Transform**: Manipulate data

## 🎨 UI/UX Features

### Design System
- **Dark Theme**: Modern dark interface
- **Responsive Design**: Mobile-friendly layouts
- **Gradient Accents**: Purple/blue gradient branding
- **Interactive Elements**: Hover effects and animations
- **Loading States**: Spinners and skeleton screens

### User Experience
- **Intuitive Navigation**: Sidebar with clear sections
- **Dashboard Analytics**: Visual stats and charts
- **Real-time Updates**: Live execution monitoring
- **Error Handling**: User-friendly error messages
- **Toast Notifications**: Success/error feedback

## 🔒 Security Features

- **Authentication**: JWT-based API authentication
- **Authorization**: Role-based access control
- **Input Validation**: Server-side validation
- **Rate Limiting**: API rate limiting
- **CORS Configuration**: Secure cross-origin requests
- **SQL Injection Prevention**: Eloquent ORM protection

## 📈 Monitoring & Analytics

- **Execution Tracking**: Detailed execution logs
- **Performance Metrics**: Response times and success rates
- **User Analytics**: Usage patterns and statistics
- **Error Monitoring**: Comprehensive error tracking
- **Credit Usage**: Real-time credit consumption

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License. See LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review existing issues and discussions

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Basic authentication and user management
- ✅ Loop creation and management interface
- ✅ Dashboard with analytics
- ✅ Basic block types (AI, Code, HTTP)

### Phase 2 (Next)
- 🔄 Visual drag-and-drop builder
- 🔄 Advanced block types
- 🔄 Real-time execution monitoring
- 🔄 Loop templates and marketplace

### Phase 3 (Future)
- ⏳ Advanced AI integrations
- ⏳ Enterprise features
- ⏳ Mobile application
- ⏳ Advanced analytics and reporting

---

**Magic Loops** - Build apps without coding. Create powerful automation workflows with the power of AI.
