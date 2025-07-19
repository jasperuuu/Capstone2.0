import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container, Badge } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const { getItemCount } = useCart();
  const location = useLocation();
  const cartItemCount = getItemCount();

  const isActive = (path: string) => location.pathname === path;

  return (
    <BootstrapNavbar expand="lg" className="navbar-wood" sticky="top">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className="navbar-brand-wood">
          🪵 Unick Enterprises
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              className={`nav-link-wood ${isActive('/') ? 'active' : ''}`}
            >
              Home
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/products" 
              className={`nav-link-wood ${isActive('/products') ? 'active' : ''}`}
            >
              Products
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/about" 
              className={`nav-link-wood ${isActive('/about') ? 'active' : ''}`}
            >
              About Us
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/contact" 
              className={`nav-link-wood ${isActive('/contact') ? 'active' : ''}`}
            >
              Contact
            </Nav.Link>
          </Nav>
          
          <Nav>
            <Nav.Link 
              as={Link} 
              to="/cart" 
              className={`nav-link-wood position-relative ${isActive('/cart') ? 'active' : ''}`}
            >
              🛒 Cart
              {cartItemCount > 0 && (
                <Badge 
                  pill 
                  className="cart-badge position-absolute"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;