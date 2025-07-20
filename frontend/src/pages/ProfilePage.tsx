import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';

const ProfilePage: React.FC = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      
      <div className="main-content">
        <Container fluid>
          <Row className="mb-4">
            <Col>
              <h1 className="text-light mb-2">Profile Settings</h1>
              <p className="text-muted">Manage your account and preferences</p>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className="text-center py-5">
                <h3 className="text-light mb-3">Profile Settings Coming Soon!</h3>
                <p className="text-muted">
                  Account management, billing, and preferences will be available here.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default ProfilePage;