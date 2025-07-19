import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer-wood">
      <Container>
        <Row>
          <Col lg={4} md={6} className="mb-4">
            <h5>🪵 Unick Enterprises</h5>
            <p>
              Crafting premium furniture and woodwork with passion and precision since our founding. 
              Based in Cabuyao City, Laguna, we serve customers throughout the Philippines.
            </p>
            <div className="d-flex gap-3">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="YouTube">📺</a>
            </div>
          </Col>
          
          <Col lg={2} md={6} className="mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </Col>
          
          <Col lg={3} md={6} className="mb-4">
            <h5>Product Categories</h5>
            <ul className="list-unstyled">
              <li><Link to="/products?category=chairs">Chairs</Link></li>
              <li><Link to="/products?category=tables">Tables</Link></li>
              <li><Link to="/products?category=cabinets">Cabinets</Link></li>
              <li><Link to="/products?category=shelves">Shelves</Link></li>
              <li><Link to="/products?category=custom">Custom Work</Link></li>
            </ul>
          </Col>
          
          <Col lg={3} md={6} className="mb-4">
            <h5>Contact Info</h5>
            <ul className="list-unstyled">
              <li>📍 Cabuyao City, Laguna</li>
              <li>📞 +63 912 345 6789</li>
              <li>✉️ info@unickenterprises.com</li>
              <li>🕒 Mon-Sat: 8AM-6PM</li>
            </ul>
          </Col>
        </Row>
        
        <hr style={{ borderColor: 'var(--wood-secondary)' }} />
        
        <Row className="text-center">
          <Col>
            <p className="mb-0">
              &copy; 2024 Unick Enterprises Inc. All rights reserved. | 
              <Link to="/privacy" className="ms-2">Privacy Policy</Link> | 
              <Link to="/terms" className="ms-2">Terms of Service</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;