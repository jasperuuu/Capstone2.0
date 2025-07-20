import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const ExplorePage: React.FC = () => {
  return (
    <div className="min-vh-100" style={{ backgroundColor: 'var(--dark-bg)' }}>
      <Container className="py-5">
        <Row className="mb-4">
          <Col>
            <h1 className="text-light mb-2">Explore Public Loops</h1>
            <p className="text-muted">Discover amazing automation workflows created by the community</p>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="text-center py-5">
              <h3 className="text-light mb-3">Public Loop Gallery Coming Soon!</h3>
              <p className="text-muted">
                Browse and discover loops created by the community. 
                Find inspiration for your own automation projects.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ExplorePage;