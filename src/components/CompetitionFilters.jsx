import React from 'react';
import { Row, Col, InputGroup, Form } from 'react-bootstrap';
import { categories } from '../data/categories';

const CompetitionFilters = ({ searchTerm, setSearchTerm, filterCategory, setFilterCategory, filterStatus, setFilterStatus }) => {
  return (
    <Form className="mb-4 bg-white p-3 rounded shadow-sm">
      <Row className="g-3">
        {/* Search Bar */}
        <Col md={4}>
          <InputGroup>
            <InputGroup.Text>
              <i className="bi bi-search" />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search competitions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>

        {/* Category Filter */}
        <Col md={4}>
          <Form.Select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </Form.Select>
        </Col>

        {/* Status Filter */}
        <Col md={4}>
          <Form.Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
          </Form.Select>
        </Col>
      </Row>
    </Form>
  );
};

export default CompetitionFilters;
// This component provides a filter interface for competitions, allowing users to search by name, filter by category, and filter by status.