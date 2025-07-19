import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const OrderTracking: React.FC = () => {
  return (
    <Container className="py-4">
      <Row>
        <Col>
          <Card className="card-wood">
            <Card.Body className="text-center p-5">
              <h2>Order Tracking</h2>
              <p>This page will show real-time order status and production progress tracking.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderTracking;