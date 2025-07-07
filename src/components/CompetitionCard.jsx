import React from 'react';
import { Card, Badge, Button, Dropdown, Row, Col, Form, Alert } from 'react-bootstrap';
import { categories } from '../data/categories';
import { getCategoryVariant, formatDate, formatTime } from '../utils/helpers';


const CompetitionCard = ({ competition, isRegistered, onRegister, onUnregister, onEdit, onDelete, showActions }) => (
    <Card style={{ backgroundColor: "#FFF8EF", borderRadius: "1.5rem" }} className="shadow-sm p-4">

 
    <Card.Body>
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div>
          <Card.Title className="text-primary">{competition.title}</Card.Title>
          <div className="text-muted small">
            <i className="bi bi-building me-1"></i>
            {competition.organizer}
          </div>
          <div className="d-flex align-items-center gap-2 mt-2">
            <Badge bg={getCategoryVariant(competition.category)}>
              {categories.find(c => c.value === competition.category)?.label}
            </Badge>
            <Badge bg={competition.status === 'upcoming' ? 'success' : 'secondary'}>
              {competition.status === 'upcoming' ? 'Upcoming' : 'Completed'}
            </Badge>
          </div>
        </div>

        {showActions && (
          <Dropdown align="end">
            <Dropdown.Toggle variant="outline-secondary" size="sm">
              <i className="bi bi-three-dots"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => onEdit(competition)}>Edit</Dropdown.Item>
              <Dropdown.Item onClick={() => onDelete(competition.id)} className="text-danger">Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>

      <Row className="mb-3 text-muted small">
        <Col md={6}><i className="bi bi-calendar-event me-2 text-primary"></i>{formatDate(competition.date)}</Col>
        <Col md={6}><i className="bi bi-clock me-2 text-primary"></i>{formatTime(competition.time)}</Col>
        <Col md={6}><i className="bi bi-geo-alt me-2 text-primary"></i>{competition.venue}</Col>
        <Col md={6}><i className="bi bi-people me-2 text-primary"></i>{competition.registeredTeams}/{competition.maxTeams || 'Unlimited'} teams</Col>
      </Row>

      {competition.prizes && (
        <Alert variant="light" className="py-2 mb-3">
          <i className="bi bi-trophy text-warning me-2"></i>
          <strong>Prize:</strong> {competition.prizes}
        </Alert>
      )}

      <Card.Text className="text-muted">{competition.description}</Card.Text>

      <div className="border-top pt-3 mt-3">
        <Row className="align-items-center">
          <Col md={8}>
            <small className="text-muted">
              <i className="bi bi-clock-history me-1"></i>
              Registration ends: {formatDate(competition.registrationDeadline)}
            </small>
          </Col>
          <Col md={4} className="text-end">
            {competition.registrationLink && competition.status === 'upcoming' && (
              <>
                <Button
                  variant="primary"
                  size="sm"
                  href={competition.registrationLink}
                  target="_blank"
                  className="me-2"
                >
                  <i className="bi bi-box-arrow-up-right me-1"></i>
                  Register
                </Button>
                <Form.Check
                  type="switch"
                  id={`register-switch-${competition.id}`}
                  label="Registered"
                  checked={isRegistered(competition.id)}
                  onChange={e =>
                    e.target.checked
                      ? onRegister(competition)
                      : onUnregister(competition)
                  }
                />
              </>
            )}
          </Col>
        </Row>
      </div>
    </Card.Body>

    <Card.Footer className="bg-light border-0">
      <div className="d-flex justify-content-between align-items-center text-muted small">
        <div>
          <i className="bi bi-envelope me-2"></i>{competition.contactEmail}
        </div>
        {competition.contactPhone && (
          <div>
            <i className="bi bi-telephone me-2"></i>{competition.contactPhone}
          </div>
        )}
      </div>
    </Card.Footer>
  </Card>
);

export default CompetitionCard;
