import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { UserPlus, User, Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { user, register } = useAuth();

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.passwordConfirmation) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await register(formData.name, formData.email, formData.password, formData.passwordConfirmation);
      toast.success('Account created successfully!');
    } catch (error: any) {
      setError(error.response?.data?.message || 'Registration failed');
      toast.error('Registration failed');
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
              <p className="text-muted">Create your account</p>
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
                      <User size={16} />
                      Full Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-control-modern"
                      placeholder="Enter your full name"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="text-light d-flex align-items-center gap-2">
                      <Mail size={16} />
                      Email Address
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
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
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={8}
                      className="form-control-modern"
                      placeholder="Enter your password"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="text-light d-flex align-items-center gap-2">
                      <Lock size={16} />
                      Confirm Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="passwordConfirmation"
                      value={formData.passwordConfirmation}
                      onChange={handleChange}
                      required
                      minLength={8}
                      className="form-control-modern"
                      placeholder="Confirm your password"
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
                        Creating account...
                      </>
                    ) : (
                      <>
                        <UserPlus size={16} className="me-2" />
                        Create Account
                      </>
                    )}
                  </Button>
                </Form>

                <div className="text-center">
                  <p className="text-muted mb-0">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary text-decoration-none">
                      Sign in
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

export default RegisterPage;