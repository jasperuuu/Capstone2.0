import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Zap, 
  Plus, 
  Compass, 
  User, 
  LogOut,
  Settings
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const navItems = [
    {
      path: '/dashboard',
      icon: LayoutDashboard,
      label: 'Dashboard',
    },
    {
      path: '/loops',
      icon: Zap,
      label: 'My Loops',
    },
    {
      path: '/loops/new',
      icon: Plus,
      label: 'Create Loop',
    },
    {
      path: '/explore',
      icon: Compass,
      label: 'Explore',
    },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <Link to="/dashboard" className="text-decoration-none">
          <h3>Magic Loops</h3>
        </Link>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.path} className="nav-item">
              <Link
                to={item.path}
                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            </div>
          );
        })}
      </nav>

      <div className="mt-auto p-3">
        {/* User Info */}
        <div className="mb-3">
          <div className="d-flex align-items-center gap-3 p-3 rounded" 
               style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)' }}>
            <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center"
                 style={{ width: '40px', height: '40px' }}>
              <User size={20} className="text-white" />
            </div>
            <div className="flex-grow-1">
              <div className="text-light fw-semibold">{user?.name}</div>
              <div className="text-muted small">{user?.plan} plan</div>
            </div>
          </div>
        </div>

        {/* Credits */}
        <div className="mb-3">
          <div className="text-muted small mb-1">Credits</div>
          <div className="progress" style={{ height: '6px' }}>
            <div
              className="progress-bar"
              style={{
                width: `${user ? ((user.credits_used / user.credits_limit) * 100) : 0}%`,
                background: 'var(--gradient-primary)',
              }}
            />
          </div>
          <div className="text-muted small mt-1">
            {user ? `${user.credits_limit - user.credits_used} remaining` : '0 remaining'}
          </div>
        </div>

        {/* Actions */}
        <div className="nav-item">
          <Link to="/profile" className={`nav-link ${isActive('/profile') ? 'active' : ''}`}>
            <Settings size={18} />
            <span>Settings</span>
          </Link>
        </div>

        <div className="nav-item">
          <button
            onClick={handleLogout}
            className="nav-link w-100 border-0 bg-transparent text-start"
            style={{ color: 'var(--muted-text)' }}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;