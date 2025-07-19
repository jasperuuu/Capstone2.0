import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Checkout: React.FC = () => {
  return (
    <Container className="py-4">
      <Row>
        <Col>
          <Card className="card-wood">
            <Card.Body className="text-center p-5">
              <h2>Checkout Page</h2>
              <p>This page will handle customer information, shipping details, and payment processing.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;