import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setShowAlert(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setShowAlert(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container className="py-4">
      <Row className="mb-5">
        <Col>
          <h1 className="display-4 fw-bold mb-3" style={{ color: 'var(--wood-primary)' }}>
            Contact Us
          </h1>
          <p className="lead">
            Get in touch with us for custom orders, quotes, or any questions about our products and services.
          </p>
        </Col>
      </Row>

      {showAlert && (
        <Alert variant="success" className="mb-4">
          Thank you for your message! We'll get back to you within 24 hours.
        </Alert>
      )}

      <Row className="g-4">
        <Col lg={8}>
          <Card className="card-wood">
            <Card.Header>
              <h4 className="mb-0">Send us a Message</h4>
            </Card.Header>
            <Card.Body className="p-4">
              <Form onSubmit={handleSubmit}>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Full Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-control-wood"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Email Address *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control-wood"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-control-wood"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Subject *</Form.Label>
                      <Form.Select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="form-control-wood"
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="custom-quote">Custom Quote Request</option>
                        <option value="product-inquiry">Product Inquiry</option>
                        <option value="order-status">Order Status</option>
                        <option value="general">General Question</option>
                        <option value="support">Support</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Form.Group>
                      <Form.Label>Message *</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="form-control-wood"
                        placeholder="Tell us about your project or question..."
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Button type="submit" className="btn-wood-primary" size="lg">
                      Send Message
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="card-wood">
            <Card.Header>
              <h4 className="mb-0">Contact Information</h4>
            </Card.Header>
            <Card.Body className="p-4">
              <div className="mb-4">
                <h6 className="fw-bold">📍 Address</h6>
                <p className="mb-0">
                  Unick Enterprises Inc.<br />
                  Cabuyao City, Laguna<br />
                  Philippines
                </p>
              </div>

              <div className="mb-4">
                <h6 className="fw-bold">📞 Phone</h6>
                <p className="mb-0">
                  <a href="tel:+639123456789">+63 912 345 6789</a>
                </p>
              </div>

              <div className="mb-4">
                <h6 className="fw-bold">✉️ Email</h6>
                <p className="mb-0">
                  <a href="mailto:info@unickenterprises.com">info@unickenterprises.com</a>
                </p>
              </div>

              <div className="mb-4">
                <h6 className="fw-bold">🕒 Business Hours</h6>
                <p className="mb-0">
                  Monday - Saturday: 8:00 AM - 6:00 PM<br />
                  Sunday: Closed
                </p>
              </div>

              <div>
                <h6 className="fw-bold">🌐 Follow Us</h6>
                <div className="d-flex gap-3">
                  <a href="#" aria-label="Facebook">📘</a>
                  <a href="#" aria-label="Instagram">📷</a>
                  <a href="#" aria-label="YouTube">📺</a>
                </div>
              </div>
            </Card.Body>
          </Card>

          <Card className="card-wood mt-4">
            <Card.Body className="p-4 text-center">
              <h5 className="mb-3">Need Immediate Help?</h5>
              <p className="mb-3">
                For urgent inquiries or custom orders, call us directly.
              </p>
              <Button 
                href="tel:+639123456789" 
                className="btn-wood-primary"
                size="lg"
              >
                📞 Call Now
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;