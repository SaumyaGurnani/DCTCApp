import React from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { categories } from '../data/categories';

const CompetitionFormModal = ({
  show,
  onHide,
  onSubmit,
  competition,
  setCompetition,
  isEditing
}) => {
  const handleChange = (field, value) => {
    setCompetition(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (
      !competition.title ||
      !competition.organizer ||
      !competition.date ||
      !competition.time ||
      !competition.venue ||
      !competition.description ||
      !competition.registrationDeadline ||
      !competition.contactEmail
    ) {
      alert("Please fill all required fields.");
      return;
    }
    onSubmit();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>
          {isEditing ? "Edit Competition" : "Add New Competition"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group controlId="title">
                <Form.Label>Title *</Form.Label>
                <Form.Control
                  type="text"
                  value={competition.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="organizer">
                <Form.Label>Organizer *</Form.Label>
                <Form.Control
                  type="text"
                  value={competition.organizer}
                  onChange={(e) => handleChange('organizer', e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="date">
                <Form.Label>Date *</Form.Label>
                <Form.Control
                  type="date"
                  value={competition.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="time">
                <Form.Label>Time *</Form.Label>
                <Form.Control
                  type="time"
                  value={competition.time}
                  onChange={(e) => handleChange('time', e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="venue">
                <Form.Label>Venue *</Form.Label>
                <Form.Control
                  type="text"
                  value={competition.venue}
                  onChange={(e) => handleChange('venue', e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="category">
                <Form.Label>Category *</Form.Label>
                <Form.Select
                  value={competition.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="registrationDeadline">
                <Form.Label>Registration Deadline *</Form.Label>
                <Form.Control
                  type="date"
                  value={competition.registrationDeadline}
                  onChange={(e) => handleChange('registrationDeadline', e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="maxTeams">
                <Form.Label>Max Teams</Form.Label>
                <Form.Control
                  type="number"
                  value={competition.maxTeams}
                  onChange={(e) => handleChange('maxTeams', e.target.value)}
                  placeholder="Leave blank for unlimited"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="contactEmail">
                <Form.Label>Contact Email *</Form.Label>
                <Form.Control
                  type="email"
                  value={competition.contactEmail}
                  onChange={(e) => handleChange('contactEmail', e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="contactPhone">
                <Form.Label>Contact Phone</Form.Label>
                <Form.Control
                  type="tel"
                  value={competition.contactPhone}
                  onChange={(e) => handleChange('contactPhone', e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group controlId="description">
                <Form.Label>Description *</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={competition.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group controlId="registrationLink">
                <Form.Label>Registration Link</Form.Label>
                <Form.Control
                  type="url"
                  value={competition.registrationLink}
                  onChange={(e) => handleChange('registrationLink', e.target.value)}
                  placeholder="https://forms.google.com/your-link"
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group controlId="prizes">
                <Form.Label>Prizes</Form.Label>
                <Form.Control
                  type="text"
                  value={competition.prizes}
                  onChange={(e) => handleChange('prizes', e.target.value)}
                  placeholder="e.g., ₹25,000 for winners"
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {isEditing ? "Update Competition" : "Add Competition"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CompetitionFormModal;
