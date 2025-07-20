import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Sidebar from '../components/Sidebar';

const LoopsPage: React.FC = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      
      <div className="main-content">
        <Container fluid>
          <Row className="mb-4">
            <Col className="d-flex justify-content-between align-items-center">
              <div>
                <h1 className="text-light mb-2">My Loops</h1>
                <p className="text-muted">Manage and monitor your automation workflows</p>
              </div>
              <Link to="/loops/new" className="btn btn-primary">
                <Plus size={18} className="me-2" />
                Create Loop
              </Link>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className="text-center py-5">
                <h3 className="text-light mb-3">Coming Soon!</h3>
                <p className="text-muted">
                  The loops management interface is being built. 
                  You'll be able to create, edit, and manage your automation workflows here.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default LoopsPage;