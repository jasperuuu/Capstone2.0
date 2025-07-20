# Magic Loops Backend

Laravel-based API backend for the Magic Loops automation platform.

## Setup

1. **Install Dependencies**
   ```bash
   composer install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

3. **Database Setup**
   ```bash
   touch database/database.sqlite
   php artisan migrate
   ```

4. **Start Server**
   ```bash
   php artisan serve
   ```

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user info

### Loop Management Endpoints
- `GET /api/loops` - List user's loops
- `POST /api/loops` - Create new loop
- `GET /api/loops/{id}` - Get loop details
- `PUT /api/loops/{id}` - Update loop
- `DELETE /api/loops/{id}` - Delete loop
- `POST /api/loops/{id}/execute` - Execute loop

### Dashboard Endpoints
- `GET /api/dashboard` - Get dashboard statistics

## Models

- **User**: User accounts with authentication
- **Loop**: Automation workflows
- **LoopBlock**: Individual workflow blocks
- **LoopExecution**: Execution history and logs

## Services

- **LoopExecutionService**: Handles loop execution logic
- **AuthService**: Authentication and user management

## Configuration

Key environment variables:
- `OPENAI_API_KEY`: OpenAI API key for AI blocks
- `LOOPS_MAX_EXECUTION_TIME`: Maximum execution time (seconds)
- `LOOPS_DEFAULT_TIMEOUT`: Default timeout for blocks
