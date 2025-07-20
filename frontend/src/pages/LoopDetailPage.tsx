import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';

const LoopDetailPage: React.FC = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      
      <div className="main-content">
        <Container fluid>
          <Row className="mb-4">
            <Col>
              <h1 className="text-light mb-2">Loop Details</h1>
              <p className="text-muted">View execution history and manage your loop</p>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className="text-center py-5">
                <h3 className="text-light mb-3">Loop Details Coming Soon!</h3>
                <p className="text-muted">
                  Detailed loop information, execution history, and management tools are being developed.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default LoopDetailPage;