# Magic Loops Frontend

React-based frontend for the Magic Loops automation platform.

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Features

- **Authentication**: Login/register with JWT tokens
- **Dashboard**: User statistics and recent activity
- **Loop Management**: Create and manage automation workflows
- **Dark Theme**: Modern dark interface design
- **Responsive**: Mobile-friendly layouts

## Technology Stack

- React 18 with TypeScript
- React Bootstrap for UI components
- React Query for API state management
- React Router for navigation
- Lucide React for icons
- React Hot Toast for notifications

## Project Structure

```
src/
├── components/     # Reusable components
├── contexts/       # React contexts (Auth, etc.)
├── pages/         # Page components
├── services/      # API service functions
└── hooks/         # Custom React hooks
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## Environment Variables

- `REACT_APP_API_URL`: Backend API URL (default: `/api`)
