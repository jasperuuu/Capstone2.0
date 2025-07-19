import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Product } from '../context/CartContext';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock featured products data
    // In a real app, this would fetch from the API
    const mockProducts: Product[] = [
      {
        id: 1,
        name: "Handcrafted Oak Dining Table",
        price: 1299.99,
        sku: "OAK-TABLE-001",
        category: "tables",
        images: []
      },
      {
        id: 2,
        name: "Mahogany Executive Chair",
        price: 899.99,
        sku: "MAH-CHAIR-001",
        category: "chairs",
        images: []
      },
      {
        id: 3,
        name: "Pine Storage Cabinet",
        price: 649.99,
        sku: "PINE-CAB-001",
        category: "cabinets",
        images: []
      }
    ];

    setTimeout(() => {
      setFeaturedProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <div className="hero-content">
            <h1 className="hero-title">
              Handcrafted Woodwork Excellence
            </h1>
            <p className="hero-subtitle">
              Premium furniture and woodcraft pieces made with passion and precision in Cabuyao City, Laguna
            </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Button 
                as={Link} 
                to="/products" 
                className="btn-wood-primary"
                size="lg"
              >
                Shop Our Collection
              </Button>
              <Button 
                as={Link} 
                to="/about" 
                variant="outline-light"
                size="lg"
              >
                Learn Our Story
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <Container className="py-5">
        <Row className="text-center mb-5">
          <Col>
            <h2 className="display-5 fw-bold mb-3" style={{ color: 'var(--wood-primary)' }}>
              Why Choose Unick Enterprises?
            </h2>
            <p className="lead text-muted">
              Combining traditional craftsmanship with modern efficiency
            </p>
          </Col>
        </Row>

        <Row className="g-4 mb-5">
          <Col md={4}>
            <Card className="card-wood h-100 text-center border-0">
              <Card.Body className="p-4">
                <div className="mb-3" style={{ fontSize: '3rem' }}>🎯</div>
                <Card.Title className="h4">Custom Made</Card.Title>
                <Card.Text>
                  Every piece is crafted to your exact specifications with attention to detail and quality.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="card-wood h-100 text-center border-0">
              <Card.Body className="p-4">
                <div className="mb-3" style={{ fontSize: '3rem' }}>🌱</div>
                <Card.Title className="h4">Sustainable Materials</Card.Title>
                <Card.Text>
                  We source our wood from sustainable forests and use eco-friendly finishes and processes.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="card-wood h-100 text-center border-0">
              <Card.Body className="p-4">
                <div className="mb-3" style={{ fontSize: '3rem' }}>🚚</div>
                <Card.Title className="h4">Real-time Tracking</Card.Title>
                <Card.Text>
                  Track your order from production to delivery with our advanced tracking system.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Featured Products */}
      <Container className="py-5">
        <Row className="text-center mb-5">
          <Col>
            <h2 className="display-5 fw-bold mb-3" style={{ color: 'var(--wood-primary)' }}>
              Featured Products
            </h2>
            <p className="lead text-muted">
              Discover our most popular handcrafted pieces
            </p>
          </Col>
        </Row>

        {loading ? (
          <Row className="justify-content-center">
            <Col xs="auto">
              <div className="spinner-wood"></div>
            </Col>
          </Row>
        ) : (
          <Row className="g-4 mb-4">
            {featuredProducts.map((product) => (
              <Col key={product.id} lg={4} md={6}>
                <Card className="product-card border-0">
                  <div 
                    className="product-image d-flex align-items-center justify-content-center"
                    style={{ backgroundColor: 'var(--wood-light)' }}
                  >
                    <span style={{ fontSize: '4rem', opacity: 0.5 }}>🪑</span>
                  </div>
                  <Card.Body className="product-info">
                    <span className="product-category text-capitalize">
                      {product.category}
                    </span>
                    <Card.Title className="product-title">
                      {product.name}
                    </Card.Title>
                    <div className="product-price">
                      ₱{product.price.toLocaleString()}
                    </div>
                    <Button 
                      as={Link}
                      to={`/products/${product.id}`}
                      className="btn-wood-primary w-100"
                    >
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        <Row className="text-center">
          <Col>
            <Button 
              as={Link} 
              to="/products" 
              className="btn-wood-secondary"
              size="lg"
            >
              View All Products
            </Button>
          </Col>
        </Row>
      </Container>

      {/* Call to Action */}
      <section style={{ backgroundColor: 'var(--wood-light)' }} className="py-5">
        <Container>
          <Row className="text-center">
            <Col>
              <h3 className="display-6 fw-bold mb-3" style={{ color: 'var(--wood-primary)' }}>
                Ready to Create Your Dream Furniture?
              </h3>
              <p className="lead mb-4">
                Get in touch with us for custom orders and consultations
              </p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <Button 
                  as={Link} 
                  to="/contact" 
                  className="btn-wood-primary"
                  size="lg"
                >
                  Get a Quote
                </Button>
                <Button 
                  href="tel:+639123456789" 
                  variant="outline-dark"
                  size="lg"
                >
                  📞 Call Us Now
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;