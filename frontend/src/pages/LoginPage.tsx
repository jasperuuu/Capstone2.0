import React, { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { user, login } = useAuth();
  const location = useLocation();

  // Redirect if already logged in
  if (user) {
    const from = location.state?.from?.pathname || '/dashboard';
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      toast.success('Welcome back!');
    } catch (error: any) {
      setError(error.response?.data?.message || 'Login failed');
      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center" style={{ backgroundColor: 'var(--dark-bg)' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <div className="text-center mb-4">
              <Link to="/" className="text-decoration-none">
                <h2 className="text-gradient fw-bold">Magic Loops</h2>
              </Link>
              <p className="text-muted">Sign in to your account</p>
            </div>

            <Card className="card-modern">
              <Card.Body className="p-4">
                {error && (
                  <Alert variant="danger" className="mb-3">
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-light d-flex align-items-center gap-2">
                      <Mail size={16} />
                      Email Address
                    </Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="form-control-modern"
                      placeholder="Enter your email"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="text-light d-flex align-items-center gap-2">
                      <Lock size={16} />
                      Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="form-control-modern"
                      placeholder="Enter your password"
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    className="btn-primary w-100 mb-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="spinner-border spinner-border-sm me-2" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        <LogIn size={16} className="me-2" />
                        Sign In
                      </>
                    )}
                  </Button>
                </Form>

                <div className="text-center">
                  <p className="text-muted mb-0">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-primary text-decoration-none">
                      Sign up
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;