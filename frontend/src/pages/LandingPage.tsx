import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';
import { Play, Zap, Code, Bot, ArrowRight } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      {/* Navigation */}
      <Navbar expand="lg" className="navbar-dark position-absolute w-100" style={{ zIndex: 10 }}>
        <Container>
          <Navbar.Brand href="/" className="fw-bold fs-3 text-gradient">
            Magic Loops
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/explore" className="text-light">
                Explore
              </Nav.Link>
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
                  Build Apps without coding
                </h1>
                <p className="hero-subtitle">
                  The no-code, all-code platform that builds professional AI-native apps in minutes, not months. 
                  Combine LLMs and code to create powerful automation workflows.
                </p>
                <div className="d-flex gap-3 justify-content-center flex-wrap">
                  <Link to="/register" className="btn-primary-gradient">
                    <Play size={20} />
                    Create Your First Loop
                  </Link>
                  <Link to="/explore" className="btn btn-outline-light btn-modern">
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
                Easily build amazingly intelligent Apps
              </h2>
              <p className="lead text-muted">
                Learn how you can create fun and professional Apps with the power of AI
              </p>
            </Col>
          </Row>
          
          <Row className="g-4">
            <Col md={6} lg={3}>
              <div className="card-modern p-4 text-center h-100">
                <div className="mb-3">
                  <Bot size={48} className="text-primary" />
                </div>
                <h5 className="text-light mb-3">AI-Powered Blocks</h5>
                <p className="text-muted">
                  Use GPT, Claude, and other LLMs to process data, generate content, and make intelligent decisions.
                </p>
              </div>
            </Col>
            
            <Col md={6} lg={3}>
              <div className="card-modern p-4 text-center h-100">
                <div className="mb-3">
                  <Code size={48} className="text-primary" />
                </div>
                <h5 className="text-light mb-3">Code Blocks</h5>
                <p className="text-muted">
                  Write custom JavaScript code for complex logic, data transformation, and API integrations.
                </p>
              </div>
            </Col>
            
            <Col md={6} lg={3}>
              <div className="card-modern p-4 text-center h-100">
                <div className="mb-3">
                  <Zap size={48} className="text-primary" />
                </div>
                <h5 className="text-light mb-3">Instant Triggers</h5>
                <p className="text-muted">
                  Trigger your loops via webhooks, email, schedule, or manual execution.
                </p>
              </div>
            </Col>
            
            <Col md={6} lg={3}>
              <div className="card-modern p-4 text-center h-100">
                <div className="mb-3">
                  <Play size={48} className="text-primary" />
                </div>
                <h5 className="text-light mb-3">Easy Automation</h5>
                <p className="text-muted">
                  Simply describe your task and we'll generate a loop that handles your workflow.
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
                What are people building?
              </h2>
              <p className="lead text-muted">
                From simple automations to complex workflows
              </p>
            </Col>
          </Row>
          
          <Row className="g-4">
            <Col md={4}>
              <div className="card-modern p-4">
                <h5 className="text-light mb-3">📊 Data Processing</h5>
                <p className="text-muted mb-3">
                  Automatically process CSV files, generate reports, and sync data between systems.
                </p>
                <div className="d-flex flex-wrap gap-2">
                  <span className="badge bg-primary">CSV Processing</span>
                  <span className="badge bg-secondary">Report Generation</span>
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