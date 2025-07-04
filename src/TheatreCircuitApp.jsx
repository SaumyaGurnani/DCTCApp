import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const TheaterCircuitApp = () => {
  const [currentView, setCurrentView] = useState('competitions');
  const [showModal, setShowModal] = useState(false);
  const [competitions, setCompetitions] = useState([
    {
      id: 1,
      title: "Annual Drama Festival",
      organizer: "Delhi University Theatre Society",
      date: "2025-08-15",
      time: "18:00",
      venue: "Kamala Nehru College Auditorium",
      category: "stage",
      description: "Annual inter-college drama competition featuring original scripts and adaptations",
      registrationLink: "https://forms.google.com/drama-festival-2025",
      registrationDeadline: "2025-08-01",
      maxTeams: 15,
      registeredTeams: 8,
      prizes: "₹25,000 for winners",
      contactEmail: "drama.du@gmail.com",
      contactPhone: "+91-9876543210",
      status: "upcoming"
    },
    {
      id: 2,
      title: "Street Play Championship",
      organizer: "Hansraj College Dramatic Society",
      date: "2025-07-20",
      time: "16:00",
      venue: "Central Park, CP",
      category: "street",
      description: "Social awareness street play competition with themes on current issues",
      registrationLink: "https://forms.google.com/street-play-championship",
      registrationDeadline: "2025-07-15",
      maxTeams: 20,
      registeredTeams: 12,
      prizes: "₹15,000 for winners",
      contactEmail: "hansraj.drama@gmail.com",
      contactPhone: "+91-9876543211",
      status: "upcoming"
    },
    {
      id: 3,
      title: "Monsoon Mime Festival",
      organizer: "Ramjas College Theatre",
      date: "2025-06-10",
      time: "17:30",
      venue: "Ramjas College Auditorium",
      category: "mime",
      description: "Silent expression competition celebrating the art of mime",
      registrationLink: "https://forms.google.com/mime-festival-2025",
      registrationDeadline: "2025-06-01",
      maxTeams: 12,
      registeredTeams: 12,
      prizes: "₹10,000 for winners",
      contactEmail: "ramjas.theatre@gmail.com",
      contactPhone: "+91-9876543212",
      status: "completed"
    }
  ]);

  const [registrations, setRegistrations] = useState([
    { competitionId: 1, teamName: "Miranda Drama Club", registeredAt: "2025-07-01" },
    { competitionId: 2, teamName: "Miranda Drama Club", registeredAt: "2025-07-03" }
  ]);

  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCompetition, setEditingCompetition] = useState(null);

  const [newCompetition, setNewCompetition] = useState({
    title: '',
    organizer: '',
    date: '',
    time: '',
    venue: '',
    category: 'stage',
    description: '',
    registrationLink: '',
    registrationDeadline: '',
    maxTeams: '',
    prizes: '',
    contactEmail: '',
    contactPhone: ''
  });

  const categories = [
    { value: 'stage', label: 'Stage Play', variant: 'primary' },
    { value: 'street', label: 'Street Play', variant: 'success' },
    { value: 'mime', label: 'Mime', variant: 'secondary' },
    { value: 'monologue', label: 'Monologue', variant: 'warning' },
    { value: 'improv', label: 'Improv', variant: 'danger' }
  ];

  const handleSubmit = () => {
    if (!newCompetition.title || !newCompetition.organizer || !newCompetition.date || !newCompetition.time || !newCompetition.venue || !newCompetition.description || !newCompetition.registrationDeadline || !newCompetition.contactEmail) {
      alert('Please fill in all required fields');
      return;
    }

    const competition = {
      ...newCompetition,
      id: editingCompetition ? editingCompetition.id : Date.now(),
      registeredTeams: editingCompetition ? editingCompetition.registeredTeams : 0,
      status: new Date(newCompetition.date) > new Date() ? 'upcoming' : 'completed'
    };

    if (editingCompetition) {
      setCompetitions(competitions.map(comp => 
        comp.id === editingCompetition.id ? competition : comp
      ));
    } else {
      setCompetitions([...competitions, competition]);
    }

    setNewCompetition({
      title: '', organizer: '', date: '', time: '', venue: '', category: 'stage',
      description: '', registrationLink: '', registrationDeadline: '', maxTeams: '',
      prizes: '', contactEmail: '', contactPhone: ''
    });
    setShowModal(false);
    setEditingCompetition(null);
  };

  const handleEdit = (competition) => {
    setEditingCompetition(competition);
    setNewCompetition({ ...competition });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this competition?')) {
      setCompetitions(competitions.filter(comp => comp.id !== id));
      setRegistrations(registrations.filter(reg => reg.competitionId !== id));
    }
  };

  const filteredCompetitions = competitions.filter(comp => {
    const matchesCategory = filterCategory === 'all' || comp.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || comp.status === filterStatus;
    const matchesSearch = comp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comp.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const myRegistrations = competitions.filter(comp => 
    registrations.some(reg => reg.competitionId === comp.id)
  );

  const upcomingEvents = myRegistrations.filter(comp => comp.status === 'upcoming');
  const pastEvents = myRegistrations.filter(comp => comp.status === 'completed');

  const getCategoryVariant = (category) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.variant : 'secondary';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`1970-01-01T${timeString}`).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    return status === 'upcoming' ? 
      <span className="badge bg-success">Upcoming</span> : 
      <span className="badge bg-secondary">Completed</span>;
  };

  const CompetitionCard = ({ competition, showActions = false }) => (
    <div className="card h-100 shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className="flex-grow-1">
            <h5 className="card-title mb-2 text-primary">{competition.title}</h5>
            <p className="text-muted mb-2 small">
              <i className="bi bi-building me-1"></i>
              {competition.organizer}
            </p>
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className={`badge bg-${getCategoryVariant(competition.category)}`}>
                {categories.find(c => c.value === competition.category)?.label}
              </span>
              {getStatusBadge(competition.status)}
            </div>
          </div>
          {showActions && (
            <div className="dropdown">
              <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                <i className="bi bi-three-dots"></i>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button className="dropdown-item" onClick={() => handleEdit(competition)}>
                    <i className="bi bi-pencil me-2"></i>Edit
                  </button>
                </li>
                <li>
                  <button className="dropdown-item text-danger" onClick={() => handleDelete(competition.id)}>
                    <i className="bi bi-trash me-2"></i>Delete
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
        
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <div className="d-flex align-items-center text-muted small">
              <i className="bi bi-calendar-event me-2 text-primary"></i>
              <span>{formatDate(competition.date)}</span>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex align-items-center text-muted small">
              <i className="bi bi-clock me-2 text-primary"></i>
              <span>{formatTime(competition.time)}</span>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex align-items-center text-muted small">
              <i className="bi bi-geo-alt me-2 text-primary"></i>
              <span>{competition.venue}</span>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex align-items-center text-muted small">
              <i className="bi bi-people me-2 text-primary"></i>
              <span>{competition.registeredTeams}/{competition.maxTeams || 'Unlimited'} teams</span>
            </div>
          </div>
        </div>
        
        {competition.prizes && (
          <div className="alert alert-light border-0 py-2 mb-3">
            <i className="bi bi-trophy text-warning me-2"></i>
            <strong>Prize:</strong> {competition.prizes}
          </div>
        )}
        
        <p className="card-text text-muted mb-3">{competition.description}</p>
        
        <div className="border-top pt-3">
          <div className="row align-items-center">
            <div className="col-md-8">
              <small className="text-muted">
                <i className="bi bi-clock-history me-1"></i>
                Registration ends: {formatDate(competition.registrationDeadline)}
              </small>
            </div>
            <div className="col-md-4 text-end">
              {competition.registrationLink && competition.status === 'upcoming' && (
                <a
                  href={competition.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  <i className="bi bi-box-arrow-up-right me-1"></i>
                  Register
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="card-footer bg-light border-0">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <i className="bi bi-envelope me-2 text-muted"></i>
            <small className="text-muted me-3">{competition.contactEmail}</small>
          </div>
          {competition.contactPhone && (
            <div className="d-flex align-items-center">
              <i className="bi bi-telephone me-2 text-muted"></i>
              <small className="text-muted">{competition.contactPhone}</small>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-vh-100 bg-light">
      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center">
            <i className="bi bi-masks-theater text-primary me-2 fs-4"></i>
            <span className="fw-bold">Delhi Theatre Circuit</span>
          </a>
          
          <div className="navbar-nav ms-auto">
            <button
              onClick={() => setCurrentView('competitions')}
              className={`btn btn-link nav-link ${currentView === 'competitions' ? 'active fw-bold' : ''}`}
            >
              <i className="bi bi-trophy me-1"></i>
              All Competitions
            </button>
            <button
              onClick={() => setCurrentView('calendar')}
              className={`btn btn-link nav-link ${currentView === 'calendar' ? 'active fw-bold' : ''}`}
            >
              <i className="bi bi-calendar-check me-1"></i>
              My Calendar
            </button>
          </div>
        </div>
      </nav>

      <div className="container py-4">
        {currentView === 'competitions' && (
          <div>
            {/* Page Header */}
            <div className="row mb-4">
              <div className="col-md-8">
                <h2 className="h3 mb-2">Theatre Competitions</h2>
                <p className="text-muted">Discover and participate in exciting theatre competitions across Delhi colleges</p>
              </div>
              <div className="col-md-4 text-end">
                <button
                  onClick={() => setShowModal(true)}
                  className="btn btn-primary"
                >
                  <i className="bi bi-plus-circle me-2"></i>
                  Add Competition
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="card mb-4">
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-4">
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-search"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search competitions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <select
                      className="form-select"
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                    >
                      <option value="all">All Categories</option>
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="col-md-4">
                    <select
                      className="form-select"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="all">All Status</option>
                      <option value="upcoming">Upcoming</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Competition Grid */}
            <div className="row g-4">
              {filteredCompetitions.length > 0 ? (
                filteredCompetitions.map(competition => (
                  <div key={competition.id} className="col-lg-6 col-xl-4">
                    <CompetitionCard competition={competition} showActions={true} />
                  </div>
                ))
              ) : (
                <div className="col-12">
                  <div className="text-center py-5">
                    <i className="bi bi-search display-1 text-muted"></i>
                    <h4 className="mt-3">No competitions found</h4>
                    <p className="text-muted">Try adjusting your search or filter criteria</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {currentView === 'calendar' && (
          <div>
            <div className="row mb-4">
              <div className="col">
                <h2 className="h3 mb-2">My Competition Calendar</h2>
                <p className="text-muted">Track your registered competitions and participation history</p>
              </div>
            </div>
            
            <div className="row g-4">
              <div className="col-lg-6">
                <div className="card">
                  <div className="card-header bg-success text-white">
                    <h5 className="mb-0">
                      <i className="bi bi-calendar-plus me-2"></i>
                      Upcoming Events ({upcomingEvents.length})
                    </h5>
                  </div>
                  <div className="card-body">
                    {upcomingEvents.length > 0 ? (
                      <div className="row g-3">
                        {upcomingEvents.map(competition => (
                          <div key={competition.id} className="col-12">
                            <CompetitionCard competition={competition} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <i className="bi bi-calendar-x display-4 text-muted"></i>
                        <p className="text-muted mt-3 mb-0">No upcoming events registered</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="col-lg-6">
                <div className="card">
                  <div className="card-header bg-secondary text-white">
                    <h5 className="mb-0">
                      <i className="bi bi-clock-history me-2"></i>
                      Past Events ({pastEvents.length})
                    </h5>
                  </div>
                  <div className="card-body">
                    {pastEvents.length > 0 ? (
                      <div className="row g-3">
                        {pastEvents.map(competition => (
                          <div key={competition.id} className="col-12">
                            <CompetitionCard competition={competition} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <i className="bi bi-trophy display-4 text-muted"></i>
                        <p className="text-muted mt-3 mb-0">No past events to display</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    <i className="bi bi-plus-circle me-2"></i>
                    {editingCompetition ? 'Edit Competition' : 'Add New Competition'}
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => {
                      setShowModal(false);
                      setEditingCompetition(null);
                      setNewCompetition({
                        title: '', organizer: '', date: '', time: '', venue: '', category: 'stage',
                        description: '', registrationLink: '', registrationDeadline: '', maxTeams: '',
                        prizes: '', contactEmail: '', contactPhone: ''
                      });
                    }}
                  ></button>
                </div>
                
                <div className="modal-body">
                  <form>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Competition Title *</label>
                        <input
                          type="text"
                          className="form-control"
                          value={newCompetition.title}
                          onChange={(e) => setNewCompetition({ ...newCompetition, title: e.target.value })}
                          required
                        />
                      </div>
                      
                      <div className="col-md-6">
                        <label className="form-label">Organizing Society *</label>
                        <input
                          type="text"
                          className="form-control"
                          value={newCompetition.organizer}
                          onChange={(e) => setNewCompetition({ ...newCompetition, organizer: e.target.value })}
                          required
                        />
                      </div>
                      
                      <div className="col-md-6">
                        <label className="form-label">Date *</label>
                        <input
                          type="date"
                          className="form-control"
                          value={newCompetition.date}
                          onChange={(e) => setNewCompetition({ ...newCompetition, date: e.target.value })}
                          required
                        />
                      </div>
                      
                      <div className="col-md-6">
                        <label className="form-label">Time *</label>
                        <input
                          type="time"
                          className="form-control"
                          value={newCompetition.time}
                          onChange={(e) => setNewCompetition({ ...newCompetition, time: e.target.value })}
                          required
                        />
                      </div>
                      
                      <div className="col-md-6">
                        <label className="form-label">Venue *</label>
                        <input
                          type="text"
                          className="form-control"
                          value={newCompetition.venue}
                          onChange={(e) => setNewCompetition({ ...newCompetition, venue: e.target.value })}
                          required
                        />
                      </div>
                      
                      <div className="col-md-6">
                        <label className="form-label">Category *</label>
                        <select
                          className="form-select"
                          value={newCompetition.category}
                          onChange={(e) => setNewCompetition({ ...newCompetition, category: e.target.value })}
                          required
                        >
                          {categories.map(cat => (
                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="col-md-6">
                        <label className="form-label">Registration Deadline *</label>
                        <input
                          type="date"
                          className="form-control"
                          value={newCompetition.registrationDeadline}
                          onChange={(e) => setNewCompetition({ ...newCompetition, registrationDeadline: e.target.value })}
                          required
                        />
                      </div>
                      
                      <div className="col-md-6">
                        <label className="form-label">Max Teams</label>
                        <input
                          type="number"
                          className="form-control"
                          value={newCompetition.maxTeams}
                          onChange={(e) => setNewCompetition({ ...newCompetition, maxTeams: e.target.value })}
                          placeholder="Leave blank for unlimited"
                        />
                      </div>
                      
                      <div className="col-md-6">
                        <label className="form-label">Contact Email *</label>
                        <input
                          type="email"
                          className="form-control"
                          value={newCompetition.contactEmail}
                          onChange={(e) => setNewCompetition({ ...newCompetition, contactEmail: e.target.value })}
                          required
                        />
                      </div>
                      
                      <div className="col-md-6">
                        <label className="form-label">Contact Phone</label>
                        <input
                          type="tel"
                          className="form-control"
                          value={newCompetition.contactPhone}
                          onChange={(e) => setNewCompetition({ ...newCompetition, contactPhone: e.target.value })}
                        />
                      </div>
                      
                      <div className="col-12">
                        <label className="form-label">Description *</label>
                        <textarea
                          className="form-control"
                          rows={3}
                          value={newCompetition.description}
                          onChange={(e) => setNewCompetition({ ...newCompetition, description: e.target.value })}
                          required
                        />
                      </div>
                      
                      <div className="col-12">
                        <label className="form-label">Registration Link</label>
                        <input
                          type="url"
                          className="form-control"
                          value={newCompetition.registrationLink}
                          onChange={(e) => setNewCompetition({ ...newCompetition, registrationLink: e.target.value })}
                          placeholder="https://forms.google.com/your-form-link"
                        />
                      </div>
                      
                      <div className="col-12">
                        <label className="form-label">Prizes</label>
                        <input
                          type="text"
                          className="form-control"
                          value={newCompetition.prizes}
                          onChange={(e) => setNewCompetition({ ...newCompetition, prizes: e.target.value })}
                          placeholder="e.g., ₹25,000 for winners"
                        />
                      </div>
                    </div>
                  </form>
                </div>
                
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowModal(false);
                      setEditingCompetition(null);
                      setNewCompetition({
                        title: '', organizer: '', date: '', time: '', venue: '', category: 'stage',
                        description: '', registrationLink: '', registrationDeadline: '', maxTeams: '',
                        prizes: '', contactEmail: '', contactPhone: ''
                      });
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    <i className="bi bi-check-circle me-2"></i>
                    {editingCompetition ? 'Update Competition' : 'Add Competition'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
};

export default TheaterCircuitApp;