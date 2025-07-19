import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const ProductDetail: React.FC = () => {
  return (
    <Container className="py-4">
      <Row>
        <Col>
          <Card className="card-wood">
            <Card.Body className="text-center p-5">
              <h2>Product Detail Page</h2>
              <p>This page will show detailed product information, images, and ordering options.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;