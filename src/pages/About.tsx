import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const About: React.FC = () => {
  return (
    <Container className="py-4">
      <Row className="mb-5">
        <Col>
          <h1 className="display-4 fw-bold mb-3" style={{ color: 'var(--wood-primary)' }}>
            About Unick Enterprises
          </h1>
          <p className="lead">
            Crafting exceptional furniture with passion, precision, and pride since our founding in Cabuyao City, Laguna.
          </p>
        </Col>
      </Row>

      <Row className="g-4 mb-5">
        <Col lg={6}>
          <Card className="card-wood h-100">
            <Card.Body className="p-4">
              <h3 className="mb-3" style={{ color: 'var(--wood-primary)' }}>Our Story</h3>
              <p>
                Founded with a vision to bring traditional Filipino craftsmanship into the modern era, 
                Unick Enterprises has been serving customers with premium woodcraft furniture and custom pieces. 
                Our workshop in Cabuyao City, Laguna combines time-honored techniques with contemporary design 
                and efficient production methods.
              </p>
              <p>
                What started as a small family business has grown into a trusted name in custom furniture, 
                known for our attention to detail, quality materials, and personalized service.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card className="card-wood h-100">
            <Card.Body className="p-4">
              <h3 className="mb-3" style={{ color: 'var(--wood-primary)' }}>Our Mission</h3>
              <p>
                To create beautiful, functional furniture that enhances our customers' lives while 
                preserving traditional woodworking craftsmanship and promoting sustainable practices.
              </p>
              <h3 className="mb-3 mt-4" style={{ color: 'var(--wood-primary)' }}>Our Values</h3>
              <ul>
                <li><strong>Quality:</strong> Every piece meets our high standards</li>
                <li><strong>Sustainability:</strong> Eco-friendly materials and processes</li>
                <li><strong>Craftsmanship:</strong> Skilled artisans with years of experience</li>
                <li><strong>Innovation:</strong> Modern technology enhancing traditional methods</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="text-center py-5" style={{ backgroundColor: 'var(--wood-light)', borderRadius: '1rem' }}>
        <Col>
          <h3 className="mb-3" style={{ color: 'var(--wood-primary)' }}>
            Why Choose Unick Enterprises?
          </h3>
          <Row className="g-4 mt-3">
            <Col md={3}>
              <div style={{ fontSize: '3rem' }}>🎯</div>
              <h5>Custom Made</h5>
              <p>Tailored to your exact specifications</p>
            </Col>
            <Col md={3}>
              <div style={{ fontSize: '3rem' }}>🌱</div>
              <h5>Sustainable</h5>
              <p>Eco-friendly materials and processes</p>
            </Col>
            <Col md={3}>
              <div style={{ fontSize: '3rem' }}>🚚</div>
              <h5>Real-time Tracking</h5>
              <p>Monitor your order from start to finish</p>
            </Col>
            <Col md={3}>
              <div style={{ fontSize: '3rem' }}>⭐</div>
              <h5>Quality Assured</h5>
              <p>Premium materials and expert craftsmanship</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default About;