import React, { useState, useEffect } from 'react';

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
    { value: 'stage', label: 'Stage Play', color: 'bg-blue-100 text-blue-800' },
    { value: 'street', label: 'Street Play', color: 'bg-green-100 text-green-800' },
    { value: 'mime', label: 'Mime', color: 'bg-purple-100 text-purple-800' },
    { value: 'monologue', label: 'Monologue', color: 'bg-orange-100 text-orange-800' },
    { value: 'improv', label: 'Improv', color: 'bg-red-100 text-red-800' }
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
    setCompetitions(competitions.filter(comp => comp.id !== id));
    setRegistrations(registrations.filter(reg => reg.competitionId !== id));
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

  const getCategoryStyle = (category) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.color : 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const CompetitionCard = ({ competition, showActions = false }) => (
    <div className="card mb-4 shadow-sm">
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div className="flex-1">
          <h5 className="card-title mb-2">{competition.title}</h5>
          <p className="text-muted mb-2">by {competition.organizer}</p>
          <span className={`badge bg-primary`}>
            {categories.find(c => c.value === competition.category)?.label}
          </span>
        </div>
        {showActions && (
          <div className="d-flex space-x-2">
            <button
              onClick={() => handleEdit(competition)}
              className="btn btn-outline-primary btn-sm me-2"
            >
              <i className="bi bi-pencil"></i>
            </button>
            <button
              onClick={() => handleDelete(competition.id)}
              className="btn btn-outline-danger btn-sm"
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        )}
      </div>
      
      <div className="row mb-3">
        <div className="col-md-6">
          <div className="d-flex align-items-center text-muted mb-2">
            <i className="bi bi-calendar me-2"></i>
            <span>{formatDate(competition.date)}</span>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="d-flex align-items-center text-muted mb-2">
            <i className="bi bi-clock me-2"></i>
            <span>{competition.time}</span>
          </div>
        </div>
      </div>
      
      <div className="row mb-3">
        <div className="col-md-6">
          <div className="d-flex align-items-center text-muted mb-2">
            <i className="bi bi-geo-alt me-2"></i>
            <span>{competition.venue}</span>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="d-flex align-items-center text-muted mb-2">
            <i className="bi bi-people me-2"></i>
            <span>{competition.registeredTeams}/{competition.maxTeams} teams</span>
          </div>
        </div>
      </div>
      
      <div className="row mb-3">
        <div className="col-md-6">
          <div className="d-flex align-items-center text-muted mb-2">
            <i className="bi bi-trophy me-2"></i>
            <span>{competition.prizes}</span>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="text-sm text-muted">
            Registration ends: {formatDate(competition.registrationDeadline)}
          </div>
        </div>
      </div>
      
      <p className="card-text">{competition.description}</p>
      
      <div className="d-flex flex-wrap gap-2">
        {competition.registrationLink && (
          <a
            href={competition.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary d-inline-flex align-items-center me-2"
          >
            <i className="bi bi-box-arrow-up-right me-2"></i>
            Register Now
          </a>
        )}
        <span className="text-muted">
          Contact: {competition.contactEmail} | {competition.contactPhone}
        </span>
      </div>
    </div>
  );

  return (
    <div className="min-vh-100 bg-light">
      {/* Header */}
      <header className="bg-white border-bottom shadow-sm">
        <div className="container px-4">
          <div className="d-flex justify-content-between align-items-center py-3">
            <div className="d-flex align-items-center">
              <i className="bi bi-trophy h-8 w-8 text-blue-600 mr-3"></i>
              <h1 className="text-2xl font-bold text-gray-900">Delhi College Theatre Circuit</h1>
            </div>
            <nav className="d-flex gap-3">
              <button
                onClick={() => setCurrentView('competitions')}
                className={`btn btn-light btn-sm me-2 ${
                  currentView === 'competitions'
                    ? 'active'
                    : 'text-secondary'
                }`}
              >
                All Competitions
              </button>
              <button
                onClick={() => setCurrentView('calendar')}
                className={`btn btn-light btn-sm me-2 ${
                  currentView === 'calendar'
                    ? 'active'
                    : 'text-secondary'
                }`}
              >
                My Calendar
              </button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container px-4 py-8">
        {currentView === 'competitions' && (
          <div>
            {/* Controls */}
            <div className="d-flex flex-wrap gap-3 mb-4">
              <button
                onClick={() => setShowModal(true)}
                className="btn btn-primary d-inline-flex align-items-center me-2"
              >
                <i className="bi bi-plus me-2"></i>
                Add Competition
              </button>
              
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-search text-muted"></i>
                <input
                  type="text"
                  placeholder="Search competitions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control me-2"
                />
              </div>
              
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="form-control me-2"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="form-control me-2"
              >
                <option value="all">All Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Competition List */}
            <div className="space-y-4">
              {filteredCompetitions.map(competition => (
                <CompetitionCard key={competition.id} competition={competition} showActions={true} />
              ))}
            </div>
          </div>
        )}

        {currentView === 'calendar' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Competition Calendar</h2>
            
            <div className="row">
              <div className="col-md-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <i className="bi bi-calendar me-2"></i>
                  Upcoming Events ({upcomingEvents.length})
                </h3>
                {upcomingEvents.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingEvents.map(competition => (
                      <CompetitionCard key={competition.id} competition={competition} />
                    ))}
                  </div>
                ) : (
                  <p className="text-muted bg-white p-4 rounded-lg">No upcoming events registered</p>
                )}
              </div>
              
              <div className="col-md-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <i className="bi bi-trophy me-2"></i>
                  Past Events ({pastEvents.length})
                </h3>
                {pastEvents.length > 0 ? (
                  <div className="space-y-4">
                    {pastEvents.map(competition => (
                      <CompetitionCard key={competition.id} competition={competition} />
                    ))}
                  </div>
                ) : (
                  <p className="text-muted bg-white p-4 rounded-lg">No past events to display</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal d-block show">
          <div className="modal-dialog">
            <div className="modal-content p-4">
              <h2 className="text-xl font-bold mb-4">
                {editingCompetition ? 'Edit Competition' : 'Add New Competition'}
              </h2>
              
              <div className="space-y-4">
                <div className="row">
                  <div className="col-md-6">
                    <label className="form-label">
                      Competition Title *
                    </label>
                    <input
                      type="text"
                      value={newCompetition.title}
                      onChange={(e) => setNewCompetition({ ...newCompetition, title: e.target.value })}
                      className="form-control"
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label">
                      Organizing Society *
                    </label>
                    <input
                      type="text"
                      value={newCompetition.organizer}
                      onChange={(e) => setNewCompetition({ ...newCompetition, organizer: e.target.value })}
                      className="form-control"
                    />
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md-6">
                    <label className="form-label">
                      Date *
                    </label>
                    <input
                      type="date"
                      value={newCompetition.date}
                      onChange={(e) => setNewCompetition({ ...newCompetition, date: e.target.value })}
                      className="form-control"
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label">
                      Time *
                    </label>
                    <input
                      type="time"
                      value={newCompetition.time}
                      onChange={(e) => setNewCompetition({ ...newCompetition, time: e.target.value })}
                      className="form-control"
                    />
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md-6">
                    <label className="form-label">
                      Venue *
                    </label>
                    <input
                      type="text"
                      value={newCompetition.venue}
                      onChange={(e) => setNewCompetition({ ...newCompetition, venue: e.target.value })}
                      className="form-control"
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label">
                      Category *
                    </label>
                    <select
                      value={newCompetition.category}
                      onChange={(e) => setNewCompetition({ ...newCompetition, category: e.target.value })}
                      className="form-control"
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md-6">
                    <label className="form-label">
                      Registration Deadline *
                    </label>
                    <input
                      type="date"
                      value={newCompetition.registrationDeadline}
                      onChange={(e) => setNewCompetition({ ...newCompetition, registrationDeadline: e.target.value })}
                      className="form-control"
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label">
                      Max Teams
                    </label>
                    <input
                      type="number"
                      value={newCompetition.maxTeams}
                      onChange={(e) => setNewCompetition({ ...newCompetition, maxTeams: e.target.value })}
                      className="form-control"
                    />
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md-6">
                    <label className="form-label">
                      Contact Email *
                    </label>
                    <input
                      type="email"
                      value={newCompetition.contactEmail}
                      onChange={(e) => setNewCompetition({ ...newCompetition, contactEmail: e.target.value })}
                      className="form-control"
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      value={newCompetition.contactPhone}
                      onChange={(e) => setNewCompetition({ ...newCompetition, contactPhone: e.target.value })}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="form-label">
                  Description *
                </label>
                <textarea
                  rows={3}
                  value={newCompetition.description}
                  onChange={(e) => setNewCompetition({ ...newCompetition, description: e.target.value })}
                  className="form-control"
                />
              </div>
              
              <div>
                <label className="form-label">
                  Google Form Registration Link
                </label>
                <input
                  type="url"
                  value={newCompetition.registrationLink}
                  onChange={(e) => setNewCompetition({ ...newCompetition, registrationLink: e.target.value })}
                  placeholder="https://forms.google.com/your-form-link"
                  className="form-control"
                />
              </div>
              
              <div>
                <label className="form-label">
                  Prizes
                </label>
                <input
                  type="text"
                  value={newCompetition.prizes}
                  onChange={(e) => setNewCompetition({ ...newCompetition, prizes: e.target.value })}
                  placeholder="e.g., ₹25,000 for winners"
                  className="form-control"
                />
              </div>
              
              <div className="d-flex justify-content-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingCompetition(null);
                    setNewCompetition({
                      title: '', organizer: '', date: '', time: '', venue: '', category: 'stage',
                      description: '', registrationLink: '', registrationDeadline: '', maxTeams: '',
                      prizes: '', contactEmail: '', contactPhone: ''
                    });
                  }}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="btn btn-primary"
                >
                  {editingCompetition ? 'Update Competition' : 'Add Competition'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TheaterCircuitApp;