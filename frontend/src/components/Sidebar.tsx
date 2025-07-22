import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Users, 
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
      path: '/orders',
      icon: ShoppingCart,
      label: 'Orders',
    },
    {
      path: '/products',
      icon: Package,
      label: 'Products',
    },
    {
      path: '/customers',
      icon: Users,
      label: 'Customers',
    },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <Link to="/dashboard" className="text-decoration-none">
          <h3>Business Manager</h3>
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

        {/* Quick Stats */}
        <div className="mb-3">
          <div className="text-muted small mb-1">Quick Access</div>
          <div className="d-flex justify-content-between text-muted small">
            <span>Active</span>
            <span>Ready</span>
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