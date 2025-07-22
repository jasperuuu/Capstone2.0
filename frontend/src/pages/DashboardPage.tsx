import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { dashboardService } from '../services/authService';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Users, 
  Package, 
  DollarSign,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

interface DashboardStats {
  total_orders: number;
  total_customers: number;
  total_products: number;
  total_revenue: number;
  pending_orders: number;
  completed_orders: number;
}

interface RecentOrder {
  id: number;
  order_number: string;
  customer: {
    name: string;
    email: string;
  };
  total_amount: number;
  status: string;
  created_at: string;
}

interface RecentCustomer {
  id: number;
  name: string;
  email: string;
  phone?: string;
  created_at: string;
}

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [recentCustomers, setRecentCustomers] = useState<RecentCustomer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await dashboardService.getDashboard();
        setStats(data.stats);
        setRecentOrders(data.recent_orders);
        setRecentCustomers(data.recent_customers);
      } catch (error) {
        console.error('Failed to fetch dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-container">
        <Sidebar />
        <div className="main-content">
          <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
            <div className="spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} className="text-success" />;
      case 'cancelled':
        return <AlertCircle size={16} className="text-danger" />;
      case 'processing':
        return <Clock size={16} className="text-primary" />;
      default:
        return <Clock size={16} className="text-warning" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      
      <div className="main-content">
        <Container fluid>
          {/* Header */}
          <Row className="mb-4">
            <Col>
              <h1 className="text-light mb-2">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-muted">
                Here's what's happening with your business
              </p>
            </Col>
          </Row>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="mb-2">
                <ShoppingCart size={24} className="text-primary" />
              </div>
              <div className="stat-number">{stats?.total_orders || 0}</div>
              <div className="stat-label">Total Orders</div>
            </div>

            <div className="stat-card">
              <div className="mb-2">
                <Users size={24} className="text-success" />
              </div>
              <div className="stat-number">{stats?.total_customers || 0}</div>
              <div className="stat-label">Customers</div>
            </div>

            <div className="stat-card">
              <div className="mb-2">
                <Package size={24} className="text-info" />
              </div>
              <div className="stat-number">{stats?.total_products || 0}</div>
              <div className="stat-label">Products</div>
            </div>

            <div className="stat-card">
              <div className="mb-2">
                <DollarSign size={24} className="text-warning" />
              </div>
              <div className="stat-number">{formatCurrency(stats?.total_revenue || 0)}</div>
              <div className="stat-label">Total Revenue</div>
            </div>
          </div>

          {/* Order Status */}
          <Row className="mb-4">
            <Col md={6}>
              <Card className="card-modern">
                <Card.Body>
                  <h5 className="text-light mb-3">Order Status</h5>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted">Pending Orders</span>
                    <span className="text-light fw-bold">{stats?.pending_orders || 0}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-muted">Completed Orders</span>
                    <span className="text-light fw-bold">{stats?.completed_orders || 0}</span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="card-modern">
                <Card.Body>
                  <h5 className="text-light mb-3">Quick Actions</h5>
                  <div className="d-flex flex-column gap-2">
                    <button className="btn btn-primary btn-sm">Add New Product</button>
                    <button className="btn btn-secondary btn-sm">View All Orders</button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Recent Activity */}
          <Row>
            <Col lg={6}>
              <Card className="card-modern h-100">
                <Card.Body>
                  <h5 className="text-light mb-3">Recent Orders</h5>
                  {recentOrders.length > 0 ? (
                    <div className="space-y-3">
                      {recentOrders.map((order) => (
                        <div key={order.id} className="d-flex justify-content-between align-items-start border-bottom border-secondary pb-3 mb-3">
                          <div className="flex-grow-1">
                            <h6 className="text-light mb-1">#{order.order_number || order.id}</h6>
                            <p className="text-muted small mb-1">
                              {order.customer.name} - {order.customer.email}
                            </p>
                            <div className="d-flex align-items-center gap-2">
                              {getStatusIcon(order.status)}
                              <span className={`badge ${
                                order.status === 'completed' ? 'bg-success' : 
                                order.status === 'processing' ? 'bg-primary' :
                                order.status === 'cancelled' ? 'bg-danger' : 'bg-secondary'
                              }`}>
                                {order.status}
                              </span>
                              <span className="text-muted small">
                                {formatCurrency(order.total_amount)}
                              </span>
                            </div>
                          </div>
                          <div className="text-end">
                            <small className="text-muted">
                              {new Date(order.created_at).toLocaleDateString()}
                            </small>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted">No orders yet</p>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>

            <Col lg={6}>
              <Card className="card-modern h-100">
                <Card.Body>
                  <h5 className="text-light mb-3">Recent Customers</h5>
                  {recentCustomers.length > 0 ? (
                    <div className="space-y-3">
                      {recentCustomers.map((customer) => (
                        <div key={customer.id} className="d-flex justify-content-between align-items-center border-bottom border-secondary pb-3 mb-3">
                          <div className="d-flex align-items-center gap-3">
                            <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center" style={{width: '32px', height: '32px'}}>
                              <span className="text-white small fw-bold">
                                {customer.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <h6 className="text-light mb-0">{customer.name}</h6>
                              <small className="text-muted">{customer.email}</small>
                            </div>
                          </div>
                          <div className="text-end">
                            <small className="text-muted">
                              {new Date(customer.created_at).toLocaleDateString()}
                            </small>
                            {customer.phone && (
                              <div className="text-muted small">
                                {customer.phone}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted">No customers yet</p>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default DashboardPage;