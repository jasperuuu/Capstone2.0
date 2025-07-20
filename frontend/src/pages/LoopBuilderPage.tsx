import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';

const LoopBuilderPage: React.FC = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      
      <div className="main-content">
        <Container fluid>
          <Row className="mb-4">
            <Col>
              <h1 className="text-light mb-2">Loop Builder</h1>
              <p className="text-muted">Create powerful automation workflows with drag-and-drop</p>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className="text-center py-5">
                <h3 className="text-light mb-3">Visual Loop Builder Coming Soon!</h3>
                <p className="text-muted">
                  The drag-and-drop loop builder is under development. 
                  You'll be able to create complex workflows by connecting AI blocks, code blocks, and integrations.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default LoopBuilderPage;