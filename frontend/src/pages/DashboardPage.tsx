import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { dashboardService } from '../services/authService';
import { 
  LayoutDashboard, 
  Zap, 
  Activity, 
  TrendingUp, 
  Clock,
  Play,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

interface DashboardStats {
  total_loops: number;
  active_loops: number;
  total_executions: number;
  success_rate: number;
  credits_used: number;
  credits_limit: number;
  credits_remaining: number;
}

interface RecentLoop {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  execution_count: number;
  updated_at: string;
  executions: Array<{
    status: string;
    created_at: string;
  }>;
}

interface RecentExecution {
  id: number;
  loop_name: string;
  status: string;
  created_at: string;
  execution_time_ms?: number;
}

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentLoops, setRecentLoops] = useState<RecentLoop[]>([]);
  const [recentExecutions, setRecentExecutions] = useState<RecentExecution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await dashboardService.getDashboard();
        setStats(data.stats);
        setRecentLoops(data.recent_loops);
        setRecentExecutions(data.recent_executions);
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
      case 'failed':
        return <AlertCircle size={16} className="text-danger" />;
      case 'running':
        return <Activity size={16} className="text-primary" />;
      default:
        return <Clock size={16} className="text-warning" />;
    }
  };

  const formatDuration = (ms?: number) => {
    if (!ms) return 'N/A';
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    return `${(ms / 60000).toFixed(1)}min`;
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
                Here's what's happening with your Magic Loops
              </p>
            </Col>
          </Row>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="mb-2">
                <Zap size={24} className="text-primary" />
              </div>
              <div className="stat-number">{stats?.total_loops || 0}</div>
              <div className="stat-label">Total Loops</div>
            </div>

            <div className="stat-card">
              <div className="mb-2">
                <Activity size={24} className="text-success" />
              </div>
              <div className="stat-number">{stats?.active_loops || 0}</div>
              <div className="stat-label">Active Loops</div>
            </div>

            <div className="stat-card">
              <div className="mb-2">
                <Play size={24} className="text-info" />
              </div>
              <div className="stat-number">{stats?.total_executions || 0}</div>
              <div className="stat-label">Total Executions</div>
            </div>

            <div className="stat-card">
              <div className="mb-2">
                <TrendingUp size={24} className="text-warning" />
              </div>
              <div className="stat-number">{stats?.success_rate || 0}%</div>
              <div className="stat-label">Success Rate</div>
            </div>
          </div>

          {/* Credits Usage */}
          <Row className="mb-4">
            <Col md={12}>
              <Card className="card-modern">
                <Card.Body>
                  <h5 className="text-light mb-3">Credits Usage</h5>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted">
                      {stats?.credits_used || 0} / {stats?.credits_limit || 0} credits used
                    </span>
                    <span className="text-light fw-bold">
                      {stats?.credits_remaining || 0} remaining
                    </span>
                  </div>
                  <div className="progress" style={{ height: '8px' }}>
                    <div
                      className="progress-bar"
                      style={{
                        width: `${((stats?.credits_used || 0) / (stats?.credits_limit || 1)) * 100}%`,
                        background: 'var(--gradient-primary)',
                      }}
                    />
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
                  <h5 className="text-light mb-3">Recent Loops</h5>
                  {recentLoops.length > 0 ? (
                    <div className="space-y-3">
                      {recentLoops.map((loop) => (
                        <div key={loop.id} className="d-flex justify-content-between align-items-start border-bottom border-secondary pb-3 mb-3">
                          <div className="flex-grow-1">
                            <h6 className="text-light mb-1">{loop.name}</h6>
                            <p className="text-muted small mb-1">
                              {loop.description || 'No description'}
                            </p>
                            <div className="d-flex align-items-center gap-2">
                              <span className={`badge ${loop.is_active ? 'bg-success' : 'bg-secondary'}`}>
                                {loop.is_active ? 'Active' : 'Inactive'}
                              </span>
                              <span className="text-muted small">
                                {loop.execution_count} executions
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted">No loops created yet</p>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>

            <Col lg={6}>
              <Card className="card-modern h-100">
                <Card.Body>
                  <h5 className="text-light mb-3">Recent Executions</h5>
                  {recentExecutions.length > 0 ? (
                    <div className="space-y-3">
                      {recentExecutions.map((execution) => (
                        <div key={execution.id} className="d-flex justify-content-between align-items-center border-bottom border-secondary pb-3 mb-3">
                          <div className="d-flex align-items-center gap-3">
                            {getStatusIcon(execution.status)}
                            <div>
                              <h6 className="text-light mb-0">{execution.loop_name}</h6>
                              <small className="text-muted">
                                {new Date(execution.created_at).toLocaleString()}
                              </small>
                            </div>
                          </div>
                          <div className="text-end">
                            <div className={`badge ${
                              execution.status === 'completed' ? 'bg-success' :
                              execution.status === 'failed' ? 'bg-danger' :
                              execution.status === 'running' ? 'bg-primary' :
                              'bg-warning'
                            }`}>
                              {execution.status}
                            </div>
                            <div className="text-muted small">
                              {formatDuration(execution.execution_time_ms)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted">No executions yet</p>
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