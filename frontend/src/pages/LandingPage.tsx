import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';
import { ShoppingCart, Package, Users, TrendingUp, ArrowRight } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      {/* Navigation */}
      <Navbar expand="lg" className="navbar-dark position-absolute w-100" style={{ zIndex: 10 }}>
        <Container>
          <Navbar.Brand href="/" className="fw-bold fs-3 text-gradient">
            Business Manager
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/login" className="text-light">
                Sign In
              </Nav.Link>
              <Link to="/register" className="btn btn-primary-gradient ms-2">
                Get Started
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <section className="landing-hero">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={10}>
              <div className="hero-content">
                <h1 className="hero-title">
                  Manage Your Business Efficiently
                </h1>
                <p className="hero-subtitle">
                  Complete business management solution with inventory tracking, order processing, 
                  customer management, and comprehensive analytics to grow your business.
                </p>
                <div className="d-flex gap-3 justify-content-center flex-wrap">
                  <Link to="/register" className="btn-primary-gradient">
                    <ShoppingCart size={20} />
                    Start Managing Today
                  </Link>
                  <Link to="/login" className="btn btn-outline-light btn-modern">
                    Explore Examples
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5" style={{ backgroundColor: 'var(--dark-bg)' }}>
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-5 fw-bold text-gradient mb-3">
                Everything you need to manage your business
              </h2>
              <p className="lead text-muted">
                Comprehensive tools for inventory, orders, customers, and analytics
              </p>
            </Col>
          </Row>
          
          <Row className="g-4">
            <Col md={6} lg={3}>
              <div className="card-modern p-4 text-center h-100">
                <div className="mb-3">
                  <Package size={48} className="text-primary" />
                </div>
                <h5 className="text-light mb-3">Inventory Management</h5>
                <p className="text-muted">
                  Track products, raw materials, stock levels, and manage production orders efficiently.
                </p>
              </div>
            </Col>
            
            <Col md={6} lg={3}>
              <div className="card-modern p-4 text-center h-100">
                <div className="mb-3">
                  <ShoppingCart size={48} className="text-primary" />
                </div>
                <h5 className="text-light mb-3">Order Processing</h5>
                <p className="text-muted">
                  Complete order management from creation to fulfillment with real-time tracking.
                </p>
              </div>
            </Col>
            
            <Col md={6} lg={3}>
              <div className="card-modern p-4 text-center h-100">
                <div className="mb-3">
                  <Users size={48} className="text-primary" />
                </div>
                <h5 className="text-light mb-3">Customer Management</h5>
                <p className="text-muted">
                  Manage customer information, track interactions, and build lasting relationships.
                </p>
              </div>
            </Col>
            
            <Col md={6} lg={3}>
              <div className="card-modern p-4 text-center h-100">
                <div className="mb-3">
                  <TrendingUp size={48} className="text-primary" />
                </div>
                <h5 className="text-light mb-3">Analytics & Reports</h5>
                <p className="text-muted">
                  Comprehensive analytics and reporting to make data-driven business decisions.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Use Cases Section */}
      <section className="py-5" style={{ backgroundColor: 'var(--dark-card)' }}>
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-5 fw-bold text-light mb-3">
                Perfect for any business
              </h2>
              <p className="lead text-muted">
                From small startups to enterprise operations
              </p>
            </Col>
          </Row>
          
          <Row className="g-4">
            <Col md={4}>
              <div className="card-modern p-4">
                <h5 className="text-light mb-3">🏪 Retail Business</h5>
                <p className="text-muted mb-3">
                  Manage products, track inventory, process orders, and analyze sales performance.
                </p>
                <div className="d-flex flex-wrap gap-2">
                  <span className="badge bg-primary">Product Catalog</span>
                  <span className="badge bg-secondary">Sales Tracking</span>
                </div>
              </div>
            </Col>
            
            <Col md={4}>
              <div className="card-modern p-4">
                <h5 className="text-light mb-3">🤖 AI Content</h5>
                <p className="text-muted mb-3">
                  Generate blog posts, social media content, and marketing copy with AI assistance.
                </p>
                <div className="d-flex flex-wrap gap-2">
                  <span className="badge bg-primary">Content Creation</span>
                  <span className="badge bg-secondary">AI Writing</span>
                </div>
              </div>
            </Col>
            
            <Col md={4}>
              <div className="card-modern p-4">
                <h5 className="text-light mb-3">📧 Notifications</h5>
                <p className="text-muted mb-3">
                  Send alerts, emails, and SMS messages based on triggers and conditions.
                </p>
                <div className="d-flex flex-wrap gap-2">
                  <span className="badge bg-primary">Email Alerts</span>
                  <span className="badge bg-secondary">SMS Notifications</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5" style={{ backgroundColor: 'var(--dark-bg)' }}>
        <Container>
          <Row className="text-center">
            <Col lg={8} className="mx-auto">
              <h2 className="display-5 fw-bold text-light mb-3">
                Ready to start building?
              </h2>
              <p className="lead text-muted mb-4">
                Join thousands of makers who are building amazing apps without writing a single line of code.
              </p>
              <Link to="/register" className="btn-primary-gradient btn-lg">
                Get Started for Free
                <ArrowRight size={24} />
              </Link>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="py-4" style={{ backgroundColor: 'var(--dark-card)', borderTop: '1px solid var(--dark-border)' }}>
        <Container>
          <Row>
            <Col md={6}>
              <h5 className="text-gradient">Magic Loops</h5>
              <p className="text-muted">Build apps without coding.</p>
            </Col>
            <Col md={6} className="text-md-end">
              <p className="text-muted mb-0">
                © 2024 Magic Loops. All rights reserved.
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default LandingPage;